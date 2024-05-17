using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Nest;
using ShopRe.Data;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ShopRe.Service
{
    public interface ICartItemsService
    {
        Task<CartItem> AddToCart(int idProduct, string token);
        Task<CartItem> DecreaseProductInCart(int idProduct, string token);
        Task<CartItem> IncreaseProductInCart(int idProduct, string token);
    }

    public class CartItemsService : ICartItemsService
    {
        private readonly ShopRecommenderSystemDbContext _dbContext;
        private readonly IProductRepository _productRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        public CartItemsService(ShopRecommenderSystemDbContext dbContext, IProductRepository productRepository, UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbContext;
            _productRepository = productRepository;
            _userManager = userManager;
        }

        public async Task<ApplicationUser> checkUser(string token)
        {
            //check user
            var handler = new JwtSecurityTokenHandler();
            var decoded = handler.ReadJwtToken(token);

            var keyId = decoded.Header.Kid;
            var audience = decoded.Audiences.ToList();
            var claims = decoded.Claims.Select(claim => (claim.Type, claim.Value)).ToList();


            var usermail = claims[0].Value;

            ApplicationUser user = await _userManager.FindByEmailAsync(usermail);

            if (user == null)
            {
                return null;
            }
            return user;
        }

        public async Task<CartItem> AddToCart(int idProduct, string token)
        {
            var product = await _productRepository.GetById(idProduct);
            if (product == null)
            {
                return null;
            }

            ApplicationUser user = checkUser(token).Result;

            // Check user and create or get existing session
            var session = await _dbContext.ShoppingSessions.FirstOrDefaultAsync(p => p.User == user);

            //Nếu user chưa có giỏ hàng thì tạo shopsession
            if (session == null)
            {
                session = new ShoppingSession
                {
                    Total = 0,
                    User = user
                };
                await _dbContext.ShoppingSessions.AddAsync(session);
                await _dbContext.SaveChangesAsync();
            }
            //Nếu có thì thêm vào giỏ hàng
            //Cập nhật giá cho session
            session.Total = product.Price;
            var cartItem = new CartItem
            {
                Quantity = 1,
                Product = product,
                Session = session
            };
            await _dbContext.CartItem.AddAsync(cartItem);
            await _dbContext.SaveChangesAsync();

            return cartItem;
        }

        public async Task<CartItem> IncreaseProductInCart(int idProduct, string token)
        {
            var product = await _productRepository.GetById(idProduct);
            if (product == null)
            {
                return null;
            }

            ApplicationUser user = checkUser(token).Result;

            // Check user and create or get existing session
            var session = await _dbContext.ShoppingSessions.FirstOrDefaultAsync(p => p.User == user);
            if (session == null)
            {
                return null;
            }
            //Cập nhật tiền của session
            session.Total += product.Price;

            //Cập nhật số lượng cho sản phẩm trong giỏ hàng
            var cartItem = await _dbContext.CartItem.FirstOrDefaultAsync();
            if (cartItem == null)
            {
                return null;
            }

            cartItem.Quantity += 1;
            _dbContext.CartItem.Update(cartItem);
            await _dbContext.SaveChangesAsync();

            return cartItem;
        }

        public async Task<CartItem> DecreaseProductInCart(int idProduct, string token)
        {
            var product = await _productRepository.GetById(idProduct);
            if (product == null)
            {
                return null;
            }

            ApplicationUser user = checkUser(token).Result;

            // Check user and create or get existing session
            var session = await _dbContext.ShoppingSessions.FirstOrDefaultAsync(p => p.User == user);
            if (session == null)
            {
                return null;
            }
            //Cập nhật tiền của session
            session.Total += product.Price;

            var cartItem = await _dbContext.CartItem.FirstOrDefaultAsync();
            if (cartItem == null)
            {
                return null;
            }

            if (cartItem.Quantity > 1)
            {
                cartItem.Quantity -= 1;
                _dbContext.CartItem.Update(cartItem);
            }
            else
            {
                _dbContext.CartItem.Remove(cartItem);
            }

            await _dbContext.SaveChangesAsync();
            return cartItem;
        }
    }

}
