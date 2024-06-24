using AutoMapper;
using ShopRe.Data.Infrastructure;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data.Repositories
{
    public interface ISellerRepository : IRepository<Seller>
    {
        Task<Seller> GetUserSeller(string userId);
    }
    public class SellerRepository : RepositoryBase<Seller>, ISellerRepository
    {
        public SellerRepository(ShopRecommenderSystemDbContext _context, IMapper _mapper) : base(_context, _mapper)
        {

        }
        public async Task<Seller> GetUserSeller(string userId)
        {
            return FindByCondition(s => s.ApplicationUserId == userId, false).FirstOrDefault();
        }
    }
}
