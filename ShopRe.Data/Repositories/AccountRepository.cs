﻿using AutoMapper;
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
                expires: DateTime.Now.AddMinutes(15),
                claims: authClaims,
                signingCredentials: new Microsoft.IdentityModel.Tokens.SigningCredentials(authenKey,
                    SecurityAlgorithms.HmacSha256Signature)
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
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
                Avatar="No image yet"
            };
            return await _userManager.CreateAsync(user, signUp.Password);
        }
    }
}