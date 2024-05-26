using ShopRe.Model.Models;
using System.Linq.Expressions;
using ShopRe.Data.Infrastructure;
using ShopRe.Data.Repositories;
using ShopRe.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using ShopRe.Model.Authentication;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ShopRe.Service
{
    public interface IAccountService
    {
        public Task<IdentityResult> SignUpAsync(SignUpModel signUp);
        public Task<string> SignInAsync(SignInModel signIn);
        public Task<ApplicationUser> GetUserFromTokenAsync(string token);



    }
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly UserManager<ApplicationUser> _userManager;


        public AccountService(IAccountRepository accountRepository, UserManager<ApplicationUser> userManager)
        {
            _accountRepository = accountRepository;
            _userManager = userManager;
        }
        public Task<string> SignInAsync(SignInModel signIn)
        {
            //throw new NotImplementedException();
            return _accountRepository.SignInAsync(signIn);
        }

        public Task<IdentityResult> SignUpAsync(SignUpModel signUp)
        {
            //throw new NotImplementedException();
            return _accountRepository.SignUpAsync(signUp);
        }
        public async Task<ApplicationUser> GetUserFromTokenAsync(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var decodedToken = handler.ReadJwtToken(token);

            var userEmailClaim = decodedToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
            if (userEmailClaim == null)
            {
                return await Task.FromResult<ApplicationUser>(null);
            }

            var userEmail = userEmailClaim.Value;
            return await _userManager.FindByEmailAsync(userEmail);
        }
        
    }
}
