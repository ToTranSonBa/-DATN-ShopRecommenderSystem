using Microsoft.EntityFrameworkCore;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data;
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
        Task<ProductOption> AddProductOption(CreateOptionParameters entity);
    }
    public class ProductOptionService : IProductOptionService
    {
        private readonly IProductOptionRepository _productOptionRepository;
        private readonly ShopRecommenderSystemDbContext _dbContext;

        public ProductOptionService( IProductOptionRepository productOptionRepository,
            ShopRecommenderSystemDbContext dbContext)
        {
            _productOptionRepository = productOptionRepository;
            _dbContext = dbContext;
        }

        public Task<ProductOption> Add(ProductOption entity)
        {
            return _productOptionRepository.Add(entity);
        }
        private class OptionAndValues
        {
            public ProductOption? Option { get; set; }
            public List<ProductOptionValues> ProductOptionValues { get; set; } = new List<ProductOptionValues>();
            public List<ProductChild> ProductChildren { get; set; } = new List<ProductChild>();
        }
        public async Task<ProductOption> AddProductOption(CreateOptionParameters entity)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.ID_NK == entity.IdProduct);

            if(product == null)
            {
                throw new ArgumentException("Sản phẩm không tồn tại");
            }

            var optionEntity = new ProductOption
            {
                ID = entity.OptionNumber,
                ProductID = entity.IdProduct,
                Name = entity.Name,
                Code = "option " + (entity.OptionNumber).ToString(),
                IsDeleted = false,
                //Quantity = entity.Quantity
            };
            var option = await _dbContext.ProductOptions.AddAsync(optionEntity);
            await _dbContext.SaveChangesAsync();

            if (entity.Values != null && entity.Values.Count > 0)
            {
                foreach (var item in entity.Values)
                {
                    var optionValuesEntity = new ProductOptionValues
                    {
                        Option = option.Entity,
                        Name = item.Value,
                        ImageUrl = item.Image
                    };
                    await _dbContext.ProductOptionValues.AddAsync(optionValuesEntity);
                }
                await _dbContext.SaveChangesAsync();
            }

            return option.Entity;
        }
        public async Task<ProductOption> AddProductOptionValue(CreateOptionParameters entity)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.ID_NK == entity.IdProduct);

            if (product == null)
            {
                throw new ArgumentException("Sản phẩm không tồn tại");
            }

            var optionEntity = new ProductOption
            {
                ID = entity.OptionNumber,
                ProductID = entity.IdProduct,
                Name = entity.Name,
                Code = "option " + (entity.OptionNumber).ToString(),
                IsDeleted = false,
                //Quantity = entity.Quantity
            };
            var option = await _dbContext.ProductOptions.AddAsync(optionEntity);
            await _dbContext.SaveChangesAsync();

            

            return option.Entity;
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
