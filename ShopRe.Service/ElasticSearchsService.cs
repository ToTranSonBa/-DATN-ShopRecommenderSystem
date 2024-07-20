using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Nest;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ShopRe.Common.DTOs;
using ShopRe.Common.FunctionCommon;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data;
using ShopRe.Model.Models;
using static ShopRe.Service.ElasticSearchsService;

namespace ShopRe.Service
{
    public interface IElasticSearchService
    {
        Task<(int TotalCount, List<Product> Products)> GetAllAsync(ProductParameters productParameters);
        Task<IEnumerable<Product>> GetByIdAsync(int id);
        Task<(int TotalCount, List<dynamic> Products)> ProductAfterTraining(ProductParameters productParameters, int usercode);
        Task<List<BrandDetailDTO>> GetBrands();
        Task<List<DetailCommentDTO>> DetailComments(CommentParameters commentParameters, int ProductId);
        Task<CommentsRatingCountDTO> CommentsRatingCount(int idProduct);
        Task<SellerDTO> GetLastestProductsOfSellerById(SellerParameters sellerParameters, int id);
        Task<SellerDTO> GetTopQuantitySoldProductsOfSellerById(SellerParameters sellerParameters, int id);
        Task<SellerDTO> GetProductsBySeller(SellerParameters sellerParameters, int id);
        Task<int> TestElastic();
        Task DeleteDocumentByIDNK(int idNK);
        Task AddProductToIndex(Product product);
        Task UpdateDocumentByIDNK(int ProductID, Product product);
        Task<List<dynamic>> GetCategoryLevel0BySearch(string keyWord);
        Task<List<dynamic>> GetBrandsBySearch(string keyWord);
        Task<List<Product>> Get20NewPro();
        Task<List<Seller>> GetSellerForUser(int usercode);
        Task<List<dynamic>> GetCategoryLevel0OfSeller(int id);
        Task<List<dynamic>> GetBrandsBySeller(int id);

    }
    public class ElasticSearchsService : IElasticSearchService
    {
        private readonly IElasticClient _elasticClient;

        private readonly ShopRecommenderSystemDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;

        public ElasticSearchsService(IElasticClient elasticClient, ShopRecommenderSystemDbContext dbContext,
            IMapper mapper, HttpClient httpClient)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _elasticClient = elasticClient;
            _httpClient = httpClient;
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
                    ID_NK = document.ContainsKey("ID_NK") && document["ID_NK"] != null ? Convert.ToInt32(document["ID_NK"]) : 0,
                    ID_SK = document.ContainsKey("ID_SK") && document["ID_SK"] != null ? Convert.ToInt32(document["ID_SK"]) : (int?)null,
                    Name = document.ContainsKey("Name") && document["Name"] != null ? document["Name"].ToString() : "",
                    Description = document.ContainsKey("Description") && document["Description"] != null ? document["Description"].ToString() : "",
                    ShortDescription = document.ContainsKey("ShortDescription") && document["ShortDescription"] != null ? document["ShortDescription"].ToString() : "",
                    Image = document.ContainsKey("Image") && document["Image"] != null ? document["Image"].ToString() : "",
                    Price = document.ContainsKey("Price") && document["Price"] != null ? Convert.ToDecimal(document["Price"]) : 0,
                    ListPrice = document.ContainsKey("ListPrice") && document["ListPrice"] != null ? Convert.ToDecimal(document["ListPrice"]) : (decimal?)null,
                    OriginalPrice = document.ContainsKey("OriginalPrice") && document["OriginalPrice"] != null ? Convert.ToDecimal(document["OriginalPrice"]) : (decimal?)null,
                    RatingAverage = document.ContainsKey("RatingAverage") && document["RatingAverage"] != null ? Convert.ToDouble(document["RatingAverage"]) : (double?)null,
                    RatingCount = document.ContainsKey("RatingCount") && document["RatingCount"] != null ? Convert.ToInt32(document["RatingCount"]) : (int?)null,
                    MaxSaleQuantity = document.ContainsKey("MaxSaleQuantity") && document["MaxSaleQuantity"] != null ? Convert.ToInt32(document["MaxSaleQuantity"]) : (int?)null,
                    MinSaleQuantity = document.ContainsKey("MinSaleQuantity") && document["MinSaleQuantity"] != null ? Convert.ToInt32(document["MinSaleQuantity"]) : (int?)null,
                    Quantity = document.ContainsKey("Quantity") && document["Quantity"] != null ? Convert.ToInt32(document["Quantity"]) : 0,
                    AllTimeQuantitySold = document.ContainsKey("AllTimeQuantitySold") && document["AllTimeQuantitySold"] != null ? Convert.ToInt32(document["AllTimeQuantitySold"]) : (int?)null,
                    ShortUrl = document.ContainsKey("ShortUrl") && document["ShortUrl"] != null ? document["ShortUrl"].ToString() : "",
                    SellerID_NK = document.ContainsKey("SellerID_NK") && document["SellerID_NK"] != null ? Convert.ToInt32(document["SellerID_NK"]) : 0,
                    BrandID_NK = document.ContainsKey("BrandID_NK") && document["BrandID_NK"] != null ? Convert.ToInt32(document["BrandID_NK"]) : 0,
                    Category_LV0_NK = document.ContainsKey("Category_LV0_NK") && document["Category_LV0_NK"] != null ? Convert.ToInt32(document["Category_LV0_NK"]) : 0,
                    CreatedAt = document.ContainsKey("CreatedAt") && document["CreatedAt"] != null ? DateTime.Parse(document["CreatedAt"].ToString()) : DateTime.MinValue,
                    UpdatedAt = document.ContainsKey("UpdatedAt") && document["UpdatedAt"] != null ? DateTime.Parse(document["UpdatedAt"].ToString()) : (DateTime?)null,
                    DeletedAt = document.ContainsKey("DeletedAt") && document["DeletedAt"] != null ? DateTime.Parse(document["DeletedAt"].ToString()) : (DateTime?)null,
                    Category_LV1_NK = document.ContainsKey("Category_LV1_NK") && document["Category_LV1_NK"] != null ? Convert.ToInt32(document["Category_LV1_NK"]) : 0,
                    Category_LV2_NK = document.ContainsKey("Category_LV2_NK") && document["Category_LV2_NK"] != null ? Convert.ToInt32(document["Category_LV2_NK"]) : 0,
                    Category_LV3_NK = document.ContainsKey("Category_LV3_NK") && document["Category_LV3_NK"] != null ? Convert.ToInt32(document["Category_LV3_NK"]) : 0,
                    Category_LV4_NK = document.ContainsKey("Category_LV4_NK") && document["Category_LV4_NK"] != null ? Convert.ToInt32(document["Category_LV4_NK"]) : 0,
                    Category_LV5_NK = document.ContainsKey("Category_LV5_NK") && document["Category_LV5_NK"] != null ? Convert.ToInt32(document["Category_LV5_NK"]) : 0,
                    Category_LV6_NK = document.ContainsKey("Category_LV6_NK") && document["Category_LV6_NK"] != null ? Convert.ToInt32(document["Category_LV6_NK"]) : 0,
                    IsDeleted = document.ContainsKey("IsDeleted") && document["IsDeleted"] != null ? Convert.ToBoolean(document["IsDeleted"]) : false,


                    //ID_NK = document.ContainsKey("ID_NK") ? Convert.ToInt32(document["ID_NK"]) : 0,
                    //ID_SK = document.ContainsKey("ID_SK") ? Convert.ToInt32(document["ID_SK"]) : 0,
                    //Name = document.ContainsKey("Name") ? document["Name"].ToString() : "",
                    //Description = document.ContainsKey("Description") ? document["Description"].ToString() : "",
                    //ShortDescription = document.ContainsKey("ShortDescription") ? document["ShortDescription"].ToString() : "",
                    //Image = document.ContainsKey("Image") ? document["Image"].ToString() : "",
                    //Price = document.ContainsKey("Price") ? Convert.ToDecimal(document["Price"]) : 0,
                    //ListPrice = document.ContainsKey("ListPrice") ? Convert.ToDecimal(document["ListPrice"]) : 0,
                    //OriginalPrice = document.ContainsKey("OriginalPrice") ? Convert.ToDecimal(document["OriginalPrice"]) : 0,
                    //RatingAverage = document.ContainsKey("RatingAverage") ? Convert.ToDouble(document["RatingAverage"]) : 0,
                    //RatingCount = document.ContainsKey("RatingCount") ? Convert.ToInt32(document["RatingCount"]) : 0,
                    //MaxSaleQuantity = document.ContainsKey("MaxSaleQuantity") ? Convert.ToInt32(document["MaxSaleQuantity"]) : 0,
                    //MinSaleQuantity = document.ContainsKey("MinSaleQuantity") ? Convert.ToInt32(document["MinSaleQuantity"]) : 0,
                    //Quantity = document.ContainsKey("Quantity") ? Convert.ToInt32(document["Quantity"]) : 0,
                    //AllTimeQuantitySold = document.ContainsKey("AllTimeQuantitySold") ? Convert.ToInt32(document["AllTimeQuantitySold"]) : 0,
                    //ShortUrl = document.ContainsKey("ShortUrl") ? document["ShortUrl"].ToString() : "",
                    //SellerID_NK = document.ContainsKey("SellerID_NK") ? Convert.ToInt32(document["SellerID_NK"]) : 0,
                    //BrandID_NK = document.ContainsKey("BrandID_NK") ? Convert.ToInt32(document["BrandID_NK"]) : 0,
                    //Category_LV0_NK = document.ContainsKey("Category_LV0_NK") ? Convert.ToInt32(document["Category_LV0_NK"]) : 0,
                    //CreatedAt = DateTime.Parse(document.ContainsKey("CreatedAt") ? document["CreatedAt"].ToString() : "")
                };
                products.Add(product);
            }
            return products.ToList();
        }
        private List<SellerPriority> ConvertToSellerPriority(List<object> documents)
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
        private List<Brand> ConvertToBrand(List<object> documents)
        {
            var brands = new List<Brand>();
            foreach (dynamic document in documents)
            {
                var brand = new Brand
                {
                    ID_NK = document.ContainsKey("ID_NK") ? Convert.ToInt32(document["ID_NK"]) : 0,
                    ID_SK = document.ContainsKey("ID_SK") ? Convert.ToInt32(document["ID_SK"]) : 0,
                    Name = document.ContainsKey("Name") ? document["Name"].ToString() : "",
                    Slug = document.ContainsKey("Slug") ? document["Slug"].ToString() : ""
                };
                brands.Add(brand);
            }
            return brands.ToList();
        }
        private List<DetailComment> ConvertToComment(List<object> documents)
        {
            var commments = new List<DetailComment>();
            foreach (dynamic document in documents)
            {
                var comment = new DetailComment
                {

                    ID = document.ContainsKey("ID") ? Convert.ToInt32(document["ID"]) : 0,
                    ID_SK = document.ContainsKey("ID_SK") ? Convert.ToInt32(document["ID_SK"]) : 0,
                    AccountID = document.ContainsKey("AccountID") ? Convert.ToInt32(document["AccountID"]) : 0,
                    SellerID = document.ContainsKey("SellerID") ? Convert.ToInt32(document["SellerID"]) : 0,
                    ProductID = document.ContainsKey("ProductID") ? Convert.ToInt32(document["ProductID"]) : 0,
                    Image = document.ContainsKey("Image") ? document["Image"].ToString() : "",
                    Rating = document.ContainsKey("Rating") ? Convert.ToInt32(document["Rating"]) : 0,
                    Content = document.ContainsKey("Content") ? document["Content"].ToString() : "",
                    TimelineContent = document.ContainsKey("TimelineContent") ? document["TimelineContent"].ToString() : "",
                    CreatedAt = DateTime.Parse(document.ContainsKey("CreatedAt") ? document["CreatedAt"].ToString() : "")
                };
                commments.Add(comment);
            }
            return commments.ToList();
        }
        //
        public async Task DeleteDocumentByIDNK(int idNK)
        {
            try
            {
                // Tìm tài liệu theo ID_NK
                var searchResponse = await _elasticClient.SearchAsync<dynamic>(s => s
                    .Index("products")
                    .Query(q => q
                        .Term(t => t.Field("ID_NK").Value(idNK))
                    )
                );

                if (!searchResponse.IsValid || !searchResponse.Documents.Any())
                {
                    throw new Exception($"Document with ID_NK {idNK} not found in the products index.");
                }

                // Lấy ID của tài liệu
                var documentId = searchResponse.Hits.First().Id;

                // Xóa tài liệu theo ID
                var deleteResponse = await _elasticClient.DeleteAsync<dynamic>(documentId, d => d.Index("products"));

                if (!deleteResponse.IsValid)
                {
                    throw new Exception($"Failed to delete document with ID {documentId}: {deleteResponse.ServerError?.Error?.Reason}");
                }

                Console.WriteLine($"Document with ID_NK {idNK} deleted successfully.");
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to delete document: {ex.Message}");
            }
        }
        public async Task<int> TestElastic()
        {
            try
            {
                var response = await _elasticClient.SearchAsync<dynamic>(s => s
                    .Index("products")
                    .Size(0)
                    .Aggregations(a => a
                        .ValueCount("total_products", vc => vc.Field("ID_NK"))
                    )
                );

                if (!response.IsValid)
                {
                    var errorDetails = response.ServerError?.Error?.Reason ?? "Unknown error";
                    throw new Exception($"Failed to retrieve product count: {errorDetails}");
                }

                var totalProducts = response.Aggregations.ValueCount("total_products")?.Value ?? 0;
                return Convert.ToInt32(totalProducts);
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to retrieve product count: {ex.Message}");
            }
        }
        public async Task UpdateDocumentByIDNK(int ProductID, Product product)
        {
            try
            {
                var searchResponse = await _elasticClient.SearchAsync<dynamic>(s => s
                    .Index("products")
                    .Query(q => q
                        .Term(t => t.Field("ID_NK").Value(ProductID))
                    )
                );

                if (!searchResponse.IsValid || !searchResponse.Documents.Any())
                {
                    throw new Exception($"Document with ID_NK {ProductID} not found in the products index.");
                }

                var updatedFields = new Dictionary<string, object>
                {
                    { "ID_NK", product.ID_NK },
                    { "ID_SK", product.ID_SK },
                    { "Name", product.Name },
                    { "Description", product.Description },
                    { "ShortDescription", product.ShortDescription },
                    { "Image", product.Image },
                    { "Price", product.Price },
                    { "ListPrice", product.ListPrice },
                    { "OriginalPrice", product.OriginalPrice },
                    { "RatingAverage", product.RatingAverage },
                    { "RatingCount", product.RatingCount },
                    { "MaxSaleQuantity", product.MaxSaleQuantity },
                    { "MinSaleQuantity", product.MinSaleQuantity },
                    { "Quantity", product.Quantity },
                    { "AllTimeQuantitySold", product.AllTimeQuantitySold },
                    { "ShortUrl", product.ShortUrl },
                    { "SellerID_NK", product.SellerID_NK },
                    { "BrandID_NK", product.BrandID_NK },
                    { "Category_LV0_NK", product.Category_LV0_NK },
                    { "CreatedAt", product.CreatedAt },
                    { "UpdatedAt", product.UpdatedAt },
                    { "DeletedAt", product.DeletedAt },
                    { "Category_LV1_NK", product.Category_LV1_NK },
                    { "Category_LV2_NK", product.Category_LV2_NK },
                    { "Category_LV3_NK", product.Category_LV3_NK },
                    { "Category_LV4_NK", product.Category_LV4_NK },
                    { "Category_LV5_NK", product.Category_LV5_NK },
                    { "Category_LV6_NK", product.Category_LV6_NK },
                    { "IsDeleted", product.IsDeleted }
                };

                var updateResponse = await _elasticClient.UpdateAsync<object>(DocumentPath<object>.Id(ProductID), u => u
                    .Index("products")
                    .Doc(updatedFields)
                );

                if (updateResponse.IsValid)
                {
                    Console.WriteLine("Document updated successfully");
                }
                else
                {
                    Console.WriteLine($"Failed to update document: {updateResponse.ServerError.Error.Reason}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to update document: {ex.Message}");
            }
        }
        public async Task AddProductToIndex(Product product)
        {
            try
            {
                var addFields = new Dictionary<string, object>
                {
                    { "ID_NK", product.ID_NK },
                    { "ID_SK", product.ID_SK },
                    { "Name", product.Name },
                    { "Description", product.Description },
                    { "ShortDescription", product.ShortDescription },
                    { "Image", product.Image },
                    { "Price", product.Price },
                    { "ListPrice", product.ListPrice },
                    { "OriginalPrice", product.OriginalPrice },
                    { "RatingAverage", product.RatingAverage },
                    { "RatingCount", product.RatingCount },
                    { "MaxSaleQuantity", product.MaxSaleQuantity },
                    { "MinSaleQuantity", product.MinSaleQuantity },
                    { "Quantity", product.Quantity },
                    { "AllTimeQuantitySold", product.AllTimeQuantitySold },
                    { "ShortUrl", product.ShortUrl },
                    { "SellerID_NK", product.SellerID_NK },
                    { "BrandID_NK", product.BrandID_NK },
                    { "Category_LV0_NK", product.Category_LV0_NK },
                    { "CreatedAt", product.CreatedAt },
                    { "UpdatedAt", product.UpdatedAt },
                    { "DeletedAt", product.DeletedAt },
                    { "Category_LV1_NK", product.Category_LV1_NK },
                    { "Category_LV2_NK", product.Category_LV2_NK },
                    { "Category_LV3_NK", product.Category_LV3_NK },
                    { "Category_LV4_NK", product.Category_LV4_NK },
                    { "Category_LV5_NK", product.Category_LV5_NK },
                    { "Category_LV6_NK", product.Category_LV6_NK },
                    { "IsDeleted", product.IsDeleted }
                };

                var indexResponse = await _elasticClient.IndexAsync(addFields, idx => idx
                    .Index("products")
                    .Id(addFields["ID_NK"].ToString()));

                if (!indexResponse.IsValid)
                {
                    throw new Exception($"Failed to index document: {indexResponse.ServerError?.Error?.Reason}");
                }

                if (!indexResponse.IsValid)
                {
                    throw new Exception($"Failed to index document: {indexResponse.ServerError?.Error?.Reason}");
                }

            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to index document: {ex.Message}");
            }
        }
        public async Task<(int TotalCount, List<dynamic> Products)> ProductAfterTraining(ProductParameters productParameters, int usercode)
        {
            var filters = new List<QueryContainer>();

            if (!string.IsNullOrEmpty(productParameters.ProductName))
            {
                var multiMatchQuery = new MultiMatchQuery
                {
                    Query = productParameters.ProductName,
                    Fields = new[] { "Name" },
                    Type = TextQueryType.BestFields,
                    Fuzziness = Fuzziness.Auto,
                    Operator = Operator.And
                };

                var matchPhrasePrefixQuery = new MatchPhrasePrefixQuery
                {
                    Field = "Name",
                    Query = productParameters.ProductName,
                    Boost = 2.0 // Trọng số cao cho MatchPhrasePrefixQuery
                };

                filters.Add(new BoolQuery
                {
                    Should = new List<QueryContainer>
                    {
                        multiMatchQuery,
                        matchPhrasePrefixQuery
                    },
                    MinimumShouldMatch = 1
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

            var countResponse = await _elasticClient.CountAsync<object>(s => s
                .Index("products")
                .Query(q => q
                    .Bool(b => b
                        .Must(mu => mu
                            .MatchAll()
                        )
                        .Filter(filters.ToArray())
                    )
                )
            );

            var count = Convert.ToInt32(countResponse.Count);

            var response = await _elasticClient.SearchAsync<object>(s => s
                .Index("products")
                .Size(count)
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
                            .Field("ID_NK")
                    )
                )
            );
            if (!response.IsValid)
            {
                return (0, null);
            }


            var products = ConvertToProduct(response.Documents.ToList());


            var sellerIds = products.Select(p => p.SellerID_NK).ToList();

            //var priorityItems = await _elasticClient.SearchAsync<dynamic>(s => s
            //    .Index("accselpri")
            //    .Query(q => q
            //        .Terms(t => t
            //            .Field("SELLERID")
            //            .Terms(sellerIds)
            //        )
            //    )
            //    .Sort(ss => ss
            //        .Field(f => f
            //            .Field("IDX")
            //            .Order(SortOrder.Ascending)
            //        )
            //    )
            //    .Size(10000)
            //);

            //if (!priorityItems.IsValid)
            //{
            //    return (0, null);
            //}

            var requestUri = $"http://127.0.0.1:8000/nbcf/recommend?userid={usercode}";
            //var requestUri = $"https://fastapi-2i32.onrender.com/nbcf/recommend?userid={usercode}";

            List<SellerRating> sellerRating;
            JObject result;
            try
            {
                var s_response = await _httpClient.GetAsync(requestUri);
                s_response.EnsureSuccessStatusCode();
                var content = await s_response.Content.ReadAsStringAsync();
                //content = content.Replace("\"", "'");
                if (string.IsNullOrEmpty(content))
                {
                    var dynamic_products = FunctionCommon.ConvertToDynamicList(products);
                    return (products.Count, dynamic_products);
                }
                sellerRating = JsonConvert.DeserializeObject<List<SellerRating>>(content);
            }
            catch
            {
                var dynamic_products = FunctionCommon.ConvertToDynamicList(products);
                return (products.Count, dynamic_products);
            }

            var selids_order = sellerRating.OrderBy(e => e.Rating).ToList();

            var combinedResults = new List<dynamic>();

            foreach (var product in products)
            {
                var sellerId = product.SellerID_NK;
                var priority = sellerRating.FirstOrDefault(p => p.SellerId == sellerId);

                if (priority != null)
                {
                    combinedResults.Add(new
                    {
                        Product = product,
                        IDX = priority.Rating
                    });
                }
                else
                {
                    combinedResults.Add(new
                    {
                        Product = product,
                        IDX = -1 * 1.0
                    });
                }
            }

            var sortedResults = combinedResults.OrderByDescending(r => r.IDX)
            .Skip(productParameters.PageNumber * productParameters.PageSize)
            .Take(productParameters.PageSize)
            .ToList();

            sortedResults = sortedResults.Select(e => e.Product).ToList();

            return (count, sortedResults);
        }
        public async Task<(int TotalCount, List<Product> Products)> GetAllAsync(ProductParameters productParameters)
        {
            var filters = new List<QueryContainer>();

            if (!string.IsNullOrEmpty(productParameters.ProductName))
            {
                var matchQuery = new MatchQuery
                {
                    Field = "Name",
                    Query = productParameters.ProductName,
                    Fuzziness = Fuzziness.Auto,
                    Operator = Operator.And
                };

                var matchPhrasePrefixQuery = new MatchPhrasePrefixQuery
                {
                    Field = "Name",
                    Query = productParameters.ProductName,
                    Boost = 2.0
                };
                var multiMatchQuery = new MultiMatchQuery
                {
                    Query = productParameters.ProductName,
                    Fields = new[] { "Name" },
                    Type = TextQueryType.BestFields,
                    Fuzziness = Fuzziness.Auto,
                    Operator = Operator.And,
                    MinimumShouldMatch = "70%" // Thử điều chỉnh giá trị này
                };

                filters.Add(new BoolQuery
                {
                    Should = new List<QueryContainer>
                    {
                        matchQuery,
                        matchPhrasePrefixQuery,
                        multiMatchQuery
                    },
                    MinimumShouldMatch = 1
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
                .Index("products")
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
                            .Field("ID_NK")
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
                .From(productParameters.PageNumber * productParameters.PageSize)
                .Size(productParameters.PageSize)
            );

            var totalProducts = Convert.ToInt32(response.Aggregations.ValueCount("total_products")?.Value ?? 0);

            if (!response.IsValid)
            {
                return (0, null);
            }

            var products = ConvertToProduct(response.Documents.ToList());

            return (totalProducts, products);
        }
        public async Task<IEnumerable<Product>> GetByIdAsync(int id)
        {
            var response = await _elasticClient.SearchAsync<object>(s => s
                    .Index("products")
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

        public class ProductRatingCountDTO
        {
            public long RatingLessThan1 { get; set; }
            public long Rating1To2 { get; set; }
            public long Rating2To3 { get; set; }
            public long Rating3To4 { get; set; }
            public long Rating4To5 { get; set; }
        }

        public async Task<ProductRatingCountDTO> ProductRatingCount()
        {
            var countResponse1 = await _elasticClient.CountAsync<object>(c => c
                .Index("products")
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters => filters
                            .Range(r => r.Field("RatingAverage").LessThanOrEquals(1))
                        )
                    )
                )
            );

            var countResponse2 = await _elasticClient.CountAsync<object>(c => c
                .Index("products")
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters => filters
                            .Range(r => r.Field("RatingAverage").LessThanOrEquals(2).GreaterThan(1))
                        )
                    )
                )
            );

            var countResponse3 = await _elasticClient.CountAsync<object>(c => c
                .Index("products")
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters => filters
                            .Range(r => r.Field("RatingAverage").LessThanOrEquals(3).GreaterThan(2))
                        )
                    )
                )
            );

            var countResponse4 = await _elasticClient.CountAsync<object>(c => c
                .Index("products")
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters => filters
                            .Range(r => r.Field("RatingAverage").LessThanOrEquals(4).GreaterThan(3))
                        )
                    )
                )
            );

            var countResponse5 = await _elasticClient.CountAsync<object>(c => c
                .Index("products")
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters => filters
                            .Range(r => r.Field("RatingAverage").LessThanOrEquals(5).GreaterThan(4))
                        )
                    )
                )
            );

            return new ProductRatingCountDTO
            {
                RatingLessThan1 = countResponse1.Count,
                Rating1To2 = countResponse2.Count,
                Rating2To3 = countResponse3.Count,
                Rating3To4 = countResponse4.Count,
                Rating4To5 = countResponse5.Count
            };
        }

        //Brands
        public async Task<List<dynamic>> GetBrandsBySeller(int id)
        {
            var response = await _elasticClient.SearchAsync<object>(s => s
               .Index("products")
               .Query(q => q
                   .Bool(b => b
                       .Filter(filters => filters
                           .Term(t => t.Field("SellerID_NK").Value(id))
                       )
                   )
               )
               .Aggregations(a => a
                   .ValueCount("total_products", vc => vc
                           .Field("ID_NK")
                   )
               )
           );

            var totalProducts = Convert.ToInt32(response.Aggregations.ValueCount("total_products")?.Value ?? 0);

            var allresponse = await _elasticClient.SearchAsync<object>(s => s
               .Index("products")
               .Query(q => q
                   .Bool(b => b
                       .Filter(filters => filters
                           .Term(t => t.Field("SellerID_NK").Value(id))
                       )
                   )
               )
               .Aggregations(a => a
                   .ValueCount("total_products", vc => vc
                           .Field("ID_NK")
                   )
               ).Size(totalProducts)
           );

            if (!response.IsValid || !allresponse.IsValid)
            {
                return null;
            }

            var products_infor = ConvertToProduct(allresponse.Documents.ToList());

            var brandIds = products_infor.Select(p => p.BrandID_NK).Distinct().ToList();

            var list_brands_response = new List<dynamic>();

            var results = await _dbContext.Brands.ToListAsync();

            foreach (var brand in results)
            {
                var count = products_infor.Where(p => p.BrandID_NK == brand.ID_NK).ToList();
                var brandObject = new
                {
                    Total = count.Count(),
                    Brand = brand,
                };
                list_brands_response.Add(brandObject);
            }

            var sortedList = list_brands_response
                .OrderByDescending(c => c.Total).Take(15)
                .ToList();

            return sortedList;
        }
        private async Task<int> GetTotalProductCountForBrand(int brandId)
        {
            var response = await _elasticClient.SearchAsync<object>(s => s
                .Index("products")
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters => filters
                            .Term(t => t.Field("BrandID_NK").Value(brandId))
                        )
                    )
                )
            );

            if (!response.IsValid)
            {
                return 0;
            }

            return Convert.ToInt32(response.Total);
        }
        public async Task<List<dynamic>> GetBrandsBySearch(string keyWord)
        {
            var filters = new List<QueryContainer>();

            if (!string.IsNullOrEmpty(keyWord))
            {
                var multiMatchQuery = new MultiMatchQuery
                {
                    Query = keyWord,
                    Fields = new[] { "Name" },
                    Type = TextQueryType.BestFields,
                    Fuzziness = Fuzziness.Auto,
                    Operator = Operator.And
                };

                var matchPhrasePrefixQuery = new MatchPhrasePrefixQuery
                {
                    Field = "Name",
                    Query = keyWord,
                    Boost = 2.0
                };

                filters.Add(new BoolQuery
                {
                    Should = new List<QueryContainer>
                    {
                        multiMatchQuery,
                        matchPhrasePrefixQuery
                    },
                    MinimumShouldMatch = 1
                });
            }

            // Aggregation to get top 15 brands by product count
            var searchResponse = await _elasticClient.SearchAsync<dynamic>(s => s
                .Index("products")
                .Size(0) // We do not need the actual documents
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters.ToArray())
                    )
                )
                .Aggregations(a => a
                    .Terms("brands", t => t
                        .Field("BrandID_NK")
                        .Size(15)
                        .Order(o => o
                            .Descending("product_count")
                        )
                        .Aggregations(aa => aa
                            .ValueCount("product_count", v => v.Field("BrandID_NK"))
                        )
                    )
                )
            );

            if (!searchResponse.IsValid)
            {
                return new List<dynamic>();
            }

            var brandBuckets = searchResponse.Aggregations.Terms("brands").Buckets;
            var topBrandIds = brandBuckets.Select(b => int.Parse(b.Key)).ToList();

            var brands = await _dbContext.Brands
                .Where(b => topBrandIds.Contains(b.ID_NK))
                .ToListAsync();

            if (!brands.Any())
            {
                return new List<dynamic>();
            }

            var brandsResponse = new List<dynamic>();

            foreach (var brand in brands)
            {
                var totalProduct = (int)brandBuckets.First(b => int.Parse(b.Key) == brand.ID_NK).ValueCount("product_count").Value;

                var brandDetailDTO = new
                {
                    Total = totalProduct,
                    Brand = brand,
                };

                brandsResponse.Add(brandDetailDTO);
            }

            return brandsResponse
                .OrderByDescending(c => c.Total)
                .ToList();
        }
        public async Task<List<BrandDetailDTO>> GetBrands()
        {

            var searchResponse = await _elasticClient.SearchAsync<dynamic>(s => s
                .Index("products")
                .Size(0)
                .Aggregations(a => a
                    .Terms("brands", t => t
                        .Field("BrandID_NK")
                        .Size(15)
                        .Order(o => o
                            .Descending("product_count")
                      )
                        .Aggregations(aa => aa
                            .ValueCount("product_count", v => v.Field("BrandID_NK"))
                        )
                    )
                )
            );

            if (!searchResponse.IsValid)
            {

                return new List<BrandDetailDTO>();
            }

            var brandBuckets = searchResponse.Aggregations.Terms("brands").Buckets;
            var topBrandIds = brandBuckets.Select(b => int.Parse(b.Key)).ToList();


            var brands = await _dbContext.Brands
                .Where(b => topBrandIds.Contains(b.ID_NK))
                .ToListAsync();



            if (brands.Count() < 0)
            {

                return new List<BrandDetailDTO>();
            }


            var brandsResponse = new List<BrandDetailDTO>();

            foreach (var brand in brands)
            {
                var totalProduct = (int)brandBuckets.First(b => int.Parse(b.Key) == brand.ID_NK).ValueCount("product_count").Value;

                var brandDetailDTO = new BrandDetailDTO
                {
                    Brand = brand,
                    TotalProduct = totalProduct
                };

                brandsResponse.Add(brandDetailDTO);
            }

            var sortedList = brandsResponse
                .OrderByDescending(c => c.TotalProduct)
                .ToList();

            return sortedList;
        }
        //public async Task<List<dynamic>> GetBrandsBySearch(string keyWord)
        //{
        //    var filters = new List<QueryContainer>();

        //    if (!string.IsNullOrEmpty(keyWord))
        //    {
        //        var multiMatchQuery = new MultiMatchQuery
        //        {
        //            Query = keyWord,
        //            Fields = new[] { "Name" },
        //            Type = TextQueryType.BestFields,
        //            Fuzziness = Fuzziness.Auto,
        //            Operator = Operator.And
        //        };

        //        var matchPhrasePrefixQuery = new MatchPhrasePrefixQuery
        //        {
        //            Field = "Name",
        //            Query = keyWord,
        //            Boost = 2.0
        //        };

        //        filters.Add(new BoolQuery
        //        {
        //            Should = new List<QueryContainer>
        //            {
        //                multiMatchQuery,
        //                matchPhrasePrefixQuery
        //            },
        //            MinimumShouldMatch = 1
        //        });
        //    }

        //    var response = await _elasticClient.SearchAsync<object>(s => s
        //        .Index("products")
        //        .Query(q => q
        //            .Bool(b => b
        //                .Must(mu => mu
        //                    .MatchAll()
        //                )
        //                .Filter(filters.ToArray())
        //            )
        //        )
        //        .Aggregations(a => a
        //            .ValueCount("total_products", vc => vc
        //                    .Field("ID_NK")
        //            )
        //        )
        //    );

        //    var totalProducts = Convert.ToInt32(response.Aggregations.ValueCount("total_products")?.Value ?? 0);

        //    var all_response = await _elasticClient.SearchAsync<object>(s => s
        //            .Index("products")
        //            .Size(totalProducts)
        //            .Query(q => q
        //                .Bool(b => b
        //                    .Must(mu => mu
        //                        .MatchAll()
        //                    )
        //                    .Filter(filters.ToArray())
        //                )
        //            )
        //        );

        //    if (!response.IsValid || !all_response.IsValid)
        //    {
        //        return null;
        //    }

        //    var products_infor = ConvertToProduct(all_response.Documents.ToList());

        //    var brandIds = products_infor.Select(p => p.BrandID_NK).Distinct().ToList();

        //    var list_brands_response = new List<dynamic>();

        //    var results = await _dbContext.Brands.ToListAsync();

        //    foreach (var brand in results)
        //    {
        //        var count = products_infor.Where(p => p.BrandID_NK == brand.ID_NK).ToList();
        //        var brandObject = new
        //        {
        //            Total = count.Count(),
        //            Brand = brand,
        //        };
        //        list_brands_response.Add(brandObject);
        //    }

        //    var sortedList = list_brands_response
        //        .OrderByDescending(c => c.Total).Take(15)
        //        .ToList();

        //    return sortedList;
        //}
        //Comments
        public async Task<List<DetailCommentDTO>> DetailComments(CommentParameters commentParameters, int ProductId)
        {
            var response = await _elasticClient.SearchAsync<object>(s => s
               .Index("comments")
               .Query(q => q
                   .Bool(b => b
                       .Filter(filters => filters
                           .Term(t => t.Field("ProductID").Value(ProductId))
                       )
                   )
               )
               .From(commentParameters.PageNumber * commentParameters.PageSize)
               .Size(commentParameters.PageSize)
            );

            if (!response.IsValid)
            {
                return new List<DetailCommentDTO>();
            }

            List<CommentDTO> detailComments = _mapper.Map<List<CommentDTO>>(ConvertToComment(response.Documents.ToList()));

            foreach (var commentDTO in detailComments)
            {
                var account = _mapper.Map<AccountDTO>(await _dbContext.Accounts.FirstOrDefaultAsync(a => a.ID_NK == commentDTO.AccountID));
                commentDTO.Account = account;
            }

            DetailCommentDTO comments = new DetailCommentDTO
            {
                DetailComment = detailComments,
                Total = (int)response.Total
            };

            return new List<DetailCommentDTO> { comments };
        }
        public class CommentsRatingCountDTO
        {
            public long RatingLessThanOrEqual1 { get; set; }
            public long Rating1To2 { get; set; }
            public long Rating2To3 { get; set; }
            public long Rating3To4 { get; set; }
            public long Rating4To5 { get; set; }
        }
        public async Task<CommentsRatingCountDTO> CommentsRatingCount(int idProduct)
        {
            var comments = await _dbContext.DetailComments.Where(c => c.ProductID == idProduct).ToListAsync();

            var countResponse1 = 0;
            var countResponse2 = 0;
            var countResponse3 = 0;
            var countResponse4 = 0;
            var countResponse5 = 0;
            foreach (var comment in comments)
            {
                if (comment.Rating <= 1)
                {
                    countResponse1 += 1;
                }
                else if (comment.Rating <= 2)
                {
                    countResponse2 += 1;
                }
                else if (comment.Rating <= 3)
                {
                    countResponse3 += 1;
                }
                else if (comment.Rating <= 4)
                {
                    countResponse4 += 1;
                }
                else
                {
                    countResponse5 += 1;
                }
            }


            return new CommentsRatingCountDTO
            {
                RatingLessThanOrEqual1 = countResponse1,
                Rating1To2 = countResponse2,
                Rating2To3 = countResponse3,
                Rating3To4 = countResponse4,
                Rating4To5 = countResponse5
            };
        }
        //Seller
        public async Task<SellerDTO> GetLastestProductsOfSellerById(SellerParameters sellerParameters, int id)
        {
            var res = await _dbContext.Sellers.FindAsync(id);
            if (res == null)
            {
                return null;
            }

            var seller = _mapper.Map<SellerDTO>(res);

            var countResponse = await _elasticClient.CountAsync<object>(c => c
                .Index("products")
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters => filters
                            .Term(t => t.Field("SellerID_NK").Value(id))
                        )
                    )
                )
            );

            if (countResponse.IsValid)
            {
                seller.Total = Convert.ToInt32(countResponse.Count);
            }
            else
            {
                seller.Total = 0;
            }

            var searchResponse = await _elasticClient.SearchAsync<object>(s => s
                .Index("products")
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters => filters
                            .Term(t => t.Field("SellerID_NK").Value(id))
                        )
                    )
                )
                .From(sellerParameters.PageNumber * sellerParameters.PageSize)
                .Size(sellerParameters.PageSize)
            );

            var listProductDetail = new List<ProductDetailDTO>();

            if (searchResponse.IsValid && searchResponse.Documents.Any())
            {
                var latestProduct = ConvertToProduct(searchResponse.Documents.ToList());
                var latestProducts = latestProduct.OrderByDescending(p => p.CreatedAt);
                foreach (var item in latestProduct)
                {
                    var productDetail = new ProductDetailDTO();
                    var images = await _dbContext.Images.Where(i => i.ProductID_NK == item.ID_NK).ToListAsync();

                    productDetail.Product = _mapper.Map<ProductDTO>(item);
                    productDetail.Images = _mapper.Map<List<ImageDTO>>(images);

                    listProductDetail.Add(productDetail);
                }

                seller.Products = listProductDetail;
            }
            else
            {
                seller.Products = null;
            }

            return seller;
        }
        public async Task<SellerDTO> GetTopQuantitySoldProductsOfSellerById(SellerParameters sellerParameters, int id)
        {
            var res = await _dbContext.Sellers.FindAsync(id);
            if (res == null)
            {
                return null;
            }

            var seller = _mapper.Map<SellerDTO>(res);

            var countResponse = await _elasticClient.CountAsync<object>(c => c
                .Index("products")
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters => filters
                            .Term(t => t.Field("SellerID_NK").Value(id))
                        )
                    )
                )
            );

            if (countResponse.IsValid)
            {
                seller.Total = Convert.ToInt32(countResponse.Count);
            }
            else
            {
                seller.Total = 0;
            }

            var searchResponse = await _elasticClient.SearchAsync<object>(s => s
                .Index("products")
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters => filters
                            .Term(t => t.Field("SellerID_NK").Value(id))
                        )
                    )
                )
                .From(sellerParameters.PageNumber * sellerParameters.PageSize)
                .Size(sellerParameters.PageSize)
            );
            var listProductDetail = new List<ProductDetailDTO>();
            if (searchResponse.IsValid && searchResponse.Documents.Any())
            {
                var latestProduct = ConvertToProduct(searchResponse.Documents.ToList());
                var latestProducts = latestProduct.OrderByDescending(p => p.AllTimeQuantitySold);

                foreach (var item in latestProducts)
                {
                    var productDetail = new ProductDetailDTO();
                    var images = await _dbContext.Images.Where(i => i.Product.ID_NK == item.ID_NK).ToListAsync();

                    productDetail.Product = _mapper.Map<ProductDTO>(item);
                    productDetail.Images = _mapper.Map<List<ImageDTO>>(images);

                    listProductDetail.Add(productDetail);
                }

                seller.Products = listProductDetail;
            }
            else
            {
                seller.Products = null;
            }

            return seller;
        }
        public async Task<List<Product>> GetProductByCate(int cateId)
        {
            var countResponse = await _elasticClient.SearchAsync<object>(c => c
                .Index("products")
                .Size(10)
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters => filters
                            .Term(p => p.Field("Category_LV0_NK").Value(cateId))
                        )
                    )
                )
                .Sort(ss => ss
                    .Field(f => f
                        .Field("RatingCount")
                        .Order(SortOrder.Descending)
                    )
                    .Field(f => f
                        .Field("RatingAverage")
                        .Order(SortOrder.Descending)
                    )
                )
            );
            return new List<Product>();
        }
        public async Task<SellerDTO> GetProductsBySeller(SellerParameters sellerParameters, int id)
        {
            var res = await _dbContext.Sellers.FindAsync(id);
            if (res == null)
            {
                return null;
            }

            var seller = _mapper.Map<SellerDTO>(res);

            var filters = new List<QueryContainer>();

            if (sellerParameters.CategoryIds.Any())
            {
                filters.Add(new TermsQuery
                {
                    Field = "Category_LV0_NK",
                    Terms = sellerParameters.CategoryIds.Select(id => (object)id)
                });
            }

            if (sellerParameters.BrandIds.Any())
            {
                filters.Add(new TermsQuery
                {
                    Field = "BrandID_NK",
                    Terms = sellerParameters.BrandIds.Select(id => (object)id)
                });
            }

            if (sellerParameters.MinPrice.HasValue || sellerParameters.MaxPrice.HasValue)
            {
                filters.Add(new NumericRangeQuery
                {
                    Field = "Price",
                    GreaterThanOrEqualTo = (double)sellerParameters.MinPrice,
                    LessThanOrEqualTo = (double)sellerParameters.MaxPrice
                });
            }

            if (sellerParameters.MinReviewRating.HasValue)
            {
                filters.Add(new NumericRangeQuery
                {
                    Field = "RatingAverage",
                    GreaterThanOrEqualTo = sellerParameters.MinReviewRating
                });
            }

            filters.Add(new TermsQuery
            {
                Field = "SellerID_NK",
                Terms = new[] { (object)id }
            });

            var searchResponse = await _elasticClient.SearchAsync<object>(s => s
                .Index("products")
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
                            .Field("ID_NK")
                    )
                )
                .Sort(ss => ss
                    .Field(f => f
                        .Field("RatingCount")
                        .Order(SortOrder.Descending)
                    )
                )
                .From(sellerParameters.PageNumber * sellerParameters.PageSize)
                .Size(sellerParameters.PageSize)
            );
            var totalProducts = Convert.ToInt32(searchResponse.Aggregations.ValueCount("total_products")?.Value ?? 0);

            seller.Total = totalProducts;

            var listProductDetail = new List<ProductDetailDTO>();

            if (searchResponse.IsValid && searchResponse.Documents.Any())
            {
                var latestProduct = ConvertToProduct(searchResponse.Documents.ToList());
                foreach (var item in latestProduct)
                {
                    var productDetail = new ProductDetailDTO();
                    var images = await _dbContext.Images.Where(i => i.Product.ID_NK == item.ID_NK).ToListAsync();
                    var brand = await _dbContext.Brands.FirstOrDefaultAsync(i => i.ID_NK == item.BrandID_NK);
                    var category = await _dbContext.Category.FindAsync(item.Category_LV0_NK);
                    List<ProductChild> children = await _dbContext.ProductChild.Where(p => p.Product.ID_NK == item.ID_NK).ToListAsync();

                    productDetail.Product = _mapper.Map<ProductDTO>(item);
                    productDetail.Images = _mapper.Map<List<ImageDTO>>(images);
                    productDetail.Seller = seller;
                    productDetail.Category = _mapper.Map<CategoryDTO>(category);
                    productDetail.Brand = _mapper.Map<BrandDTO>(brand);
                    productDetail.ProductChildren = _mapper.Map<List<ProductChildDTO>>(children);

                    listProductDetail.Add(productDetail);
                }

                seller.Products = listProductDetail;
            }
            else
            {
                seller.Products = null;
            }

            return seller;
        }
        //Category
        public async Task<List<dynamic>> GetCategoryLevel0BySearch(string keyWord)
        {
            var filters = new List<QueryContainer>();

            if (!string.IsNullOrEmpty(keyWord))
            {
                var multiMatchQuery = new MultiMatchQuery
                {
                    Query = keyWord,
                    Fields = new[] { "Name" },
                    Type = TextQueryType.BestFields,
                    Fuzziness = Fuzziness.Auto,
                    Operator = Operator.And
                };

                var matchPhrasePrefixQuery = new MatchPhrasePrefixQuery
                {
                    Field = "Name",
                    Query = keyWord,
                    Boost = 2.0
                };

                filters.Add(new BoolQuery
                {
                    Should = new List<QueryContainer>
                    {
                        multiMatchQuery,
                        matchPhrasePrefixQuery
                    },
                    MinimumShouldMatch = 1
                });
            }

            // Aggregation to get top 15 brands by product count
            var searchResponse = await _elasticClient.SearchAsync<dynamic>(s => s
                .Index("products")
                .Size(0) // We do not need the actual documents
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters.ToArray())
                    )
                )
                .Aggregations(a => a
                    .Terms("categories", t => t
                        .Field("Category_LV0_NK")
                        .Size(15)
                        .Order(o => o
                            .Descending("product_count")
                        )
                        .Aggregations(aa => aa
                            .ValueCount("product_count", v => v.Field("Category_LV0_NK"))
                        )
                    )
                )
            );

            if (!searchResponse.IsValid)
            {
                return new List<dynamic>();
            }

            var cateBuckets = searchResponse.Aggregations.Terms("categories").Buckets;
            var topCateIds = cateBuckets.Select(b => int.Parse(b.Key)).ToList();

            var categories = await _dbContext.Category
                .Where(b => topCateIds.Contains(b.ID_NK))
                .ToListAsync();

            if (!categories.Any())
            {
                return new List<dynamic>();
            }

            var categoriesResponse = new List<dynamic>();

            foreach (var category in categories)
            {
                var totalProduct = (int)cateBuckets.First(b => int.Parse(b.Key) == category.ID_NK).ValueCount("product_count").Value;

                var cateDTO = new
                {
                    Total = totalProduct,
                    Category = category
                };

                categoriesResponse.Add(cateDTO);
            }

            return categoriesResponse
                .OrderByDescending(c => c.Total)
                .ToList();
        }
        public async Task<List<dynamic>> GetCategoryLevel0OfSeller(int id)
        {
            var response = await _elasticClient.SearchAsync<object>(s => s
                .Index("products")
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters => filters
                            .Term(t => t.Field("SellerID_NK").Value(id))
                        )
                    )
                )
                .Aggregations(a => a
                    .ValueCount("total_products", vc => vc
                            .Field("ID_NK")
                    )
                )
            );

            var totalProducts = Convert.ToInt32(response.Aggregations.ValueCount("total_products")?.Value ?? 0);

            var allresponse = await _elasticClient.SearchAsync<object>(s => s
               .Index("products")
               .Query(q => q
                   .Bool(b => b
                       .Filter(filters => filters
                           .Term(t => t.Field("SellerID_NK").Value(id))
                       )
                   )
               )
               .Aggregations(a => a
                   .ValueCount("total_products", vc => vc
                           .Field("ID_NK")
                   )
               ).Size(totalProducts)
           );

            if (!response.IsValid || !allresponse.IsValid)
            {
                return null;
            }

            var products_infor = ConvertToProduct(allresponse.Documents.ToList());

            var categoryIds = products_infor.Select(p => p.Category_LV0_NK).Distinct().ToList();

            var list_categories_response = new List<dynamic>();

            var results = await _dbContext.Category.Where(p => p.Level == 0).ToListAsync();

            foreach (var category in results)
            {
                var count = products_infor.Where(p => p.Category_LV0_NK == category.ID_NK).ToList();
                var categoryObject = new
                {
                    Total = count.Count(),
                    Category = category,
                };
                list_categories_response.Add(categoryObject);
            }
            var sortedList = list_categories_response
               .OrderByDescending(c => c.Total)
               .ToList();

            return sortedList;
        }
        //public async Task<List<dynamic>> GetCategoryLevel0BySearch(string keyWord)
        //{
        //    var filters = new List<QueryContainer>();

        //    if (!string.IsNullOrEmpty(keyWord))
        //    {
        //        var multiMatchQuery = new MultiMatchQuery
        //        {
        //            Query = keyWord,
        //            Fields = new[] { "Name" },
        //            Type = TextQueryType.BestFields,
        //            Fuzziness = Fuzziness.Auto,
        //            Operator = Operator.And
        //        };

        //        var matchPhrasePrefixQuery = new MatchPhrasePrefixQuery
        //        {
        //            Field = "Name",
        //            Query = keyWord,
        //            Boost = 2.0
        //        };

        //        filters.Add(new BoolQuery
        //        {
        //            Should = new List<QueryContainer>
        //            {
        //                multiMatchQuery,
        //                matchPhrasePrefixQuery
        //            },
        //            MinimumShouldMatch = 1
        //        });
        //    }

        //    var response = await _elasticClient.SearchAsync<object>(s => s
        //        .Index("products")
        //        .Query(q => q
        //            .Bool(b => b
        //                .Must(mu => mu
        //                    .MatchAll()
        //                )
        //                .Filter(filters.ToArray())
        //            )
        //        )
        //        .Aggregations(a => a
        //            .ValueCount("total_products", vc => vc
        //                    .Field("ID_NK")
        //            )
        //        )
        //    );

        //    var totalProducts = Convert.ToInt32(response.Aggregations.ValueCount("total_products")?.Value ?? 0);

        //    var all_response = await _elasticClient.SearchAsync<object>(s => s
        //            .Index("products")
        //            .Size(totalProducts)
        //            .Query(q => q
        //                .Bool(b => b
        //                    .Must(mu => mu
        //                        .MatchAll()
        //                    )
        //                    .Filter(filters.ToArray())
        //                )
        //            )
        //        );

        //    if (!response.IsValid || !all_response.IsValid)
        //    {
        //        return null;
        //    }

        //    var products_infor = ConvertToProduct(all_response.Documents.ToList());

        //    var categoryIds = products_infor.Select(p => p.Category_LV0_NK).Distinct().ToList();

        //    var list_categories_response = new List<dynamic>();

        //    var results = await _dbContext.Category.Where(p => p.Level == 0).ToListAsync();

        //    foreach (var category in results)
        //    {
        //        var count = products_infor.Where(p => p.Category_LV0_NK == category.ID_NK).ToList();
        //        var categoryObject = new
        //        {
        //            Total = count.Count(),
        //            Category = category,
        //        };
        //        list_categories_response.Add(categoryObject);
        //    }

        //    var sortedList = list_categories_response
        //        .OrderByDescending(c => c.Total)
        //        .ToList();

        //    return sortedList;
        //}
        public async Task<List<Product>> Get20NewPro()
        {
            var response = await _elasticClient.SearchAsync<object>(s => s
                .Index("products")
                .From(0)
                .Size(20)
                .Sort(ss => ss
                    .Field(f => f
                        .Field("CreatedAt")
                        .Order(SortOrder.Descending)
                    )
                ));

            if (!response.IsValid)
            {
                return new List<Product>();
            }

            return ConvertToProduct(response.Documents.ToList());
        }

        public async Task<List<Seller>> GetSellerForUser(int usercode)
        {
            var priorityItems = await _elasticClient.SearchAsync<dynamic>(s => s
                .Index("accselpri")
                .Query(q => q
                    .Bool(b =>
                        b.Filter(f =>
                            f.Term(t => t.Field("ACCOUNTID").Value(usercode)
                        )
                    )
                )
            )
                .Sort(ss => ss
                    .Field(f => f
                        .Field("IDX")
                        .Order(SortOrder.Ascending)
                    )
                )
                .Size(10000)
            );

            if (!priorityItems.IsValid)
            {
                var thirtyDaysAgo = DateTime.Now.AddDays(-30);

                var topSellerIds = _dbContext.UserLog
                    .Where(log => log.DateTime >= thirtyDaysAgo && log.SellerId.HasValue)
                    .GroupBy(log => log.SellerId)
                    .Select(group => new
                    {
                        SellerId = group.Key,
                        LogCount = group.Count()
                    })
                    .OrderByDescending(x => x.LogCount)
                    .Take(14)
                    .Select(x => x.SellerId.Value) // We are assuming SellerId is not null
                    .ToList();
                var topSellers = _dbContext.Sellers
                    .Where(seller => topSellerIds.Contains(seller.ID_NK))
                    .ToList();
                return topSellers;
            }


            var sellerPriority = ConvertToSellerPriority(priorityItems.Documents.ToList());
            var ids = sellerPriority.OrderBy(e => e.Idx).Select(e => e.SellerID).ToList();
            var sellers = await _dbContext.Sellers.Where(exp => ids.Contains(exp.ID_NK)).ToListAsync();
            if (sellers.Count < 14)
            {
                var thirtyDaysAgo = DateTime.Now.AddDays(-30);

                var topSellerIds = _dbContext.UserLog
                    .Where(log => log.DateTime >= thirtyDaysAgo && log.SellerId.HasValue)
                    .GroupBy(log => log.SellerId)
                    .Select(group => new
                    {
                        SellerId = group.Key,
                        LogCount = group.Count()
                    })
                    .OrderByDescending(x => x.LogCount)
                    .Take(14 - sellers.Count)
                    .Select(x => x.SellerId.Value) // We are assuming SellerId is not null
                    .ToList();
                var topSellers = _dbContext.Sellers
                    .Where(seller => topSellerIds.Contains(seller.ID_NK))
                    .ToList();
                sellers.AddRange(topSellers);
            }
            return sellers;
        }
    }
}
