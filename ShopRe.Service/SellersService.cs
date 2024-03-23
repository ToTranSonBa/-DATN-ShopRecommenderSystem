using ShopRe.Data.Infrastructure;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System.Linq.Expressions;

namespace ShopRe.Service
{
    public interface ISellerService
    {
        Task<IEnumerable<Seller>> GetAll();
        Task<IQueryable<Seller>> GetAll(bool trackChanges);
        Task<Seller> GetById(int id);
        Task<Seller> Add(Seller entity);
        Task<int> AddRange(IEnumerable<Seller> entities);
        Task<Seller> Update(Seller entity);
        void Remove(int id);
        IEnumerable<Seller> Find(Expression<Func<Seller, bool>> expression);
    }
    public class SellerService : ISellerService
    {
        private readonly ISellerRepository _sellerRepository;

        public SellerService( ISellerRepository sellerRepository)
        {
            _sellerRepository = sellerRepository;
        }

        public Task<Seller> Add(Seller entity)
        {
            return _sellerRepository.Add(entity);
        }

        public Task<int> AddRange(IEnumerable<Seller> entities)
        {
            return _sellerRepository.AddRange(entities);
        }

        public IEnumerable<Seller> Find(Expression<Func<Seller, bool>> expression)
        {
            return _sellerRepository.Find(expression);
        }

        public Task<IEnumerable<Seller>> GetAll()
        {
            return _sellerRepository.GetAll();
        }

        public Task<IQueryable<Seller>> GetAll(bool trackChanges)
        {
            return _sellerRepository.GetAll(trackChanges);
        }

        public Task<Seller> GetById(int id)
        {
            return _sellerRepository.GetById(id);
        }

        public void Remove(int id)
        {
            _sellerRepository.Remove(id);
        }

        public Task<Seller> Update(Seller entity)
        {
            return _sellerRepository.Update(entity);
        }
    }
}
