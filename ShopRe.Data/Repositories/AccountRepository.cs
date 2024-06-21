using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using ShopRe.Data.Infrastructure;
using ShopRe.Model.Authentication;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using ShopRe.Data.Migrations;
using System.Security.Cryptography;

namespace ShopRe.Data.Repositories
{
    public interface IAccountRepository: IRepository<ApplicationUser>
    {
        public Task<IdentityResult> SignUpAsync(SignUpModel signUp);
        public Task<string> SignInAsync(SignInModel signIn);
        Task<ApplicationUser> Update(ApplicationUser user, int ship);
        public string GenerateRefreshToken();
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
        Task<ApplicationUser> GetCustomerByEmail(string Email, bool trackChange);
    }
    public class AccountRepository : RepositoryBase<ApplicationUser>, IAccountRepository
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ShopRecommenderSystemDbContext _context;
        public AccountRepository(ShopRecommenderSystemDbContext context,UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, IMapper mapper): base( context, mapper)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        

        public async Task<string> SignInAsync(SignInModel signIn)
        {
            var result = await _signInManager.PasswordSignInAsync
                (signIn.Email, signIn.Password, false, false);
            if(!result.Succeeded) 
            {
                return string.Empty;
            }
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, signIn.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(180),
                claims: authClaims,
                signingCredentials: new Microsoft.IdentityModel.Tokens.SigningCredentials(authenKey,
                    SecurityAlgorithms.HmacSha256)
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        /*public string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;
        }*/

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false, //you might want to validate the audience and issuer depending on your use case
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345")),
                ValidateLifetime = false //here we are saying that we don't care about the token's expiration date
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");
            return principal;
        }

        public async Task<IdentityResult> SignUpAsync(SignUpModel signUp)
        {
            var user = new ApplicationUser()
            {
                FirstName = signUp.FirstName,
                LastName = signUp.LastName,
                Email = signUp.Email,
                PhoneNumber = signUp.PhoneNumber,
                Address = signUp.Address,
                UserName= signUp.Email,
                Avatar="No image yet",
                DayOfBirth = signUp.DayOfBirth
                
            };
            var result = await _userManager.CreateAsync(user, signUp.Password);
            if (!result.Succeeded)
            {
                return result;
            }
            var shippingAddress = new ShippingAddress
            {
                Address = signUp.Address,
                FullName = signUp.FirstName + signUp.LastName,
                PhoneNumber = signUp.PhoneNumber,
                Type = "Văn phòng",
                Email = signUp.Email,
                UserId = user.Id
            };
            _context.ShippingAddresses.Add(shippingAddress);
            await _context.SaveChangesAsync();

            // Cập nhật defaultAddress của user với Id của địa chỉ giao hàng mới tạo
            user.ShippingAddress = shippingAddress.Id;
            await _userManager.UpdateAsync(user);

            // Hoàn thành giao dịch

            return IdentityResult.Success;
        }
        public async Task<ApplicationUser> Update(ApplicationUser user, int ship )
        {
            user.ShippingAddress = ship;
            await _context.SaveChangesAsync();
            return user;
        }

        //Customer
        public async Task<ApplicationUser> GetCustomerByEmail(string Email, bool trackChange)
        {
            return await FindByCondition(e => e.Email == Email, trackChange).SingleOrDefaultAsync();
        }
    }
}
