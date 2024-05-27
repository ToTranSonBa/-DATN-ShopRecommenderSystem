using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopRe.Common.DTOs;
using ShopRe.Data;
using ShopRe.Model.Models;
using ShopRe.Service;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        readonly ICategoryService _categoryService;
        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        // GET: api/categories

        [EnableCors]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDetailDTO>>> GetCategories(int level)
        {
            var res = await _categoryService.GetCategoryLevel(level);
            return Ok(new Response<CategoryDetailDTO>
            {
                message = "Success!",
                status = "200",
                token = null,
                Data = res
            });
        }

        // GET: api/categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _categoryService.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        // POST: api/categories
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategoryt(Category category)
        {
            var res = await _categoryService.Add(category);

            return CreatedAtAction(nameof(GetCategory), new { id = category.ID_NK }, category);
        }

        // DELETE: api/categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            _categoryService.Remove(id);

            return NoContent();
        }
        // PUT: api/categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoryt(Category category)
        {
            var res = await _categoryService.Update(category);

            return NoContent();
        }


    }
}
