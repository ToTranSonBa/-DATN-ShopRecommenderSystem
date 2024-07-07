using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShopRe.Data.Infrastructure;
using ShopRe.Model.Models;

namespace ShopRe.Data.Repositories
{
    public interface ISellerRepository : IRepository<Seller>
    {
        Task<Seller> GetUserSeller(string userId);
        Task<List<Seller>> GetSellers(List<int> sellerIds);
    }
    public class SellerRepository : RepositoryBase<Seller>, ISellerRepository
    {
        public SellerRepository(ShopRecommenderSystemDbContext _context, IMapper _mapper) : base(_context, _mapper)
        {

        }

        public async Task<List<Seller>> GetSellers(List<int> sellerIds)
        {
            return await FindByCondition(exp => sellerIds.Contains(exp.ID_NK), false).ToListAsync();
        }

        public async Task<Seller> GetUserSeller(string userId)
        {
            return FindByCondition(s => s.ApplicationUserId == userId, false).FirstOrDefault();
        }
    }
}
