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
    public interface IAccountRepository:IRepository<Account>
    {
        Task<IEnumerable<Account>> GetAll();
    }
    public class AccountRepository : RepositoryBase<Account> , IAccountRepository
    {
        private readonly ShopRecommenderSystemDbContext _context;
        private readonly IMapper _mapper;
        public AccountRepository(ShopRecommenderSystemDbContext context, IMapper mapper) : base(context, mapper)
        {

            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<Account>?> GetAll()
        {
            var entities = await _context.Accounts!.ToListAsync();
            return entities;
        }
    }
}
