using ShopRe.Data.Infrastructure;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System.Linq.Expressions;

namespace ShopRe.Service
{
    public interface IProductOptionService
    {
        Task<IEnumerable<ProductOption>> GetAll();
        Task<IQueryable<ProductOption>> GetAll(bool trackChanges);
        Task<ProductOption> GetById(int id);
        Task<ProductOption> Add(ProductOption entity);
        Task<int> AddRange(IEnumerable<ProductOption> entities);
        Task<ProductOption> Update(ProductOption entity);
        void Remove(int id);
        IEnumerable<ProductOption> Find(Expression<Func<ProductOption, bool>> expression);
    }
    public class ProductOptionService : IProductOptionService
    {
        private readonly IProductOptionRepository _productOptionRepository;

        public ProductOptionService( IProductOptionRepository productOptionRepository)
        {
            _productOptionRepository = productOptionRepository;
        }

        public Task<ProductOption> Add(ProductOption entity)
        {
            return _productOptionRepository.Add(entity);
        }

        public Task<int> AddRange(IEnumerable<ProductOption> entities)
        {
            return _productOptionRepository.AddRange(entities);
        }

        public IEnumerable<ProductOption> Find(Expression<Func<ProductOption, bool>> expression)
        {
            return _productOptionRepository.Find(expression);
        }

        public Task<IEnumerable<ProductOption>> GetAll()
        {
            return _productOptionRepository.GetAll();
        }

        public Task<IQueryable<ProductOption>> GetAll(bool trackChanges)
        {
            return _productOptionRepository.GetAll(trackChanges);
        }

        public Task<ProductOption> GetById(int id)
        {
            return _productOptionRepository.GetById(id);
        }

        public void Remove(int id)
        {
            _productOptionRepository.Remove(id);
        }

        public Task<ProductOption> Update(ProductOption entity)
        {
            return _productOptionRepository.Update(entity);
        }
    }
}
