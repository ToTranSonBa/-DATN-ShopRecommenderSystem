using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Nest;
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
        //
        [HttpGet("CheckConnectES")]
        public async Task<ActionResult> TotalProductES()
        {
            try
            {
                var total = await _elasticSearchService.TestElastic();
                return Ok(total);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [HttpDelete("DeleteDocumentES{id}")]
        public async Task<ActionResult> TestES(int id)
        {
            try
            {
                await _elasticSearchService.DeleteDocumentByIDNK(id);
                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
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
                    var (totalCount, products) = await _elasticSearchService.GetAllAsync(productParameters);
                    var productResponse = new
                    {
                        TotalCount = totalCount,
                        Product = products
                    };
                    return Ok(productResponse);
                }
                else
                {
                    var token = authHeader.Substring("Bearer ".Length).Trim();

                    // Get user from token
                    var user = await _accountService.GetUserFromTokenAsync(token);

                    var (totalCount, products) = await _elasticSearchService.ProductAfterTraining(productParameters);
                    var productResponse = new
                    {
                        TotalCount = totalCount,
                        Product = products
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
            var authHeader = Request.Headers["Authorization"].ToString();
            if (!string.IsNullOrEmpty(authHeader) || authHeader.StartsWith("Bearer "))
            {
                var token = authHeader.Substring("Bearer ".Length).Trim();

                var user = await _accountService.GetUserFromTokenAsync(token);
                var res = await _logService.addView(product.Product.ID_NK,product.Seller.ID_NK, user);
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
        [Authorize]
        [HttpPost("AddProduct")]
        public async Task<IActionResult> PostProduct([FromBody] CreateProductParameters product)
        {
            try
            {
                //Lấy token từ header Authorization
                var authHeader = Request.Headers["Authorization"].ToString();
                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    return Unauthorized();
                }
                var token = authHeader.Substring("Bearer ".Length).Trim();

                var user = await _accountService.GetUserFromTokenAsync(token);
                if (user == null)
                {
                    return Unauthorized(new Response<CartItem>()
                    {
                        message = "Unauthorized!",
                        status = "401",
                        token = token,
                        Data = null,
                    });
                }

                var res = await _productsService.AddProduct(product, user);
                await _elasticSearchService.AddProductToIndex(res);

                return CreatedAtAction(nameof(GetProduct), new { id = res.ID_NK }, res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Không thể thêm sản phẩm.");
            }
        }

        //DELETE: api/products/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                // Lấy token từ header Authorization
                var authHeader = Request.Headers["Authorization"].ToString();
                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    return Unauthorized();
                }
                var token = authHeader.Substring("Bearer ".Length).Trim();

                var user = await _accountService.GetUserFromTokenAsync(token);
                if (user == null)
                {
                    return Unauthorized(new Response<CartItem>()
                    {
                        message = "Unauthorized!",
                        status = "401",
                        token = token,
                        Data = null,
                    });
                }

                await _productsService.Remove(id, user);
                await _elasticSearchService.DeleteDocumentByIDNK(id);

                return Ok(new
                {
                    status = 204,
                    message = "Xóa sản phẩm thành công",
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Không thể xóa sản phẩm.");
            }
        }
        // PUT: api/products/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct([FromBody] UpdateProductParameters updateProduct, int id)
        {
            try
            {
                // Lấy token từ header Authorization
                var authHeader = Request.Headers["Authorization"].ToString();
                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    return Unauthorized();
                }
                var token = authHeader.Substring("Bearer ".Length).Trim();

                var user = await _accountService.GetUserFromTokenAsync(token);
                if (user == null)
                {
                    return Unauthorized(new Response<CartItem>()
                    {
                        message = "Unauthorized!",
                        status = "401",
                        token = token,
                        Data = null,
                    });
                }

                var res = await _productsService.Update(updateProduct, id, user);

                await _elasticSearchService.UpdateDocumentByIDNK(id, res);

                return Ok(new
                {
                    status = 202,
                    message = "Sửa sản phẩm thành công",
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Không thể xóa sản phẩm.");
            }
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

        //[HttpPost("logUserView")]
        //public async Task<ActionResult> logProductView(int min, int sellerId)
        //{
        //    var authHeader = Request.Headers["Authorization"].ToString();
        //    if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
        //    {
        //        return Unauthorized();
        //    }

        //    var token = authHeader.Substring("Bearer ".Length).Trim();

        //    var user = await _accountService.GetUserFromTokenAsync(token);
        //    var res = await _logService.addView( sellerId, user);
        //    return Ok(res);
        //}

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
        [HttpGet("GetTopView")]
        public async Task<ActionResult> GetTopView()
        {
            var result = await _productsService.GetTopView(10);
            return Ok(result);
        }
    }

}
