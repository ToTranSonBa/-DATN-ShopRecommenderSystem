using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data.Infrastructure
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<IQueryable<T>> GetAll(bool trackChanges);
        Task<T> GetById(int id);
        Task<T> Add(T entity);
        Task<int> AddRange(IEnumerable<T> entities);
        Task<T> Update(T entity);
        void Remove(int id);
        IEnumerable<T> Find(Expression<Func<T, bool>> expression);
    }
}
