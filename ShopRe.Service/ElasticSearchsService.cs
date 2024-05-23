﻿using Microsoft.EntityFrameworkCore;
using Nest;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using static ShopRe.Service.ElasticSearchsService;
using static ShopRe.Service.ProductService;

namespace ShopRe.Service
{
    public interface IElasticSearchService
    {
        Task<ProductResponse> GetAllAsync(ProductParameters productParameters);
        Task<IEnumerable<Product>> GetByIdAsync(int id);
        Task<List<dynamic>> ProductAfterTraining(ProductParameters productParameters, string keyWord);
    }
    public class ElasticSearchsService : IElasticSearchService
    {
        private readonly IElasticClient _elasticClient;

        private readonly ShopRecommenderSystemDbContext _dbContext;

        public ElasticSearchsService(IElasticClient elasticClient, ShopRecommenderSystemDbContext dbContext)
        {
            _dbContext = dbContext;
            _elasticClient = elasticClient;
        }

        public class ProductResponse
        {
            public List<Product> Products { get; set; }
            public int TotalCount { get; set; }
        }

        //Covert
        private List<Product> ConvertToProduct(List<object> documents)
        {
            var products = new List<Product>();
            foreach (dynamic document in documents)
            {
                var product = new Product
                {
                    ID_NK = document.ContainsKey("ID_NK") ? Convert.ToInt32(document["ID_NK"]) : 0,
                    ID_SK = document.ContainsKey("ID_SK") ? Convert.ToInt32(document["ID_SK"]) : 0,
                    Name = document.ContainsKey("Name") ? document["Name"].ToString() : "",
                    Description = document.ContainsKey("Description") ? document["Description"].ToString() : "",
                    ShortDescription = document.ContainsKey("ShortDescription") ? document["ShortDescription"].ToString() : "",
                    Image = document.ContainsKey("Image") ? document["Image"].ToString() : "",
                    Price = document.ContainsKey("Price") ? Convert.ToDecimal(document["Price"]) : 0,
                    ListPrice = document.ContainsKey("ListPrice") ? Convert.ToDecimal(document["ListPrice"]) : 0,
                    OriginalPrice = document.ContainsKey("OriginalPrice") ? Convert.ToDecimal(document["OriginalPrice"]) : 0,
                    RatingAverage = document.ContainsKey("RatingAverage") ? Convert.ToDouble(document["RatingAverage"]) : 0,
                    RatingCount = document.ContainsKey("RatingCount") ? Convert.ToInt32(document["RatingCount"]) : 0,
                    MaxSaleQuantity = document.ContainsKey("MaxSaleQuantity") ? Convert.ToInt32(document["MaxSaleQuantity"]) : 0,
                    MinSaleQuantity = document.ContainsKey("MinSaleQuantity") ? Convert.ToInt32(document["MinSaleQuantity"]) : 0,
                    Quantity = document.ContainsKey("Quantity") ? Convert.ToInt32(document["Quantity"]) : 0,
                    AllTimeQuantitySold = document.ContainsKey("AllTimeQuantitySold") ? Convert.ToInt32(document["AllTimeQuantitySold"]) : 0,
                    ShortUrl = document.ContainsKey("ShortUrl") ? document["ShortUrl"].ToString() : "",
                    SellerID_NK = document.ContainsKey("SellerID_NK") ? Convert.ToInt32(document["SellerID_NK"]) : 0,
                    BrandID_NK = document.ContainsKey("BrandID_NK") ? Convert.ToInt32(document["BrandID_NK"]) : 0,
                    Category_LV0_NK = document.ContainsKey("Category_LV0_NK") ? Convert.ToInt32(document["Category_LV0_NK"]) : 0,
                };
                products.Add(product);
            }
            return products.ToList();
        }
        private List<SellerPriority> ConverToSellerPriority(List<object> documents)
        {
            var sellerPriority = new List<SellerPriority>();
            foreach (dynamic document in documents)
            {
                var sellerPriority_temp = new SellerPriority
                {
                    AccID = document.ContainsKey("ACCOUNTID") ? Convert.ToInt32(document["ACCOUNTID"]) : 0,
                    SellerID = document.ContainsKey("SELLERID") ? Convert.ToInt32(document["SELLERID"]) : 0,
                    Idx = document.ContainsKey("IDX") ? Convert.ToInt32(document["IDX"]) : 0,
                };
                sellerPriority.Add(sellerPriority_temp);
            }
            return sellerPriority.ToList();
        }
        //
        //
        public async Task<List<dynamic>> ProductAfterTraining(ProductParameters productParameters, string keyWord)
        {
            // Step 2.1: Fetch products matching the search term
            var response = await _elasticClient.SearchAsync<object>(s => s
                                .Index("shoprecommend")
                                .From(productParameters.PageNumber * productParameters.PageSize)
                                .Size(productParameters.PageSize)
                                .Query(q => q
                                        .Match(m => m
                                            .Field("Name")
                                            .Query(keyWord)
                                        )
                                    )
                            );

            if (!response.IsValid)
            {
                Console.WriteLine($"Error: {response.ServerError.Error.Reason}");
                return new List<dynamic>();
            }

            // Step 2.2: Extract SellerIDs from the product results
            var products = ConvertToProduct(response.Documents.ToList());
            var sellerIds = products.Select(p => p.SellerID_NK).ToList();

            // Step 2.3: Fetch priorities for the extracted SellerIDs
            var priorityItems = await _elasticClient.SearchAsync<dynamic>(s => s
                    .Index("accselpri")
                    .Query(q => q
                        .Terms(t => t
                            .Field("SELLERID")
                            .Terms(sellerIds)
                        )
                    )
                    .Sort(ss => ss
                        .Field(f => f
                            .Field("IDX")
                            .Order(SortOrder.Ascending)
                        )
                    )
                );

            if (!priorityItems.IsValid)
            {
                Console.WriteLine($"Error: {priorityItems.ServerError.Error.Reason}");
                return new List<dynamic>();
            }

            // Step 2.4: Combine product and priority results
            var sellerPriority = ConverToSellerPriority(priorityItems.Documents.ToList());

            var combinedResults = new List<dynamic>();

            foreach (var product in products)
            {
                var sellerId = product.SellerID_NK;
                var priority = sellerPriority.FirstOrDefault(p => p.SellerID == sellerId);

                if (priority != null)
                {
                    combinedResults.Add(new
                    {
                        Product = product,
                        IDX = priority.Idx
                    });
                }
            }

            // Step 2.5: Sort the combined results by IDX
            var sortedResults = combinedResults.OrderBy(r => r.IDX).ToList();

            return sortedResults;
        }

        public async Task<ProductResponse> GetAllAsync(ProductParameters productParameters)
        {
            var filters = new List<QueryContainer>();

            if (!string.IsNullOrEmpty(productParameters.ProductName))
            {
                filters.Add(new MatchPhraseQuery
                {
                    Field = "Name",
                    Query = productParameters.ProductName
                });
            }

            if (productParameters.CategoryIds.Any())
            {
                filters.Add(new TermsQuery
                {
                    Field = "Category_LV0_NK",
                    Terms = productParameters.CategoryIds.Select(id => (object)id)
                });
            }

            if (productParameters.BrandIds.Any())
            {
                filters.Add(new TermsQuery
                {
                    Field = "BrandID_NK",
                    Terms = productParameters.BrandIds.Select(id => (object)id)
                });
            }

            if (productParameters.MinPrice.HasValue || productParameters.MaxPrice.HasValue)
            {
                filters.Add(new NumericRangeQuery
                {
                    Field = "Price",
                    GreaterThanOrEqualTo = (double)productParameters.MinPrice,
                    LessThanOrEqualTo = (double)productParameters.MaxPrice
                });
            }

            if (productParameters.MinReviewRating.HasValue)
            {
                filters.Add(new NumericRangeQuery
                {
                    Field = "RatingAverage",
                    GreaterThanOrEqualTo = productParameters.MinReviewRating
                });
            }

            var response = await _elasticClient.SearchAsync<object>(s => s
                .Index("shoprecommend")
                .From(productParameters.PageNumber * productParameters.PageSize)
                .Size(productParameters.PageSize)
                .Query(q => q
                    .Bool(b => b
                        .Must(mu => mu
                            .MatchAll()
                        )
                        .Filter(filters.ToArray())
                    )
                )
                .Aggregations(a => a
                    .ValueCount("total_products", vc => vc
                            .Field("ID_NK") // Use the string literal for the field name
                    )
                )
                .Sort(ss => ss
                    .Script(sc => sc
                        .Type("number")
                        .Script(script => script
                            .Source("doc['BrandID_NK'].value == 0 ? 1 : 0")
                        )
                        .Order(SortOrder.Ascending)
                    )
                    .Field(f => f
                        .Field("RatingCount")
                        .Order(SortOrder.Descending)
                    )
                )
            );

            if (!response.IsValid)
            {
                return new ProductResponse
                {
                    Products = new List<Product>(),
                    TotalCount = 0
                };
            }

            var documents = ConvertToProduct(response.Documents.ToList());

            //var products = new List<ProductDto>();

            //foreach (var product in documents)
            //{
            //    var images = await _dbContext.Images
            //        .Where(img => img.Product.ID_NK == product.ID_NK)
            //        .ToListAsync();

            //    var productWithChildDto = new ProductDto
            //    {
            //        Product = product,
            //        Images = images
            //    };

            //    products.Add(productWithChildDto);
            //}

            var totalProducts = response.Aggregations.ValueCount("total_products").Value;
            return new ProductResponse
            {
                Products = documents,
                TotalCount = Convert.ToInt32(totalProducts)
            };
        }

        public async Task<IEnumerable<Product>> GetByIdAsync(int id)
        {
            var response = await _elasticClient.SearchAsync<object>(s => s
                    .Index("shoprecommend")
                    .From(0)
                    .Size(10)
                    .Query(q => q
                        .Match(m => m
                        .Field("ID_NK")
                        .Query(id.ToString())
                )
                    )
                );
            if (!response.IsValid)
            {
                return Enumerable.Empty<Product>();
            }

            var documents = ConvertToProduct(response.Documents.ToList());
            return documents;
        }
    }
}
