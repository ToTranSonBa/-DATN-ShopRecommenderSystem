using Microsoft.EntityFrameworkCore;
using Nest;
using ShopRe.Common.DTOs;
using ShopRe.Data;
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
        Task<List<CategoryDTO>> GetCategoryLevel(int level);

    }
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly ShopRecommenderSystemDbContext _dbContext;
        private readonly IElasticClient _elasticClient;
        public CategoryService(ICategoryRepository categoryRepository, ShopRecommenderSystemDbContext dbContext, IElasticClient elasticClient)
        {
            _elasticClient= elasticClient;
            _dbContext = dbContext;
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

        public async Task<List<CategoryDTO>> GetCategoryLevel(int level)
        {
            var results = await _dbContext.Category.Where(p => p.Level == level).ToListAsync();

            var list = new List<CategoryDTO>();

            string levelProduct = $"Category_LV{level}_NK";

            foreach (var category in results)
            {
                var categoryId = category.GetType().GetProperty("ID_NK").GetValue(category);

                // Using Elasticsearch to count products
                var countResponse = await _elasticClient.CountAsync<Product>(s => s
                    .Query(q => q
                        .Term(t => t.Field(levelProduct).Value(categoryId))
                    )
                );

                if (!countResponse.IsValid)
                {
                    // Handle error if needed
                    throw new Exception($"Failed to count products for category {categoryId}: {countResponse.ServerError}");
                }

                var categoryDto = new CategoryDTO
                {
                    Category = category,
                    Total = countResponse.Count
                };

                list.Add(categoryDto);
            }

            // Loại bỏ các mục có Total = 0 và sắp xếp giảm dần theo Total
            var sortedList = list
                .Where(c => c.Total > 0)
                .OrderByDescending(c => c.Total)
                .ToList();

            return sortedList;
        }


    }
}
