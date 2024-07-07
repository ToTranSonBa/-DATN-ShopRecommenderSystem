using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Nest;
using Newtonsoft.Json.Linq;
using ShopRe.Common.DTOs;
using ShopRe.Common.FunctionCommon;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data;
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
        Task<(IEnumerable<ProductDetailDTO> products, MetaData metaData)> GetAll(ProductParameters productParameters);
        Task<Product> GetById(int id);
        Task<Product> Add(Product entity);
        Task<int> AddRange(IEnumerable<Product> entities);
        Task<Product> AddProduct(CreateProductParameters entity, ApplicationUser seller);
        Task<ProductChild> AddProductChild(CreateProductChildPrameters entity, ApplicationUser seller);
        Task<ProductChild> UpdateProductChild(UpdateProductChildParameters entity, ApplicationUser seller);
        Task<Product> Update(UpdateProductParameters entity, int id, ApplicationUser user);
        Task Remove(int id, ApplicationUser user);
        IEnumerable<Product> Find(Expression<Func<Product, bool>> expression);
        Task<IEnumerable<Product>> GetPaged(int pageSize, int pageNumber);
        Task SaveManyAsync(Product[] products);
        Task SaveBulkAsync(Product[] products);
        Task<IEnumerable<Product>> SearchProductByUser(ProductParameters productParameters, string keyWord, int user);
        Task<ProductDetailDTO> GetProductDetail(int idProduct);
        public Task<List<object>> GetProductValues(int ProductId);
        public Task<List<Product>> GetRecommendProductAsync(RecommendParamaters reParams, int userCode);
        public Task<List<ProductWithImages>> Get20NewPro();
        public Task<List<ProductWithImages>> GetPopular(int number);
        public Task<List<ProductWithImages>> GetTopView(int number);
        Task<(decimal? Price, string Image)> GetPriceAndImageProductChild(int id, int? idOptionValue1, int? idOptionValue2);
        Task<(Common.DTOs.Page paging, List<Product> products)> GetRecommendProductForUserAsync(int userCode, int CurrentPage = 0);
        Task RemoveProductChild(int id, ApplicationUser user);
    }
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IProductChildRepository _productChildRepository;
        private readonly ISellerPriorityRepository _sellerPriorityRepository;
        private readonly IElasticClient _elasticClient;
        private readonly ILogger<ProductService> _logger;
        private readonly ShopRecommenderSystemDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;
        public IUnitOfWork _unitOfWork;

        public ProductService(IProductRepository productRepository, ISellerPriorityRepository sellerPriorityRepository,
            ILogger<ProductService> logger, IElasticClient elasticClient,
            ShopRecommenderSystemDbContext dbContext, IMapper mapper, IUnitOfWork unitOfWork,
            HttpClient httpClient, IProductChildRepository productChildRepository)
        {
            _mapper = mapper;
            _productRepository = productRepository;
            _sellerPriorityRepository = sellerPriorityRepository;
            _elasticClient = elasticClient;
            _logger = logger;
            _dbContext = dbContext;
            _httpClient = httpClient;
            _unitOfWork = unitOfWork;
            _productChildRepository = productChildRepository;
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

        public async Task<(decimal? Price, string Image)> GetPriceAndImageProductChild(int id, int? idOptionValue1, int? idOptionValue2)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.ID_NK == id && p.IsDeleted == false);
            if (product == null)
            {
                throw new InvalidOperationException("Product not found.");
            }

            if (idOptionValue1.HasValue)
            {
                ProductChild productChild = null;

                if (idOptionValue2.HasValue)
                {
                    productChild = await _dbContext.ProductChild.FirstOrDefaultAsync(p =>
                        p.ProductID_NK == id && p.OptionValuesID1 == idOptionValue1 && p.OptionValuesID2 == idOptionValue2);
                }
                else
                {
                    productChild = await _dbContext.ProductChild.FirstOrDefaultAsync(p =>
                        p.ProductID_NK == id && p.OptionValuesID1 == idOptionValue1);
                }

                if (productChild == null)
                {
                    throw new InvalidOperationException("Product child not found.");
                }

                return (productChild.Price, productChild.thumbnail_url);
            }
            else
            {
                var image = await _dbContext.Images.FirstOrDefaultAsync(i => i.ProductID_NK == id);
                if (image == null)
                {
                    throw new InvalidOperationException("Image not found.");
                }
                return (product.Price, image.Image);
            }
        }

        private class OptionAndValues
        {
            public ProductOption? Option { get; set; }
            public List<ProductOptionValues> ProductOptionValues { get; set; } = new List<ProductOptionValues>();
            public List<ProductChild> ProductChildren { get; set; } = new List<ProductChild>();
        }
        public class ProductDetail
        {
            public ProductDetailDTO Product { get; set; } = new ProductDetailDTO();
        }

        public async Task<ProductDetailDTO> GetProductDetail(int idProduct)
        {
            ProductDetailDTO productDetail = new ProductDetailDTO();

            //Product product = await _productRepository.GetById(idProduct);
            Product product = await _unitOfWork.Products.GetById(idProduct);
            if (product == null || product.IsDeleted == true)
            {
                return null;
            }

            List<Images> images = await _dbContext.Images
                .Where(p => p.Product.ID_NK == idProduct)
                .ToListAsync();

            Seller seller = await _dbContext.Sellers.FindAsync(product.SellerID_NK);

            var totalCount = await _elasticClient.CountAsync<object>(c => c
                .Index("products")
                .Query(q => q
                    .Term(t => t
                        .Field("SellerID_NK")
                        .Value(seller.ID_NK)
                    )
                )
            );

            Category category = await _dbContext.Category.FindAsync(product.Category_LV0_NK);

            Brand brand = await _dbContext.Brands.FindAsync(product.BrandID_NK);

            List<ProductChild> children = await _dbContext.ProductChild.Where(p => p.Product.ID_NK == idProduct)
                .ToListAsync();

            // Thiết lập các giá trị cho productDetail
            productDetail.Product = _mapper.Map<ProductDTO>(product);
            productDetail.Images = _mapper.Map<List<ImageDTO>>(images);
            productDetail.Seller = _mapper.Map<SellerDTO>(seller);
            productDetail.Seller.Total = (int)totalCount.Count;
            productDetail.Category = _mapper.Map<CategoryDTO>(category);
            productDetail.Brand = _mapper.Map<BrandDTO>(brand);
            productDetail.ProductChildren = _mapper.Map<List<ProductChildDTO>>(children);

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

                var productChildNames = optionValues.Select(ov => ov.Name).ToList();

                //var productChildren = await _dbContext.ProductChild
                //    .Where(pc => (productChildNames.Contains(pc.option1) || productChildNames.Contains(pc.option2) ||
                //          productChildNames.Contains(pc.option3) || productChildNames.Contains(pc.option4)) &&
                //         pc.Product.ID_NK == ProductId)
                //    .ToListAsync();
                var productChildren = await _dbContext.ProductChild
                   .Where(pc => pc.Product.ID_NK == ProductId)
                   .ToListAsync();
                var productOptionValues = new OptionAndValues()
                {
                    Option = option,
                    ProductOptionValues = optionValues,
                    ProductChildren = productChildren
                };

                list.Add(productOptionValues);

            }

            return list.ToList();

        }

        //public async Task<List<object>> GetProductValues(int productId)
        //{
        //    var list = new List<object>();

        //    // Truy vấn các tùy chọn sản phẩm theo ProductID
        //    var options = await _dbContext.ProductOptions
        //        .Where(p => p.ProductID == productId)
        //        .ToListAsync();

        //    foreach (var option in options)
        //    {
        //        // Truy vấn các giá trị tùy chọn theo OptionId
        //        var optionValues = await _dbContext.ProductOptionValues.Where(p => p.Option == option).ToListAsync();

        //        // Lấy tên của các giá trị tùy chọn
        //        var optionValueNames = optionValues.Select(ov => ov.Name).ToList();

        //        // Truy vấn các sản phẩm con dựa trên tên của các giá trị tùy chọn
        //        var productChildren = await _dbContext.ProductChild
        //            .Where(pc => optionValueNames.Contains(pc.option1) || optionValueNames.Contains(pc.option2) ||
        //                         optionValueNames.Contains(pc.option3) || optionValueNames.Contains(pc.option4))
        //            .ToListAsync();

        //        // Gắn kết các ProductChild với OptionValues tương ứng
        //        var productOptionValues = new OptionAndValues()
        //        {
        //            Option = option,
        //            ProductOptionValues = optionValues,
        //            ProductChildren = productChildren
        //        };

        //        list.Add(productOptionValues);
        //    }

        //    return list;
        //}

        public async Task<Product> AddProduct(CreateProductParameters entity, ApplicationUser user)
        {
            try
            {
                var category = await _dbContext.Category.FirstOrDefaultAsync(c => c.ID_NK == Convert.ToInt32(entity.Categories));

                if (category == null)
                {
                    throw new ArgumentException("Invalid category ID.");
                }

                var seller = await _dbContext.Sellers.FirstOrDefaultAsync(s => s.ApplicationUser.Id == user.Id);

                if (seller == null)
                {
                    throw new ArgumentException("Invalid seller.");
                }

                var product = new Product
                {
                    Name = entity.ProductName,
                    ShortDescription = entity.ShortDescription,
                    Description = entity.ProductDescription,
                    Price = entity.Price,
                    Quantity = entity.Quantity,
                    Category_LV0_NK = category.ID_NK,
                    IsDeleted = false,
                    AllTimeQuantitySold = 0,
                    RatingAverage = 0,
                    RatingCount = 0,
                    MaxSaleQuantity = 0,
                    MinSaleQuantity = 0,
                    OriginalPrice = entity.Price,
                    BrandID_NK = Convert.ToInt32(entity.BrandID),
                    SellerID_NK = seller.ID_NK,

                };

                //var productEntityEntry = await _dbContext.Products.AddAsync(product);
                var productEntityEntry = await _unitOfWork.Products.AddAsync(product);
                await _dbContext.SaveChangesAsync();

                foreach (var item in entity.Images)
                {
                    var image = new Images
                    {
                        ProductID_NK = productEntityEntry.Entity.ID_NK,
                        Image = item,
                    };
                    await _dbContext.Images.AddAsync(image);
                }

                await _dbContext.SaveChangesAsync();

                var indexResponse = await _elasticClient.IndexDocumentAsync(product);

                if (!indexResponse.IsValid)
                {
                    throw new Exception($"Failed to index product {product.ID_NK} into Elasticsearch: {indexResponse.ServerError?.Error?.Reason}");
                }

                return productEntityEntry.Entity;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to add product.", ex);
            }
        }

        public async Task<ProductChild> AddProductChild(CreateProductChildPrameters entity, ApplicationUser user)
        {
            try
            {
                var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.ID_NK == entity.IdProduct && p.IsDeleted == false);
                if (product == null)
                {
                    throw new ArgumentException("Invalid Product ID.");
                }

                if (entity.OptionValuesID1.HasValue)
                {
                    var optionValue1 = await _dbContext.ProductOptionValues.FirstOrDefaultAsync(o => o.Id == entity.OptionValuesID1);
                    if (optionValue1 == null)
                    {
                        throw new ArgumentException("Invalid OptionValue1 ID.");
                    }
                    if (entity.OptionValuesID2.HasValue)
                    {
                        var optionValue2 = await _dbContext.ProductOptionValues.FirstOrDefaultAsync(o => o.Id == entity.OptionValuesID2);
                        if (optionValue2 == null)
                        {
                            throw new ArgumentException("Invalid OptionValue2 ID.");
                        }
                        var productChild = new ProductChild
                        {
                            Name = product.Name + " ("+optionValue1.Name+" - "+ optionValue2.Name+ ")",
                            thumbnail_url = entity.thumbnail_url,
                            Price = entity.Price,
                            option1 = optionValue1.Name,
                            option2= optionValue2.Name,
                            ProductID_NK = entity.IdProduct,
                            OptionValuesID1 = optionValue1.Id,
                            OptionValuesID2 = optionValue2.Id,
                        };
                        var productChildEntity = await _dbContext.ProductChild.AddAsync(productChild);
                        await _dbContext.SaveChangesAsync();

                        return productChildEntity.Entity;
                    }
                    else
                    {
                        var productChild = new ProductChild
                        {
                            Name = product.Name + " (" + optionValue1.Name + ")",
                            thumbnail_url = entity.thumbnail_url,
                            Price = entity.Price,
                            option1 = optionValue1.Name,
                            OptionValuesID1 = optionValue1.Id,
                            ProductID_NK = entity.IdProduct
                        };
                        var productChildEntity = await _dbContext.ProductChild.AddAsync(productChild);
                        await _dbContext.SaveChangesAsync();

                        return productChildEntity.Entity;
                    }
                }
                return new ProductChild();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to add product child.", ex);
            }
        }

        public async Task<ProductChild> UpdateProductChild(UpdateProductChildParameters entity, ApplicationUser seller)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.ID_NK == entity.IdProduct && p.IsDeleted == false);
            if (product == null)
            {
                throw new ArgumentException("Invalid Product ID.");
            }

            var productChildRes = await _dbContext.ProductChild.FirstOrDefaultAsync(p => p.ProductID_NK == entity.IdProduct
            && p.OptionValuesID1 == entity.OptionValuesID1 && p.OptionValuesID2 == entity.OptionValuesID2);

            if (productChildRes == null)
            {
                throw new ArgumentException("ProductChild not found.");
            }

            var productChild2 = await _productChildRepository.GetById(productChildRes.Id);

            productChild2.Price = entity.Price;
            productChild2.thumbnail_url = entity.thumbnail_url;



            await _unitOfWork.ProductChilds.Update(productChild2);

            //_unitOfWork.Save();
            return productChild2;
        }

        public async Task RemoveProductChild(int id, ApplicationUser user)
        {
            var productChild = await _dbContext.ProductChild.FirstOrDefaultAsync(p => p.Id == id);

            if (productChild == null)
            {
                throw new ArgumentException("ProductChild không tồn tại. ");
            }

            var seller = await _dbContext.Sellers.FirstOrDefaultAsync(s => s.ApplicationUser.Id == user.Id);
            if (seller == null)
            {
                throw new ArgumentException("Seller không tồn tại.");
            }

            _unitOfWork.ProductChilds.Remove(productChild.Id);
        }
        public async Task Remove(int id, ApplicationUser user)
        {
            try
            {
                var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.ID_NK == id && p.IsDeleted == false);

                if (product == null)
                {
                    throw new ArgumentException("Sản phẩm không tồn tại. ");
                }

                var seller = await _dbContext.Sellers.FirstOrDefaultAsync(s => s.ApplicationUser.Id == user.Id);
                if (seller == null)
                {
                    throw new ArgumentException("Seller không tồn tại.");
                }

                product.IsDeleted = true;

                await _unitOfWork.Products.Update(product);
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xóa sản phẩm.", ex);
            }

        }

        public async Task<Product> Update(UpdateProductParameters entity, int id, ApplicationUser user)
        {
            try
            {
                var categoryId = Convert.ToInt32(entity.Categories);
                var category = await _dbContext.Category.FirstOrDefaultAsync(c => c.ID_NK == categoryId);

                if (category == null)
                {
                    throw new ArgumentException("Invalid category ID.");
                }


                var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.ID_NK == id && p.IsDeleted == false);

                if (product == null)
                {
                    throw new ArgumentException("Product not found.");
                }

                var seller = await _dbContext.Sellers.FirstOrDefaultAsync(s => s.ApplicationUser.Id == user.Id);
                if (seller == null)
                {
                    throw new ArgumentException("Seller not found.");
                }

                product.Name = entity.ProductName;
                product.ShortDescription = entity.ShortDescription;
                product.Description = entity.ProductDescription;
                product.Price = entity.Price;
                product.Quantity = entity.Quantity;
                product.Category_LV0_NK = category.ID_NK;
                product.BrandID_NK = Convert.ToInt32(entity.BrandId);
                product.SellerID_NK = seller.ID_NK;

                var product_entity = _dbContext.Products.Update(product);
                await _dbContext.SaveChangesAsync();

                foreach (var item in entity.Images)
                {
                    var image = await _dbContext.Images.FirstOrDefaultAsync(i => i.ProductID_NK == id);

                    if (image == null)
                    {
                        image = new Images
                        {
                            ProductID_NK = id,
                            Image = item
                        };
                        _dbContext.Images.Add(image);
                    }
                    else
                    {
                        image.Image = item;
                        _dbContext.Images.Update(image);
                    }
                }

                await _dbContext.SaveChangesAsync();

                return product_entity.Entity;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update product.", ex);
            }
        }

        public async Task<(IEnumerable<ProductDetailDTO> products, MetaData metaData)> GetAll(ProductParameters productParameters)
        {
            var productWithMetadata = await _productRepository.GetAllProduct(productParameters);
            var productDTO = productWithMetadata.Select(e => new ProductDetailDTO
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

        public async Task<List<Product>> GetRecommendProductAsync(RecommendParamaters reParams, int userCode)
        {
            var requestUri = $"https://fastapi-2i32.onrender.com/get/RecommendProduct?userid={userCode}&productId={reParams.productId}&cateid={reParams.CateId}";

            var products = new List<Product>();
            JObject result;
            try
            {
                var response = await _httpClient.GetAsync(requestUri);
                response.EnsureSuccessStatusCode();
                var content = await response.Content.ReadAsStringAsync();
                result = JObject.Parse(content);
            }
            catch
            {
                return await GetProductByCate(reParams.CateId, new List<int>(), 10);

            }

            int total = (int)result["total"];

            if (total == 0)
            {
                return await GetProductByCate(reParams.CateId, new List<int>(), 10);
            }

            var productIds = new List<int>();
            try
            {
                foreach (int productId in result["products"])
                {
                    productIds.Add(productId);
                    var product = await _productRepository.GetById(productId);
                    products.Add(product);
                }
            }
            catch
            {
                return await GetProductByCate(reParams.CateId, new List<int>(), 10);
            }

            var productDif = new List<Product>();
            if (total < 10)
            {
                productDif = await GetProductByCate(reParams.CateId, productIds, 10 - total);
            }
            products.AddRange(productDif);

            return products;
        }
        public async Task<(Common.DTOs.Page paging, List<Product> products)> GetRecommendProductForUserAsync(int userCode, int CurrentPage = 0)
        {
            var requestUri = $"https://fastapi-2i32.onrender.com/get/RecommendProductForUser?userid={userCode}";
            bool error = false;
            var products = new List<Product>();
            JObject result = new JObject();
            try
            {
                var response = await _httpClient.GetAsync(requestUri);
                response.EnsureSuccessStatusCode();
                var content = await response.Content.ReadAsStringAsync();
                result = JObject.Parse(content);
            }
            catch
            {
                products = await _productRepository.GetTopView(10);
                result["total"] = 10;
                result["products"] = "[]";
                error = true;
            }

            int total = (int)result["total"];

            if (total == 0)
            {
                products = await _productRepository.GetTopView(10);
                total = 10;
                error = true;
            }

            var productIds = new List<int>();
            try
            {
                foreach (int productId in result["products"])
                {
                    productIds.Add(productId);
                    var product = await _productRepository.GetById(productId);
                    products.Add(product);
                }
            }
            catch
            {
                products = await _productRepository.GetTopView(10);
                total = 10;
                error = true;
            }

            var productDif = new List<Product>();
            if (total < 10)
            {
                productDif = await _productRepository.GetTopView(10);
            }

            if (!error)
            {
                products.AddRange(productDif);
            }
            if (products.Count == 0)
            {
                products = await _productRepository.GetTopView(10);
            }
            var page = new Common.DTOs.Page(products.Count, 10, CurrentPage);

            products = products.Skip(page.pageSize * CurrentPage).Take(page.pageSize).ToList();
            return (page, products);
        }
        public async Task<List<ProductWithImages>> GetTopNew(int number)
        {

            var result = await _productRepository.GetTopNew(number);
            var product = await ConvertToProductWithImages(result);
            return product;
        }
        public async Task<List<ProductWithImages>> GetPopular(int number)
        {
            var result = await _productRepository.GetProductPopular(number);
            var product = await ConvertToProductWithImages(result);
            return product;
        }
        private async Task<List<ProductWithImages>> ConvertToProductWithImages(List<Product> documents)
        {
            var products = new List<ProductWithImages>();
            foreach (dynamic document in documents)
            {
                var product = new ProductWithImages
                {
                    ID_NK = document.ID_NK,
                    Name = document.Name,
                    Price = document.Price,
                    RatingAverage = document.RatingAverage,
                    RatingCount = document.RatingCount,
                };
                product.Images = await _dbContext.Images.Where(i => i.ProductID_NK == product.ID_NK).Select(i => i.Image).ToListAsync();
                products.Add(product);
            }
            return products.ToList();
        }

        private async Task<List<Product>> GetProductByCate(int cateId, List<int> ProIds, int quantity)
        {

            var response = await _elasticClient.SearchAsync<object>(c => c
                .Index("products")
                .Size(quantity)
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters => filters
                            .Term(p => p.Field("Category_LV0_NK").Value(cateId)))
                        .MustNot(filter => ProIds.Count == 0 ? null : filter
                            .Term(p => p
                                .Field("ID_NK").Value(ProIds)
                             )
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
            if (!response.IsValid)
            {
                return new List<Product>();
            }
            var products = FunctionCommon.ConvertToProduct(response.Documents.ToList());
            return products;
        }
        public async Task<List<ProductWithImages>> GetTopView(int number)
        {
            var result = await _productRepository.GetTopView(number);
            return await ConvertToProductWithImages(result);
        }
        public async Task<List<ProductWithImages>> Get20NewPro()
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
                return new List<ProductWithImages>();
            }

            return await ConvertToProductWithImages(ConvertToProduct(response.Documents.ToList()));
        }
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

    }
}
