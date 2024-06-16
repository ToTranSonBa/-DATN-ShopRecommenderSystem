using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;
using ShopRe.Model.Models;
using ShopRe.Model.Models.user_s_log;
using ShopRe.Service;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        readonly IProductService _productsService;
        private readonly ILogger<ProductsController> _logger;
        private readonly IElasticSearchService _elasticSearchService;
        private readonly IAccountService _accountService;
        private readonly ILogService _logService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        public ProductsController(ILogService logService,
            IAccountService accountService,
            IProductService productsService,
            ILogger<ProductsController> logger,
            IElasticSearchService elasticSearchService,
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager)
        {
            _productsService = productsService;
            _logger = logger;
            _elasticSearchService = elasticSearchService;
            _accountService = accountService;
            _logService = logService;
            _signInManager = signInManager;
            _userManager = userManager;
        }
        // GET: api/products
        [HttpGet("GetProductsByTrainning")]
        public async Task<ActionResult> GetProductByTrainning([FromQuery] ProductParameters productParameters)
        {
            try
            {
                // Get token from the Authorization header
                var authHeader = Request.Headers["Authorization"].ToString();
                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    var (product, totalCount, brands, categories) = await _elasticSearchService.GetAllAsync(productParameters);
                    var productResponse = new
                    {
                        TotalCount = totalCount,
                        Brands = brands,
                        Categories = categories,
                        Product = product
                    };
                    return Ok(productResponse);
                }
                else
                {
                    var token = authHeader.Substring("Bearer ".Length).Trim();

                    // Get user from token
                    var user = await _accountService.GetUserFromTokenAsync(token);

                    var (product, totalCount, brands, categories) = await _elasticSearchService.ProductAfterTraining(productParameters);
                    var productResponse = new
                    {
                        TotalCount = totalCount,
                        Brands = brands,
                        Categories = categories,
                        Product = product
                    };
                    return Ok(productResponse);
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productsService.GetProductDetail(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }


        [HttpGet("Option/{id}")]
        public async Task<ActionResult> GetProductOptions(int id)
        {
            var option = await _productsService.GetProductValues(id);
            return Ok(option);
        }

        // POST: api/products
        [HttpPost("AddProduct")]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            var res = await _productsService.Add(product);

            return CreatedAtAction(nameof(GetProduct), new { id = product.ID_NK }, product);
        }

        // DELETE: api/products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            _productsService.Remove(id);

            return NoContent();
        }
        // PUT: api/products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            var res = await _productsService.Update(product);

            return NoContent();
        }

        [HttpGet("abdcde")]
        public async Task<ActionResult> Get([FromQuery] ProductParameters productParameters, string keyWord, int user)
        {
            try
            {
                var product = await _productsService.SearchProductByUser(productParameters, keyWord, user);

                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("logUserView")]
        public async Task<ActionResult> logProductView(int min, int sellerId)
        {
            var authHeader = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return Unauthorized();
            }

            var token = authHeader.Substring("Bearer ".Length).Trim();

            var user = await _accountService.GetUserFromTokenAsync(token);
            var res = await _logService.addView(min, sellerId, user);
            return Ok(res);
        }

        [HttpPost("RecommendProduct")]
        public async Task<ActionResult> logProductView(RecommendParamaters paramaters)
        {
            int userCode = 0;
            if (_signInManager.IsSignedIn(User))
            {
                var userId = _userManager.GetUserId(User);
                userCode = (await _userManager.FindByIdAsync(userId)).TrainCode;
            }


            var results = await _productsService.GetRecommendProductAsync(paramaters, userCode);
            if (results.Count() == 0)
            {
                return NoContent();
            }
            return Ok(results);
        }
        //[HttpPost("UpdateDocument")]
        //public async Task<ActionResult> UpdateDocument()
        //{
        //    try
        //    {
        //        // Lấy danh sách sản phẩm từ cơ sở dữ liệu
        //        var products = await _productsService.GetAll();

        //        // Chuyển đổi danh sách sản phẩm thành các tài liệu Elasticsearch
        //        var documents = products.Select(product => new
        //        {
        //            // Thay thế các thuộc tính dưới đây bằng các thuộc tính thực tế của sản phẩm
        //            ID_NK = product?.ID_NK ?? 0,
        //            ID_SK = product?.ID_SK ?? 0,
        //            Name = product?.Name ?? "",
        //            ShortDescription = product?.ShortDescription ?? "",
        //            Image = product?.Image ?? "",
        //            Price = product?.Price ?? 0,
        //            ListPrice = product?.ListPrice ?? 0,
        //            OriginalPrice = product?.OriginalPrice ?? 0,
        //            RatingAverage = product?.RatingAverage ?? 0,
        //            RatingCount = product?.RatingCount ?? 0,
        //            MaxSaleQuantity = product?.MaxSaleQuantity ?? 0,
        //            MinSaleQuantity = product?.MinSaleQuantity ?? 0,
        //            Quantity = product?.Quantity ?? 0,
        //            AllTimeQuantitySold = product?.AllTimeQuantitySold ?? 0,
        //            ShortUrl = product?.ShortUrl ?? ""

        //        }); ;

        //        var data = documents.ToList();

        //        var bulkAllObservable = _elasticClient.BulkAll(data, b => b
        //            .Index("product")
        //            .BackOffTime("60s")
        //            .BackOffRetries(5)
        //            .RefreshOnCompleted()
        //            .MaxDegreeOfParallelism(Environment.ProcessorCount)
        //            .Size(10000)
        //        );

        //        bulkAllObservable.Wait(TimeSpan.FromMinutes(15), next =>
        //        {
        //            // Xử lý sau mỗi lô tài liệu được nhập
        //        });

        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        // Xử lý lỗi nếu có
        //        return StatusCode(500, $"An error occurred: {ex.Message}");
        //    }
        //}




        //GET: api/products


        // GET: api/products/5
        //[HttpGet("asfasdf")]
        //public async Task<ActionResult> GetAllProducts([FromQuery] ProductParameters productParameters)
        //{
        //    var pageResult = await _productsService.GetAll(productParameters);
        //    Response.Headers.Add("X-paginatioin", JsonSerializer.Serialize(pageResult.metaData));

        //    return Ok(pageResult.products);
        //}
        [HttpGet("GetTopNew")]
        public async Task<ActionResult> GetToDay()
        {
            var result = await _productsService.GetTopNew(5);
            return Ok(result);
        }
        [HttpGet("GetTopPop")]
        public async Task<ActionResult> GetPopular()
        {
            var result = await _productsService.GetPopular(10);
            return Ok(result);
        }
    }

}
