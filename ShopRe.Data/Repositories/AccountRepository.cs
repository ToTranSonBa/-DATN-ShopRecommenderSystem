using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ShopRe.Data.Infrastructure;
using ShopRe.Model.Authentication;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data.Repositories
{
    public interface IAccountRepository
    {
        public Task<IdentityResult> SignUpAsync(SignUpModel signUp);
        public Task<string> SignInAsync(SignInModel signIn);
    }
    public class AccountRepository : IAccountRepository
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        public AccountRepository(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

       

        public async Task<string> SignInAsync(SignInModel signIn)
        {
            //CODE HERE
            throw new NotImplementedException();
        }

        public async Task<IdentityResult> SignUpAsync(SignUpModel signUp)
        {
            //CODE HERE
            throw new NotImplementedException();
        }
    }
}
