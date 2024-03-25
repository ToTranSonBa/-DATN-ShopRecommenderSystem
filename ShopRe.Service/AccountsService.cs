using ShopRe.Model.Models;
using System.Linq.Expressions;
using ShopRe.Data.Infrastructure;
using ShopRe.Data.Repositories;
using ShopRe.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using ShopRe.Model.Authentication;

namespace ShopRe.Service
{
    public interface IAccountService
    {
        public Task<IdentityResult> SignUpAsync(SignUpModel signUp);
        public Task<string> SignInAsync(SignInModel signIn);
       
    }
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;



        public AccountService(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
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
    }
}
