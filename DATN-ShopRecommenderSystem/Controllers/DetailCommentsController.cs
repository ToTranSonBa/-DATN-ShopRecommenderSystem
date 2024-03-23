using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopRe.Data;
using ShopRe.Model.Models;
using ShopRe.Service;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailCommentsController : ControllerBase
    {
        readonly IDetailCommentService _detailCommentService;
        public DetailCommentsController(IDetailCommentService detailCommentService)
        {
            _detailCommentService = detailCommentService;
        }
        // GET: api/detailcomments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetailComment>>> GetDetailComments()
        {
            var res = await _detailCommentService.GetAll();
            return Ok(res);
        }

        // GET: api/detailcomments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DetailComment>> GetDetailComment(int id)
        {
            var detailComment = await _detailCommentService.GetById(id);
            if (detailComment == null)
            {
                return NotFound();
            }
            return Ok(detailComment);
        }

        // POST: api/detailcomments
        [HttpPost]
        public async Task<ActionResult<DetailComment>> PostDetailComment(DetailComment detailComment)
        {
            var res = await _detailCommentService.Add(detailComment);

            return CreatedAtAction(nameof(GetDetailComment), new { id = detailComment.ID_NK }, detailComment);
        }

        // DELETE: api/detailcomments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DetailComment>> DeleteDetailComment(int id)
        {
            _detailCommentService.Remove(id);

            return NoContent();
        }
        // PUT: api/detailcomments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetailComment(int id, DetailComment detailComment)
        {
            var res = _detailCommentService.Update(detailComment);

            return NoContent();
        }
    }
}
