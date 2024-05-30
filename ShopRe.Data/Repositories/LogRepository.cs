using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShopRe.Data.Infrastructure;
using ShopRe.Model.Models;
using ShopRe.Model.Models.user_s_log;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data.Repositories
{
    //Log
    public interface IUserLogRepository : IRepository<UserLog>
    {
        Task<UserLog> AddL(UserLog UserLog);
    }
    public class UserLogRepository : RepositoryBase<UserLog>, IUserLogRepository
    {
        private readonly ShopRecommenderSystemDbContext context;
        public UserLogRepository(ShopRecommenderSystemDbContext _context, IMapper _mapper) : base(_context, _mapper)
        {
            context = _context;
        }
        public async Task<UserLog> AddL(UserLog UserLog)
        {
            var addedUserLog = await context.Set<UserLog>().AddAsync(UserLog);
            await context.SaveChangesAsync();
            return addedUserLog.Entity;
        }
    }

   
}
