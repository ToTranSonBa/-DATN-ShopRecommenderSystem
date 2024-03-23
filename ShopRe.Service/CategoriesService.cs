using ShopRe.Data.Infrastructure;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System.Linq.Expressions;

namespace ShopRe.Service
{

    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAll();
        Task<IQueryable<Category>> GetAll(bool trackChanges);
        Task<Category> GetById(int id);
        Task<Category> Add(Category entity);
        Task<int> AddRange(IEnumerable<Category> entities);
        Task<Category> Update(Category entity);
        void Remove(int id);
        IEnumerable<Category> Find(Expression<Func<Category, bool>> expression);
    }
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        public Task<Category> Add(Category entity)
        {
            return _categoryRepository.Add(entity);
        }

        public Task<int> AddRange(IEnumerable<Category> entities)
        {
            return _categoryRepository.AddRange(entities);
        }

        public IEnumerable<Category> Find(Expression<Func<Category, bool>> expression)
        {
            return _categoryRepository.Find(expression);
        }

        public Task<IEnumerable<Category>> GetAll()
        {
            return _categoryRepository.GetAll();
        }

        public Task<IQueryable<Category>> GetAll(bool trackChanges)
        {
            return _categoryRepository.GetAll(trackChanges);
        }

        public Task<Category> GetById(int id)
        {
            return _categoryRepository.GetById(id);
        }

        public void Remove(int id)
        {
            _categoryRepository.Remove(id);
        }

        public Task<Category> Update(Category entity)
        {
            return _categoryRepository.Update(entity);
        }
    }
}
