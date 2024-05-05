using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data.Infrastructure
{
    public abstract class RepositoryBase<T> :IRepository<T> where T : class
    {
        readonly private ShopRecommenderSystemDbContext _context;
        readonly private IMapper _mapper;
        public RepositoryBase(ShopRecommenderSystemDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<T?> GetById(int id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            return entity;
        }

        public async Task<IEnumerable<T>?> GetAll()
        {
            var entities = await _context.Set<T>().ToListAsync();
            return entities;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
        public async Task<T> Add(T entity)
        {
            _context.Set<T>().Add(entity);
            _ = SaveChangesAsync();
            return entity;
        }
        public void Remove(T entity)
        {
            _context.Set<T>().Remove(entity);
            _ = SaveChangesAsync();
        }

        public async Task<T> Update(T entity)
        {
            var result = _context.Set<T>().Update(entity);
            _ = SaveChangesAsync();
            return entity;
        }
        public Task<int> AddRange(IEnumerable<T> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> expression)
        {
            throw new NotImplementedException();
        }
        public IQueryable<T> FindByCondition(System.Linq.Expressions.Expression<Func<T, bool>> expression, bool trackChanges)
        {
            return !trackChanges ? _context.Set<T>().Where(expression).AsNoTracking()
                : _context.Set<T>().Where(expression);

        }
        public Task<IQueryable<T>> GetAll(bool trackChanges)
        {
            throw new NotImplementedException();
        }

        public void Remove(int id)
        {
            throw new NotImplementedException();
        }
    }
}
