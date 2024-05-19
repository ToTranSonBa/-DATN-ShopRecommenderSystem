using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShopRe.Data.Infrastructure;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data.Repositories
{
    public interface ISellerPriorityRepository : IRepository<SellerPriority>
    {
        public Task<List<SellerPriority>> GetByUser(int userId);
    }
    public class SellerPriorityRepository : RepositoryBase<SellerPriority>, ISellerPriorityRepository
    {
        private readonly ShopRecommenderSystemDbContext _Dbcontext;

        public SellerPriorityRepository(ShopRecommenderSystemDbContext _context, IMapper _mapper) : base(_context, _mapper)
        {
            _Dbcontext = _context;
        }

        public async Task<List<SellerPriority>> GetByUser(int userId)
        {
            return await _Dbcontext.SellerPriority.Where(e => e.AccID == userId).OrderBy(e => e.Idx).ToListAsync();
        }
    }
}
