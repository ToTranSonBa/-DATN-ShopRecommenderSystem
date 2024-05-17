using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShopRe.Model;
using ShopRe.Model.Authentication;
using ShopRe.Model.Models;
using ShopRe.Service;
using System.IdentityModel.Tokens.Jwt;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly UserManager<ApplicationUser> _userManager;
        public AccountsController(IAccountService accountService, UserManager<ApplicationUser> userManager)
        {
            _accountService = accountService;
            _userManager = userManager;
        }
        [HttpPost("SignUp")]
        public async Task<ActionResult> SignUp(SignUpModel signUp)
        {
            var result = await _accountService.SignUpAsync(signUp);
            if (result.Succeeded)
            {
                return Ok(result.Succeeded);
            }
            return Unauthorized(result.Errors);
        }
        [HttpPost("SignIn")]
        public async Task<ActionResult> SignIn(SignInModel signIn)
        {
            var result = await _accountService.SignInAsync(signIn);
            if (string.IsNullOrEmpty(result))
            {
                return Unauthorized();
            }
            var handler = new JwtSecurityTokenHandler();
            var decoded = handler.ReadJwtToken(result);

            var keyId = decoded.Header.Kid;
            var audience = decoded.Audiences.ToList();
            var claims = decoded.Claims.Select(claim => (claim.Type, claim.Value)).ToList();
            var usermail = claims[0].Value;

            ApplicationUser user = await _userManager.FindByEmailAsync(usermail);

            var response = new Response<Account>
            {
                message = result,
                status = "200"
            };
            //return Ok(user);
            return Ok(response);
        }
    }
}
