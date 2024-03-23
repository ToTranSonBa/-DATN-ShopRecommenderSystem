using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopRe.Data;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using ShopRe.Service;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandService _brandService;
        public BrandsController(IBrandService brandService)
        {
            _brandService = brandService;
        }
        // GET: api/brands
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Brand>>> GetBrands()
        {
            var res = await _brandService.GetAll();
            return Ok(res);
        }

        // GET: api/brands/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrand(int id)
        {
            var Brand = await _brandService.GetById(id);
            if (Brand == null)
            {
                return NotFound();
            }
            return Ok(Brand);
        }

        // POST: api/brands
        [HttpPost]
        public async Task<ActionResult<Brand>> PostBrand(Brand Brand)
        {
            var res = await _brandService.Add(Brand);

            return CreatedAtAction(nameof(GetBrand), new { id = Brand.ID_NK }, Brand);
        }

        // DELETE: api/brands/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Brand>> DeleteBrand(int id)
        {
            _brandService.Remove(id);

            return NoContent();
        }
        // PUT: api/brands/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBrand(Brand Brand)
        {
            var res = await _brandService.Update(Brand);

            return NoContent();
        }
    }
}
