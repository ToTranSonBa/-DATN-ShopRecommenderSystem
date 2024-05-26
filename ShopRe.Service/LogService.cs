using Microsoft.Extensions.Logging;
using Nest;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data.Infrastructure;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System.Linq.Expressions;
using ShopRe.Model.Models.user_s_log;
using System.Threading.Tasks;

namespace ShopRe.Service
{
    public interface ILogService
    {
        Task<bool> addSearch(UserLogDto userLogDto);
        Task<bool> logSearch(string userId, string value);
    }
    public class LogService : ILogService
    {
        private readonly IUserLogRepository _UserLogRepository;
        private readonly IAccountRepository _AccountRepository;
       
        public LogService(IUserLogRepository UserLogRepository, IAccountRepository accountRepository)
        {
            _UserLogRepository = UserLogRepository;
            _AccountRepository = accountRepository;
        }
        public async Task<bool> addSearch(UserLogDto userLogDto)
        {
            var search = new UserLog
            {
                Detail = userLogDto.Detail,
                SellerId  = userLogDto.SellerId,
                LogRate = userLogDto.LogRate
                
            };
            var res = await _UserLogRepository.Add(search);
            if (res != null)
            {
                return true;
            }
            return false;
        }
        public async Task<bool> logSearch(string userId, string value)
        {

            return false;
        }
    }
}
