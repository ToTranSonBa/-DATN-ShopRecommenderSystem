﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nest;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data;
using ShopRe.Model.Models;
using ShopRe.Service;
using System.Xml.Linq;
using System.Text.Json;
using Microsoft.AspNetCore.Cors;

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
        public ProductsController(IProductService productsService, ILogger<ProductsController> logger, IElasticSearchService elasticSearchService)
        {
            _productsService = productsService;
            _logger = logger;
            _elasticSearchService = elasticSearchService;
        }
        // GET: api/products
        [HttpGet("GetProductsByTrainning")]
        public async Task<ActionResult> GetProductByTrainning([FromQuery] ProductParameters productParameters)
        {
            try
            {
                var (product,totalCount) = await _elasticSearchService.ProductAfterTraining(productParameters);

                var productResponse = new
                {
                    Product = product,
                    TotalCount = totalCount
                };

                return Ok(productResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        // GET: api/products
        [HttpGet("GetAllProducts")]
        public async Task<ActionResult> GetAll([FromQuery] ProductParameters productParameters)
        {
            try
            {
                var product = await _elasticSearchService.GetAllAsync(productParameters);

                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
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
    }
}