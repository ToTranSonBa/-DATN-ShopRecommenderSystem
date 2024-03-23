using ShopRe.Data.Infrastructure;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System.Linq.Expressions;

namespace ShopRe.Service
{
    public interface IOwnershipService
    {
        Task<IEnumerable<Ownership>> GetAll();
        Task<IQueryable<Ownership>> GetAll(bool trackChanges);
        Task<Ownership> GetById(int id);
        Task<Ownership> Add(Ownership entity);
        Task<int> AddRange(IEnumerable<Ownership> entities);
        Task<Ownership> Update(Ownership entity);
        void Remove(int id);
        IEnumerable<Ownership> Find(Expression<Func<Ownership, bool>> expression);
    }
    public class OwnershipService : IOwnershipService
    {
        private readonly IOwnershipRepository _ownershipRepository;

        public OwnershipService( IOwnershipRepository ownershipRepository)
        {
            _ownershipRepository = ownershipRepository;
        }

        public Task<Ownership> Add(Ownership entity)
        {
            return _ownershipRepository.Add(entity);
        }

        public Task<int> AddRange(IEnumerable<Ownership> entities)
        {
            return _ownershipRepository.AddRange(entities);
        }

        public IEnumerable<Ownership> Find(Expression<Func<Ownership, bool>> expression)
        {
            return _ownershipRepository.Find(expression);
        }

        public Task<IEnumerable<Ownership>> GetAll()
        {
            return _ownershipRepository.GetAll();
        }

        public Task<IQueryable<Ownership>> GetAll(bool trackChanges)
        {
            return _ownershipRepository.GetAll(trackChanges);
        }

        public Task<Ownership> GetById(int id)
        {
            return _ownershipRepository.GetById(id);
        }

        public void Remove(int id)
        {
            _ownershipRepository.Remove(id);
        }

        public Task<Ownership> Update(Ownership entity)
        {
            return _ownershipRepository.Update(entity);
        }
    }
}
