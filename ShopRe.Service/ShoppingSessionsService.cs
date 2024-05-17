using Microsoft.EntityFrameworkCore;
using ShopRe.Data;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Service
{
    public interface IShoppingSessionService
    {
        Task<ShoppingSession> CreateCart(ApplicationUser user);
    }
    public class ShoppingSessionsService: IShoppingSessionService
    {
        private readonly ShopRecommenderSystemDbContext _dbContext;
        private readonly IAccountService _accountService;
        public ShoppingSessionsService(ShopRecommenderSystemDbContext dbContext, IAccountService acoutnService) {
            _dbContext = dbContext;
            _accountService = acoutnService;
        }

        public async Task<ShoppingSession> CreateCart(ApplicationUser user)
        {
            if (user == null)
            {
                return await Task.FromResult<ShoppingSession>(null);
            }
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
                return session;
            }
            else
            {
                return await Task.FromResult<ShoppingSession>(session);
            }
        } 

    }
}
