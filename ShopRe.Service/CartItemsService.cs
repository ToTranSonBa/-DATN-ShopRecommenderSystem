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
        Task<CartItem> AddToCart(int idProduct, ApplicationUser user);
        Task<CartItem> DecreaseProductInCart(int idProduct, ApplicationUser user);
        Task<CartItem> IncreaseProductInCart(int idProduct, ApplicationUser user);
        Task<List<CartItem>> GetAllItemsOfUserInCart(ApplicationUser user);
        Task<ApplicationUser> GetUserFromTokenAsync(string token);
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

        public async Task<List<CartItem>> GetAllItemsOfUserInCart(ApplicationUser user)
        {
            var session = await _dbContext.ShoppingSessions
                                          .FirstOrDefaultAsync(s => s.User.Id == user.Id);

            if (session == null)
            {
                return new List<CartItem>(); 
            }

            var cartItems = await _dbContext.CartItem
                                            .Where(c => c.Session.ID == session.ID && c.Session.User.Id == user.Id)
                                            .Include(c => c.Product)
                                            .ToListAsync();

            return cartItems;
        }

        public async Task<ApplicationUser> GetUserFromTokenAsync(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var decodedToken = handler.ReadJwtToken(token);

            var userEmailClaim = decodedToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
            if (userEmailClaim == null)
            {
                return null;
            }

            var userEmail = userEmailClaim.Value;
            return await _userManager.FindByEmailAsync(userEmail);
        }
        public async Task<CartItem> AddToCart(int idProduct, ApplicationUser user)
        {
            var product = await _productRepository.GetById(idProduct);

            //Get existing session
            var session = await _dbContext.ShoppingSessions.FirstOrDefaultAsync(p => p.User == user);

            //Nếu user chưa có giỏ hàng thì tạo shopsession
            if (session == null)
            {
                session = new ShoppingSession
                {
                    Total = 0,
                    User = user
                };
                _dbContext.ShoppingSessions.Add(session);
            }

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
            var existingCartItem = await _dbContext.CartItem.FirstOrDefaultAsync(p => p.Product == product && p.Session == session);

            if (existingCartItem == null)
            {
                // Sản phẩm chưa tồn tại trong giỏ hàng, tạo một mục mới
                var cartItem = new CartItem
                {
                    Quantity = 1,
                    Product = product,
                    Session = session
                };
                _dbContext.CartItem.Add(cartItem);
            }
            else
            {
                // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
                existingCartItem.Quantity += 1;
                _dbContext.CartItem.Update(existingCartItem);
            }

            // Cập nhật giá cho session
            session.Total += product.Price;

            // Lưu thay đổi vào cơ sở dữ liệu
            await _dbContext.SaveChangesAsync();

            return existingCartItem;
        }


        public async Task<CartItem> IncreaseProductInCart(int idProduct, ApplicationUser user)
        {
            //Get product
            var product = await _productRepository.GetById(idProduct);

            var session = await _dbContext.ShoppingSessions.FirstOrDefaultAsync(p => p.User.Id == user.Id);

            // Tìm kiếm sản phẩm trong giỏ hàng của người dùng
            var cartItem = await _dbContext.CartItem.FirstOrDefaultAsync(c => c.Session == session && c.Product == product);

            cartItem.Quantity += 1;
            _dbContext.CartItem.Update(cartItem);

            // Cập nhật tiền của session
            session.Total += product.Price;
            _dbContext.ShoppingSessions.Update(session);

            await _dbContext.SaveChangesAsync();
            return cartItem;
        }


        public async Task<CartItem> DecreaseProductInCart(int idProduct, ApplicationUser user)
        {
            //Get product
            var product = await _productRepository.GetById(idProduct);

            var session = await _dbContext.ShoppingSessions.FirstOrDefaultAsync(p => p.User == user);
           

            // Tìm kiếm sản phẩm trong giỏ hàng của người dùng
            var cartItem = await _dbContext.CartItem.FirstOrDefaultAsync(c => c.Session == session && c.Product == product);
            
            if (cartItem.Quantity > 1)
            {
                // Nếu số lượng sản phẩm lớn hơn 1 thì giảm số lượng
                cartItem.Quantity -= 1;
                _dbContext.CartItem.Update(cartItem);
            }
            else
            {
                // Nếu số lượng sản phẩm là 1 thì xóa khỏi giỏ hàng
                _dbContext.CartItem.Remove(cartItem);
            }
            // Cập nhật tiền của session
            session.Total -= product.Price;
            _dbContext.ShoppingSessions.Update(session);

            await _dbContext.SaveChangesAsync();
            return cartItem;
        }

    }

}
