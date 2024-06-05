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
using AutoMapper;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;

namespace ShopRe.Service
{
    public interface IAccountService
    {
        public Task<IdentityResult> SignUpAsync(SignUpModel signUp);
        public Task<string> SignInAsync(SignInModel signIn);
        public Task<ApplicationUser> GetUserFromTokenAsync(string token);
        Task<UserDTO> GetUserInformation(ApplicationUser user);
        Task<IdentityResult> UpdateShip(ApplicationUser user, int id);
        Task<UserDTO> UpdateInformation(UserInformationParameters userInfo, ApplicationUser user);
    }
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ShopRecommenderSystemDbContext _dbContext;
        private readonly IMapper _mapper;

        public AccountService(IAccountRepository accountRepository, UserManager<ApplicationUser> userManager,
            ShopRecommenderSystemDbContext dbContext, IMapper mapper)
        {
            _accountRepository = accountRepository;
            _userManager = userManager;
            _dbContext = dbContext;
            _mapper= mapper;
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
        public async Task<UserDTO> GetUserInformation(ApplicationUser user)
        {
            var userFromDb = await _userManager.FindByIdAsync(user.Id);
            var accountDTO = _mapper.Map<UserDTO>(userFromDb);
            return accountDTO;
        }

        public async Task<UserDTO> UpdateInformation(UserInformationParameters userInfo, ApplicationUser user)
        {
            var userFromDb = await _userManager.FindByIdAsync(user.Id);

            if (userFromDb == null)
            {
                throw new Exception("User not found");
            }

            userFromDb.PhoneNumber = userInfo.PhoneNumber;
            userFromDb.UserName = userInfo.Email;
            userFromDb.Email = userInfo.Email;
            userFromDb.Address = userInfo.Address;
            userFromDb.FirstName = userInfo.FirstName;
            userFromDb.LastName = userInfo.LastName;

            if (userInfo.Avatar != null)
            {
                userFromDb.Avatar = "No image yet";
            }
            else
            {
                userFromDb.Avatar = userInfo.Avatar;
            }



            if (!string.IsNullOrEmpty(userInfo.Password))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(userFromDb);
                var result = await _userManager.ResetPasswordAsync(userFromDb, token, userInfo.Password);

                if (!result.Succeeded)
                {
                    throw new Exception("Failed to update password: " + string.Join(", ", result.Errors.Select(e => e.Description)));
                }
            }


            var updateResult = await _userManager.UpdateAsync(userFromDb);
            if (!updateResult.Succeeded)
            {
                throw new Exception("Failed to update user: " + string.Join(", ", updateResult.Errors.Select(e => e.Description)));
            }

            await _dbContext.SaveChangesAsync();

            var accountDTO = _mapper.Map<UserDTO>(userFromDb);

            return accountDTO;
        }
        public async Task<IdentityResult> UpdateShip(ApplicationUser user, int id)
        {
            return await _accountRepository.Update(user, id);
        }
    }
}
