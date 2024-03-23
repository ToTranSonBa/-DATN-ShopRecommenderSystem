using ShopRe.Model.Models;
using System.Linq.Expressions;
using ShopRe.Data.Infrastructure;
using ShopRe.Data.Repositories;
using ShopRe.Data;
using Microsoft.EntityFrameworkCore;

namespace ShopRe.Service
{
    public interface IAccountService
    {
        Task<IEnumerable<Account>> GetAll();
        Task<IQueryable<Account>> GetAll(bool trackChanges);
        Task<Account> GetById(int id);
        Task<Account> Add(Account entity);
        Task<int> AddRange(IEnumerable<Account> entities);
        Task<Account> Update(Account entity);
        void Remove(int id);
        IEnumerable<Account> Find(Expression<Func<Account, bool>> expression);
    }
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;


        public AccountService(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        public async Task<Account> Add(Account entity)
        {
            return await _accountRepository.Add(entity);
        }

        public Task<int> AddRange(IEnumerable<Account> entities)
        {
            return _accountRepository.AddRange(entities);
        }

        public IEnumerable<Account> Find(Expression<Func<Account, bool>> expression)
        {
            return _accountRepository.Find(expression);
        }
        public Task<IQueryable<Account>> GetAll(bool trackChanges)
        {
            return _accountRepository.GetAll(trackChanges);
        }

        public Task<IEnumerable<Account>> GetAll()
        {
            return _accountRepository.GetAll();
        }

        public Task<Account> GetById(int id)
        {
            return _accountRepository.GetById(id);
        }

        public void Remove(int id)
        {
            _accountRepository.Remove(id);
        }

        public Task<Account> Update(Account entity)
        {
            return _accountRepository.Update(entity);
        }
    }
}
