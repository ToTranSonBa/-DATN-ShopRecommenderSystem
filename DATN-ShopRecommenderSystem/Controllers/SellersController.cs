using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data;
using ShopRe.Model.Models;
using ShopRe.Service;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [EnableCors()]
    [Route("api/[controller]")]
    [ApiController]
    public class SellersController : ControllerBase
    {
        readonly ISellerService _sellerService;
        private readonly ShopRecommenderSystemDbContext _context;
        private readonly IElasticSearchService _elasticsearchService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAccountService _accountService;

        public SellersController(ShopRecommenderSystemDbContext context, ISellerService sellerService
            , IElasticSearchService elasticSearchService, UserManager<ApplicationUser> userManager, IAccountService accountService
)
        {
            _sellerService = sellerService;
            _context = context;
            _elasticsearchService = elasticSearchService;
            _userManager = userManager;
            _accountService = accountService;
        }
        // GET: api/sellers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Seller>>> GetSellers()
        {
            var res = await _sellerService.GetAll();
            return Ok(res);
        }

        // GET
        [HttpGet("Products/{idSeller}")]
        public async Task<ActionResult<SellerDTO>> GetProductsBySeller([FromQuery] SellerParameters sellerParameters, int idSeller)
        {
            var seller = await _elasticsearchService.GetProductsBySeller(sellerParameters, idSeller);
            if (seller == null)
            {
                return NotFound();
            }
            return Ok(seller);
        }

        // GET: api/sellers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SellerDTO>> GetSeller(int id)
        {
            bool follow = false;
            if (!HttpContext.User.Claims.IsNullOrEmpty())
            {
                var userEmail = HttpContext.User.Claims.ElementAt(0).Value;
                var user = await _userManager.FindByEmailAsync(userEmail);
                var accId = await _context.Accounts
                    .Where(a => a.UserID == user.TrainCode).Select(s => s.ID_NK).FirstOrDefaultAsync();
                if ((await _context.AccountSeller.FindAsync(accId, id)) != null)
                {
                    follow = true;
                }
            }
            var seller = await _sellerService.GetById(id);
            if (seller == null)
            {
                return NotFound();
            }
            return Ok(new { isFollow = follow, shop = seller });
        }

        // GET: api/sellers/5
        [HttpGet("LastestProducts/{idSeller}")]
        public async Task<ActionResult<SellerDTO>> GetLastestProductsSeller([FromQuery] SellerParameters sellerParameters, int idSeller)
        {
            var seller = await _elasticsearchService.GetLastestProductsOfSellerById(sellerParameters, idSeller);
            if (seller == null)
            {
                return NotFound();
            }
            return Ok(seller);
        }
        // GET: api/sellers/5
        [HttpGet("QuantitySoldProducts/{idSeller}")]
        public async Task<ActionResult<SellerDTO>> GetQuantitySoldProductsSeller([FromQuery] SellerParameters sellerParameters, int idSeller)
        {
            var seller = await _elasticsearchService.GetTopQuantitySoldProductsOfSellerById(sellerParameters, idSeller);
            if (seller == null)
            {
                return NotFound();
            }
            return Ok(seller);
        }

        // POST: api/sellers
        [HttpPost]
        public async Task<ActionResult<Seller>> PostSeller(Seller seller)
        {
            var res = _sellerService.Add(seller);

            return CreatedAtAction(nameof(GetSeller), new { id = seller.ID_NK }, seller);
        }

        // DELETE: api/sellers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Seller>> DeleteSeller(int id)
        {
            _sellerService.Remove(id);

            return NoContent();
        }
        // PUT: api/sellers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSeller(int id, Seller seller)
        {
            var res = _sellerService.Update(seller);
            return NoContent();
        }

        [HttpGet("Top10Seller")]
        public async Task<IActionResult> GetTopSeller()
        {
            try
            {
                var thirtyDaysAgo = DateTime.Now.AddDays(-30);

                var topSellerIds = _context.UserLog
                    .Where(log => log.DateTime >= thirtyDaysAgo && log.SellerId.HasValue)
                    .GroupBy(log => log.SellerId)
                    .Select(group => new
                    {
                        SellerId = group.Key,
                        LogCount = group.Count()
                    })
                    .OrderByDescending(x => x.LogCount)
                    .Take(10)
                    .Select(x => x.SellerId.Value) // We are assuming SellerId is not null
                    .ToList();
                var topSellers = _context.Sellers
                    .Where(seller => topSellerIds.Contains(seller.ID_NK))
                    .ToList();
                return Ok(topSellers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("foruser/recommend/sellers")]
        public async Task<IActionResult> RecommendSellerForUser()
        {
            int userCode = 0;

            var authHeader = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                userCode = 0;
            }
            else
            {
                var token = authHeader.Substring("Bearer ".Length).Trim();

                var user = await _accountService.GetUserFromTokenAsync(token);
                if (user != null)
                {
                    userCode = user.TrainCode;
                }
            }

            var result = await _elasticsearchService.GetSellerForUser(userCode);
            if (result.Count == 0)
                return NoContent();
            return Ok(result);
        }
        [HttpGet("recommend-similaryty")]
        public async Task<IActionResult> RecommendSimilarity(int sellerId)
        {
            var authHeader = Request.Headers["Authorization"].ToString();
            int userCode = 0;
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {

            }
            else
            {
                var token = authHeader.Substring("Bearer ".Length).Trim();

                // Get user from token
                var user = await _accountService.GetUserFromTokenAsync(token);
                userCode = user.TrainCode;
            }

            var result = await _sellerService.GetSellerSimilarity(sellerId, userCode);

            return Ok(result);
        }
    }

}
