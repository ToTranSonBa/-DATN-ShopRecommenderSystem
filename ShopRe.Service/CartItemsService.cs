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
using ShopRe.Model.Models.user_s_log;
using ShopRe.Common.DTOs;

namespace ShopRe.Service
{
    public interface ICartItemsService
    {
        Task<CartItem> AddToCart(int idProduct, int? idProductOptionValue, string ProductOptionImage, ApplicationUser user);
        Task<CartItem> DecreaseProductInCart(int idProduct, ApplicationUser user);
        Task<CartItem> IncreaseProductInCart(int idProduct, ApplicationUser user);
        Task<List<CartItem>> GetAllItemsOfUserInCart(ApplicationUser user);
        Task<ApplicationUser> GetUserFromTokenAsync(string token);
        Task<bool> DeleteCartItem(int idCartItem, ApplicationUser user);
        Task<CartItem> UpdateQuantityItem(int idProduct, int quantity, ApplicationUser user);
    }

    public class CartItemsService : ICartItemsService
    {
        private readonly ShopRecommenderSystemDbContext _dbContext;
        private readonly IProductRepository _productRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserLogRepository _UserLogRepository;


        public CartItemsService(ShopRecommenderSystemDbContext dbContext, IUserLogRepository UserLogRepository, IProductRepository productRepository, UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbContext;
            _productRepository = productRepository;
            _userManager = userManager;
            _UserLogRepository = UserLogRepository;
        }
        private async Task<bool> UpdateTotalPriceShoppingSession(ApplicationUser user)
        {
            var session = await _dbContext.ShoppingSessions
                                          .FirstOrDefaultAsync(s => s.User.Id == user.Id);

            if (session == null)
            {
                return false;
            }

            var cartItems = await _dbContext.CartItem
                                            .Where(c => c.Session.ID == session.ID)
                                            .Include(c => c.Product)
                                            .ToListAsync();

            decimal total = 0;
            foreach (var cartItem in cartItems)
            {
                if (cartItem.Product != null)
                {
                    total += Convert.ToInt32(cartItem.Quantity * cartItem.Product.Price);
                }
            }

            session.Total = total;

            _dbContext.ShoppingSessions.Update(session);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<CartItem>> GetAllItemsOfUserInCart(ApplicationUser user)
        {
            var session = await _dbContext.ShoppingSessions
                                          .FirstOrDefaultAsync(s => s.User.Id == user.Id);

            if (session == null)
            {
                session = new ShoppingSession
                {
                    Total = 0,
                    User = user
                };
                _dbContext.ShoppingSessions.Add(session);
                await _dbContext.SaveChangesAsync();
                return new List<CartItem>();
            }

            var cartItems = await _dbContext.CartItem
                                            .Where(c => c.Session.ID == session.ID)
                                            .Include(c => c.Product).Include(c=>c.OptionValues)
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
        public async Task<CartItem> AddToCart(int idProduct, int? idProductOptionValue, string ProductOptionImage, ApplicationUser user)
        {
            var product = await _productRepository.GetById(idProduct);
            if (product == null)
            {
                return null;
            }

            var seller = await _dbContext.Sellers.FindAsync(product.SellerID_NK);
            if (seller == null)
            {
                return null;
            }

            ProductOptionValues productOption = null;
            if (idProductOptionValue.HasValue)
            {
                //productOption = await _dbContext.ProductOptionValues.FindAsync(idProductOptionValue.Value);
                productOption = await _dbContext.ProductOptionValues
                    .Where(p => p.Id == idProductOptionValue.Value)
                    .Include(p => p.Option)
                    .ThenInclude(o => o.Product)
                    .FirstOrDefaultAsync();

                if (productOption == null || productOption.Option.Product.ID_NK != product.ID_NK)
                {
                    return null;
                }
            }

            var session = await _dbContext.ShoppingSessions.FirstOrDefaultAsync(p => p.User == user);
            if (session == null)
            {
                session = new ShoppingSession
                {
                    Total = 0,
                    User = user
                };
                _dbContext.ShoppingSessions.Add(session);
            }

            var newLog = new UserLog
            {
                Detail = "add to cart",
                SellerId = product.SellerID_NK,
                LogRate = LogRate._YES,
                User = user
            };
            await _UserLogRepository.AddL(newLog);

            var existingCartItem = await _dbContext.CartItem.FirstOrDefaultAsync(p => p.Product == product && p.Session == session && p.OptionValues == productOption);
            if (existingCartItem == null)
            {
                var cartItem = new CartItem
                {
                    Quantity = 1,
                    Product = product,
                    Session = session,
                    OptionValues = productOption,
                    SellerId = product.SellerID_NK,
                    SellerName = seller.Name,
                    productImgs= ProductOptionImage
                };
                _dbContext.CartItem.Add(cartItem);
                session.Total += product.Price;
                await _dbContext.SaveChangesAsync();
                return cartItem;
            }
            else
            {
                existingCartItem.Quantity += 1;
                _dbContext.CartItem.Update(existingCartItem);
                session.Total += product.Price;
                await _dbContext.SaveChangesAsync();
                return existingCartItem;
            }
        }

        public async Task<CartItem> UpdateQuantityItem(int idProduct, int quantity, ApplicationUser user)
        {
            if(quantity == 0)
            {
                return null;
            }
            var product = await _productRepository.GetById(idProduct);
            if (product == null)
            {
                return null;
            }

            var session = await _dbContext.ShoppingSessions.FirstOrDefaultAsync(p => p.User.Id == user.Id);
            if (session == null)
            {
                session = new ShoppingSession
                {
                    Total = 0,
                    User = user
                };
                _dbContext.ShoppingSessions.Add(session);
                await _dbContext.SaveChangesAsync(); 
            }

            var cartItem = await _dbContext.CartItem.FirstOrDefaultAsync(c => c.Session == session && c.Product == product);
            if (cartItem == null)
            {
                return null;
            }

            cartItem.Quantity = quantity;
            _dbContext.CartItem.Update(cartItem);

            var isTotalUpdated = await UpdateTotalPriceShoppingSession(user);

            if (isTotalUpdated)
            {
                await _dbContext.SaveChangesAsync();
                return cartItem;
            }

            return null; 
        }

        public async Task<CartItem> IncreaseProductInCart(int idProduct, ApplicationUser user)
        {
            var product = await _productRepository.GetById(idProduct);

            var session = await _dbContext.ShoppingSessions.FirstOrDefaultAsync(p => p.User.Id == user.Id);

            var cartItem = await _dbContext.CartItem.FirstOrDefaultAsync(c => c.Session == session && c.Product == product);

            cartItem.Quantity += 1;
            _dbContext.CartItem.Update(cartItem);

            session.Total += product.Price;
            _dbContext.ShoppingSessions.Update(session);

            await _dbContext.SaveChangesAsync();
            return cartItem;
        }


        public async Task<CartItem> DecreaseProductInCart(int idProduct, ApplicationUser user)
        {
            var product = await _productRepository.GetById(idProduct);

            var session = await _dbContext.ShoppingSessions.FirstOrDefaultAsync(p => p.User == user);
           

            var cartItem = await _dbContext.CartItem.FirstOrDefaultAsync(c => c.Session == session && c.Product == product);
            
            if (cartItem.Quantity > 1)
            {
                cartItem.Quantity -= 1;
                _dbContext.CartItem.Update(cartItem);
            }
            else
            {
                _dbContext.CartItem.Remove(cartItem);
            }
            session.Total -= product.Price;
            _dbContext.ShoppingSessions.Update(session);

            await _dbContext.SaveChangesAsync();
            return cartItem;
        }

        public async Task<bool> DeleteCartItem(int idCartItem, ApplicationUser user)
        {
            var session = await _dbContext.ShoppingSessions.FirstOrDefaultAsync(p => p.User == user);

            if (session == null)
            {
                return false;
            }

            var cartItem = await _dbContext.CartItem.FirstOrDefaultAsync(c => c.Session == session && c.Id == idCartItem);

            if (cartItem == null)
            {
                return false;
            }

            _dbContext.CartItem.Remove(cartItem);
            await _dbContext.SaveChangesAsync();

            bool isTotalUpdated = await UpdateTotalPriceShoppingSession(user);

            return isTotalUpdated;
        }

    }

}
