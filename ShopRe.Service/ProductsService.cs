using Microsoft.Extensions.Logging;
using Nest;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data.Infrastructure;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System.Linq.Expressions;

namespace ShopRe.Service
{

    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAll();
        Task<IQueryable<Product>> GetAll(bool trackChanges);
        Task<(IEnumerable<ProductDto> products, MetaData metaData)> GetAll(ProductParameters productParameters);
        Task<Product> GetById(int id);
        Task<Product> Add(Product entity);
        Task<int> AddRange(IEnumerable<Product> entities);
        Task<Product> Update(Product entity);
        void Remove(int id);
        IEnumerable<Product> Find(Expression<Func<Product, bool>> expression);
        Task<IEnumerable<Product>> GetPaged(int pageSize, int pageNumber);
        Task SaveManyAsync(Product[] products);
        Task SaveBulkAsync(Product[] products);
        //Task<IEnumerable<Product>> GetAllAsync();
        //Task<(IEnumerable<ProductDto> products, MetaData metaData)> GetAllAsync(ProductParameters productParameters);
        Task<IEnumerable<Product>> GetAllAsync(ProductParameters productParameters);
        Task<IEnumerable<Product>> GetByIdAsync(int id);
        Task<IEnumerable<Product>> SearchByName(ProductParameters productParameters, string keyWord);
    }
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IElasticClient _elasticClient;
        private readonly ILogger<ProductService> _logger;

        public ProductService(IProductRepository productRepository, ILogger<ProductService> logger, IElasticClient elasticClient)
        {
            _productRepository = productRepository;
            _elasticClient = elasticClient;
            _logger = logger;
        }
        //Elastic Service
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
                    ShortUrl = document.ContainsKey("ShortUrl") ? document["ShortUrl"].ToString() : ""

                };
                products.Add(product);
            }
            return products.ToList();
        }

        public async Task<IEnumerable<Product>> GetAllAsync(ProductParameters productParameters)
        {
            //var response = await _elasticClient.SearchAsync<object>(s => s
            //    .Index("shoprecommend")
            //    .Query(q => q.MatchAll())
            //);

            //if (!response.IsValid)
            //{
            //    return Enumerable.Empty<Product>();
            //}

            //var documents = ConvertToProduct(response.Documents.ToList());
            //return documents;

            var response = await _elasticClient.SearchAsync<object>(s => s
                                                .Index("shoprecommend")
                                                .From(productParameters.PageNumber * productParameters.PageSize)
                                                .Size(productParameters.PageSize)
                                                .Query(q => q.MatchAll())
                                 );

            if (!response.IsValid)
            {
                return (Enumerable.Empty<Product>()); // Trả về danh sách rỗng nếu không thành công
            }

            var documents = ConvertToProduct(response.Documents.ToList());
            //var productDTO = documents.Select(e => new ProductDto
            //{
            //    ID_NK = e.ID_NK,
            //    Name = e.Name,
            //    Image = e.Image,
            //    Price = e.Price,
            //    AllTimeQuantitySold = e.AllTimeQuantitySold,
            //    ShortUrl = e.ShortUrl,
            //    RatingAverage = e.RatingAverage
            //});

            return documents;
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


        public async Task<IEnumerable<Product>> SearchByName(ProductParameters productParameters, string keyWord)
        {
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
                return Enumerable.Empty<Product>();
            }

            var documents = ConvertToProduct(response.Documents.ToList());
            return documents;
        }

        public async Task SaveManyAsync(Product[] products)
        {
            var result = await _elasticClient.IndexManyAsync(products);
            if (result.Errors)
            {
                // Có thể kiểm tra phản hồi để xử lý các lỗi
                foreach (var itemWithError in result.ItemsWithErrors)
                {
                    _logger.LogError("Failed to index document {0}: {1}",
                        itemWithError.Id, itemWithError.Error);
                }
            }
        }

        public async Task SaveBulkAsync(Product[] products)
        {
            var result = await _elasticClient.BulkAsync(b => b.Index("test3").IndexMany(products));
            if (result.Errors)
            {
                // Có thể kiểm tra phản hồi để xử lý các lỗi
                foreach (var itemWithError in result.ItemsWithErrors)
                {
                    _logger.LogError("Failed to index document {0}: {1}",
                        itemWithError.Id, itemWithError.Error);
                }
            }
        }

        //
        public Task<Product> Add(Product entity)
        {
            return _productRepository.Add(entity);
        }

        public Task<int> AddRange(IEnumerable<Product> entities)
        {
            return _productRepository.AddRange(entities);
        }

        public IEnumerable<Product> Find(Expression<Func<Product, bool>> expression)
        {
            return _productRepository.Find(expression);
        }

        public Task<IEnumerable<Product>> GetAll()
        {
            return _productRepository.GetAll();
        }

        public Task<IQueryable<Product>> GetAll(bool trackChanges)
        {
            return _productRepository.GetAll(trackChanges);
        }

        public Task<Product> GetById(int id)
        {
            return _productRepository.GetById(id);
        }

        public void Remove(int id)
        {
            _productRepository.Remove(id);
        }

        public Task<Product> Update(Product entity)
        {
            return _productRepository.Update(entity);
        }
        public async Task<(IEnumerable<ProductDto> products, MetaData metaData)> GetAll(ProductParameters productParameters)
        {
            var productWithMetadata = await _productRepository.GetAllProduct(productParameters);
            var productDTO = productWithMetadata.Select(e => new ProductDto
            {
                ID_NK = e.ID_NK,
                Name = e.Name,
                Image = e.Image,
                Price = e.Price,
                AllTimeQuantitySold = e.AllTimeQuantitySold,
                ShortUrl = e.ShortUrl,
                RatingAverage = e.RatingAverage
            });
            return (products: productDTO, metaData: productWithMetadata.MetaData);
        }

        public async Task<IEnumerable<Product>> GetPaged(int pageSize, int pageNumber)
        {
            return await _productRepository.GetPaged(pageSize, pageNumber);
        }
    }
}
