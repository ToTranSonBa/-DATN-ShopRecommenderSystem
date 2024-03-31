using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopRe.Model.Authentication;
using ShopRe.Service;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountsController(IAccountService accountService)
        {
            _accountService = accountService;
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
            return Ok(result);
        }
    }
}
