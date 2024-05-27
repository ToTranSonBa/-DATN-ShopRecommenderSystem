using Microsoft.Extensions.Logging;
using Nest;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using static ShopRe.Service.ProductService;

namespace ShopRe.Service
{

    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAll();
        Task<IQueryable<Product>> GetAll(bool trackChanges);
        Task<(IEnumerable<ProductDTO> products, MetaData metaData)> GetAll(ProductParameters productParameters);
        Task<Product> GetById(int id);
        Task<Product> Add(Product entity);
        Task<int> AddRange(IEnumerable<Product> entities);
        Task<Product> Update(Product entity);
        void Remove(int id);
        IEnumerable<Product> Find(Expression<Func<Product, bool>> expression);
        Task<IEnumerable<Product>> GetPaged(int pageSize, int pageNumber);
        Task SaveManyAsync(Product[] products);
        Task SaveBulkAsync(Product[] products);
        Task<IEnumerable<Product>> SearchProductByUser(ProductParameters productParameters, string keyWord, int user);
        Task<object> GetProductDetail(int idProduct);
        public Task<List<object>> GetProductValues(int ProductId);

    }
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ISellerPriorityRepository _sellerPriorityRepository;
        private readonly IElasticClient _elasticClient;
        private readonly ILogger<ProductService> _logger;
        private readonly ShopRecommenderSystemDbContext _dbContext;


        public ProductService(IProductRepository productRepository, ISellerPriorityRepository sellerPriorityRepository, ILogger<ProductService> logger, IElasticClient elasticClient, ShopRecommenderSystemDbContext dbContext)
        {
            _productRepository = productRepository;
            _sellerPriorityRepository = sellerPriorityRepository;
            _elasticClient = elasticClient;
            _logger = logger;
            _dbContext= dbContext;
        }
        //Elastic Service
        
        public class ProductWithChildDto
        {
            public Product Product { get; set; }
            public List<ProductChild> ProductChild { get; set; }
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

        private class OptionAndValues
        {
            public ProductOption? Option { get; set; }
            public List<ProductOptionValues> ProductOptionValues { get; set; } = new List<ProductOptionValues>();
        }
        public class ProductDetail
        {
            public ProductDTO Product { get; set; } = new ProductDTO();
            public Seller Seller { get; set; } = new Seller();
            public Category Category { get; set; } = new Category();
            public Brand Brand { get; set; } = new Brand();
        }

        public async Task<object> GetProductDetail(int idProduct)
        {
            Product product = await _productRepository.GetById(idProduct);
            if (product == null)
            {
                return null; // Hoặc trả về lỗi hoặc giá trị phù hợp nếu sản phẩm không tồn tại
            }

            var productDetail = new ProductDetail();

            // Lấy danh sách hình ảnh của sản phẩm
            List<Images> images = await _dbContext.Images
                .Where(p => p.Product.ID_NK == idProduct)
                .ToListAsync();

            // Lấy thông tin người bán
            Seller seller = await _dbContext.Sellers.FindAsync(product.SellerID_NK);

            // Lấy thông tin danh mục
            Category category = await _dbContext.Category.FindAsync(product.Category_LV0_NK);

            // Lấy thông tin thương hiệu
            Brand brand = await _dbContext.Brands.FindAsync(product.BrandID_NK);

            // Thiết lập các giá trị cho productDetail
            productDetail.Product.Product = product;
            productDetail.Product.Images = images;
            productDetail.Seller = seller;
            productDetail.Category = category;
            productDetail.Brand = brand;

            return productDetail;
        }

        public async Task<List<object>> GetProductValues(int ProductId)
        {
            var list = new List<object>();
            var options = await _dbContext.ProductOptions
                .Where(p => p.ProductID == ProductId)
                .ToListAsync();

            foreach (var option in options)
            {
                var optionValues = await _dbContext.ProductOptionValues.Where(p => p.Option == option).ToListAsync();
                var productOptionValues = new OptionAndValues()
                {
                    Option = option,
                    ProductOptionValues = optionValues
                };

                list.Add(productOptionValues);

            }

            return list.ToList();

        }

        public void Remove(int id)
        {
            _productRepository.Remove(id);
        }

        public Task<Product> Update(Product entity)
        {
            return _productRepository.Update(entity);
        }
        public async Task<(IEnumerable<ProductDTO> products, MetaData metaData)> GetAll(ProductParameters productParameters)
        {
            var productWithMetadata = await _productRepository.GetAllProduct(productParameters);
            var productDTO = productWithMetadata.Select(e => new ProductDTO
            {
                //ID_NK = e.ID_NK,
                //Name = e.Name,
                //Image = e.Image,
                //Price = e.Price,
                //AllTimeQuantitySold = e.AllTimeQuantitySold,
                //ShortUrl = e.ShortUrl,
                //RatingAverage = e.RatingAverage
            });
            return (products: productDTO, metaData: productWithMetadata.MetaData);
        }

        public async Task<IEnumerable<Product>> GetPaged(int pageSize, int pageNumber)
        {
            return await _productRepository.GetPaged(pageSize, pageNumber);
        }

        public async Task<IEnumerable<Product>> SearchProductByUser(ProductParameters productParameters, string keyWord, int user)
        {
            //var documents = await SearchByName(productParameters, keyWord);
            //documents = documents.ToList();

            //var selPrio = (await this.SearchSelprioByUser(user)).ToList();

            //var sortedProducts = documents.OrderBy(d => selPrio.FindIndex(s => s.SellerID == d.SellerID_NK)).ToList();

            //return sortedProducts;

            // Lấy danh sách SellerPriority cho user
            var sellerPriorityResponse = await _elasticClient.SearchAsync<SellerPriority>(s => s
                .Query(q => q
                    .Term(t => t.AccID, user)
                )
            );

            if (!sellerPriorityResponse.IsValid || !sellerPriorityResponse.Documents.Any())
            {
                // Xử lý lỗi hoặc không tìm thấy SellerPriority
                return new List<Product>();
            }

            var sellerPriorities = sellerPriorityResponse.Documents.ToDictionary(sp => sp.SellerID, sp => sp.Idx);

            // Tạo một list các sellerId với độ ưu tiên
            var sellerIdsWithPriority = sellerPriorities.Keys.ToList();

            // Tìm kiếm sản phẩm theo từ khóa và lọc theo sellerId
            var productSearchResponse = await _elasticClient.SearchAsync<Product>(s => s
                .Query(q => q
                    .Bool(b => b
                        .Must(m => m
                            .Match(mm => mm
                                .Field(f => f.Name)
                                .Query(keyWord)
                            )
                        )
                        .Filter(f => f
                            .Terms(t => t
                                .Field(ff => ff.SellerID_NK)
                                .Terms(sellerIdsWithPriority)
                            )
                        )
                    )
                )
                .Sort(sort => sort
                    .Script(ss => ss
                        .Type("number")
                        .Script(sc => sc
                            .Source("params.sellerPriorities[doc['sellerId'].value]")
                            .Params(p => p
                                .Add("sellerPriorities", sellerPriorities)
                            )
                        )
                        .Order(SortOrder.Descending)
                    )
                )
            );

            if (!productSearchResponse.IsValid)
            {
                // Xử lý lỗi
                return new List<Product>();
            }

            return productSearchResponse.Documents.ToList();

        }
        public async Task<IEnumerable<SellerPriority>> SearchSelprioByUser(int user)
        {
            var responsesel = await _elasticClient.SearchAsync<SellerPriority>(s => s
                    .Index("accselpri")
                    .Query(s => s.Term(t => t.Field(f => f.AccID).Value(user)))
                    );
            if (!responsesel.IsValid)
            {
                return Enumerable.Empty<SellerPriority>();
            }

            return responsesel.Documents.ToList();
        }

        private List<SellerPriority> ConvertToSelPrio(List<object> documents)
        {
            var selprios = new List<SellerPriority>();
            foreach (dynamic document in documents)
            {
                var selprio = new SellerPriority
                {
                    Idx = document.ContainsKey("IDX") ? Convert.ToInt32(document["IDX"]) : 0,
                    AccID = document.ContainsKey("ACCOUNTID") ? Convert.ToInt32(document["ACCOUNTID"]) : 0,
                    SellerID = document.ContainsKey("SELLERID") ? Convert.ToInt32(document["SELLERID"]) : 0
                };
                selprios.Add(selprio);
            }
            return selprios.OrderBy(s => s.Idx).ToList();
        }
    }
}
