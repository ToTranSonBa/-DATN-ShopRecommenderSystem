using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data;
using ShopRe.Model.Models;
using ShopRe.Service;
using System.Text.Json;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class DetailCommentsController : ControllerBase
    {
        readonly IDetailCommentService _detailCommentService;
        private readonly IElasticSearchService _elasticsearchService;
        private readonly IAccountService _accountService;
        private readonly ShopRecommenderSystemDbContext _dbContext;
        public DetailCommentsController(IDetailCommentService detailCommentService, IElasticSearchService elasticSearchService,
            IAccountService accountService, ShopRecommenderSystemDbContext dbContext)
        {
            _elasticsearchService = elasticSearchService;
            _detailCommentService = detailCommentService;
            _accountService = accountService;
            _dbContext = dbContext;
        }

        //[HttpGet("Product{id}")]
        //public async Task<ActionResult> GetCommentsOfProduct([FromQuery] CommentParameters commentParameters, int id)
        //{
        //    var res = await _elasticsearchService.DetailComments(commentParameters, id);
        //    if (res == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(res);
        //}

        [HttpGet("RattingCount/Product{id}")]
        public async Task<ActionResult> GetAllCountRattingCommentsOfProduct(int id)
        {
            var res = await _elasticsearchService.CommentsRatingCount(id);
            if (res == null)
            {
                return NotFound();
            }
            return Ok(res);
        }

        // GET: api/detailcomments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetailComment>>> GetDetailComments()
        {
            var res = await _detailCommentService.GetAll();
            return Ok(res);
        }
        // GET: api/detailcomments
        [HttpGet("List{id}")]
        public async Task<IActionResult> GetDetailCommentsForProduct(int id, [FromQuery] CommentParameters commentParameters)
        {
            try
            {
                var pageResult = await _detailCommentService.GetAllOnePro(id, commentParameters, false);
                Response.Headers.Add("X-paginatioin", JsonSerializer.Serialize(pageResult.metaData));

                var response = new
                {
                    Total = pageResult.total,
                    Comment = pageResult.comments,
                };

                //var response = await _dbContext.DetailComments
                //    .Where(c => c.ProductID == id)  // Take the first 10 results
                //    .ToListAsync(); // Execute query and retrieve results as a list


                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<object>
                {
                    message = $"Internal server error: {ex.Message}",
                    status = "500",
                    token = null,
                    Data = null
                });
            }
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
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostDetailComment([FromBody] CreateDetailCommentPrarameters detailComment)
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

                var res = await _detailCommentService.Add(detailComment, user);
                if (res == null)
                {
                    return NotFound();
                }
                return CreatedAtAction(nameof(GetDetailComment), new { id = res.ID }, res);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<object>
                {
                    message = $"Internal server error: {ex.Message}",
                    status = "500",
                    token = null,
                    Data = null
                });
            }
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
