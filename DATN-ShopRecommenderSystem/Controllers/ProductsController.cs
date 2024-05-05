using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nest;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data;
using ShopRe.Model.Models;
using ShopRe.Service;
using System.Xml.Linq;
using System.Text.Json;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        readonly IProductService _productsService;
        private readonly IElasticClient _elasticClient;
        private readonly ILogger<ProductsController> _logger;
        public ProductsController(IProductService productsService, ILogger<ProductsController> logger, IElasticClient elasticClient)
        {
            _productsService = productsService;
            _logger = logger;
            _elasticClient = elasticClient;
        }
        // GET: api/products
        [HttpGet(Name="GetProducts")]
        public async Task<ActionResult> Get(string keyWord)
        {
            try
            {
                var response = await _elasticClient.SearchAsync<Product>(s => s
                    .Query(q => q
                        .Match(m => m
                            .Field(f => f.Name) // Tìm kiếm theo trường Name
                            .Query('*'+keyWord+'*') // Từ khóa tìm kiếm
                        )
                    )
                    .Size(1000) // Giới hạn số lượng kết quả trả về
                );

                if (!response.IsValid)
                {
                    // Xử lý lỗi nếu truy vấn không hợp lệ
                    return StatusCode(500, "Error searching for products.");
                }

                return Ok(response.Documents.ToList());
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("UpdateDocument")]
        public async Task<ActionResult> UpdateDocument()
        {
            try
            {
                // Lấy danh sách sản phẩm từ cơ sở dữ liệu
                var products = await _productsService.GetAll();

                // Chuyển đổi danh sách sản phẩm thành các tài liệu Elasticsearch
                var documents = products.Select(product => new
                {
                    // Thay thế các thuộc tính dưới đây bằng các thuộc tính thực tế của sản phẩm
                    ID_NK = product.ID_NK,
                    ID_SK= product.ID_SK,
                    Name = product.Name,
                    ShortDescription = product.ShortDescription,
                    Description  = product.Description,
                    Image = product.Image,
                    Price  = product.Price,
                    ListPrice = product.ListPrice,
                    OriginalPrice  = product.OriginalPrice,
                    RatingAverage  = product.RatingAverage,
                    RatingCount = product.RatingCount,
                    MaxSaleQuantity  = product.MaxSaleQuantity,
                    MinSaleQuantity  = product.MinSaleQuantity,
                    Quantity  = product.Quantity,
                    AllTimeQuantitySold  = product.AllTimeQuantitySold,
                    ShortUrl = product.ShortUrl,
                    Brand = product.Brand,
                    Category = product.Category,
                });

                // Nhập tài liệu vào Elasticsearch
                var response = await _elasticClient.IndexManyAsync(documents);

                if (!response.IsValid)
                {
                    // Xử lý lỗi nếu cần thiết
                    return StatusCode(500, "Error indexing documents into Elasticsearch.");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // GET: api/products
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        //{
        //    var res = await _productsService.GetAll();
        //    return Ok(res);
        //}

        // GET: api/products/5

        [HttpGet("asfasdf")]
        public async Task<ActionResult> GetAllProducts([FromQuery] ProductParameters productParameters)
        {
            var pageResult = await _productsService.GetAll(productParameters);
            Response.Headers.Add("X-paginatioin", JsonSerializer.Serialize(pageResult.metaData));

            return Ok(pageResult.products);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productsService.GetById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
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

    }
}
