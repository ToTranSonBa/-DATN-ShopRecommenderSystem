using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data;
using ShopRe.Model.Models;
using ShopRe.Service;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductOptionsController : ControllerBase
    {
        readonly IProductOptionService _productOptionService;
        public ProductOptionsController(IProductOptionService productOptionService)
        {
            _productOptionService = productOptionService;
        }
        // GET: api/productoptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductOption>>> GetProductOptions()
        {
            var res = await _productOptionService.GetAll();
            return Ok(res);
        }

        // GET: api/productoptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductOption>> GetProductOption(int id)
        {
            var productOption = await _productOptionService.GetById(id);
            if (productOption == null)
            {
                return NotFound();
            }
            return Ok(productOption);
        }
        // POST: api/productoptions
        [HttpPost("OptionOfProduct")]
        public async Task<IActionResult> PostProductOptions([FromBody]CreateOptionParameters productOption)
        {
            var (option, optionvalue) = await _productOptionService.AddProductOption(productOption);

            return Ok(new
            {
                Option = option,
                Optionvalue = optionvalue
            });
        }
        // POST: api/productoptions
        [HttpPost]
        public async Task<ActionResult<ProductOption>> PostProduct(ProductOption productOption)
        {
            var res = await _productOptionService.Add(productOption);

            return CreatedAtAction(nameof(GetProductOption), new { id = productOption.ID }, productOption);
        }

        // DELETE: api/productoptions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProductOption>> DeleteProductOption(int id)
        {
            _productOptionService.Remove(id);

            return NoContent();
        }
        // PUT: api/productoptions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductOption(ProductOption productOption)
        {
            var res = await _productOptionService.Update(productOption);

            return NoContent();
        }
    }
}
