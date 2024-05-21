using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Nest;
using ShopRe.Common.DTOs;
using ShopRe.Model;
using ShopRe.Model.Authentication;
using ShopRe.Model.Models;
using ShopRe.Service;
using System.IdentityModel.Tokens.Jwt;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IShoppingSessionService _shopSessionService;
        public AccountsController(IAccountService accountService, UserManager<ApplicationUser> userManager, IShoppingSessionService shopSessionService)
        {
            _accountService = accountService;
            _userManager = userManager;
            _shopSessionService = shopSessionService;
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
            var token = await _accountService.SignInAsync(signIn);
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized();
            }

            ApplicationUser user = await _accountService.GetUserFromTokenAsync(token);
            await _shopSessionService.CreateCart(user);

            var response = new Response<Account>("Login Successfully!", "200", null, token);
            return Ok(response);
        }
    }
}
