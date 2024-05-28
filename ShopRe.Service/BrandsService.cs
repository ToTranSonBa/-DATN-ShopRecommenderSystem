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
    public interface IBrandService
    {
        Task<IEnumerable<Brand>> GetAll();
        Task<IQueryable<Brand>> GetAll(bool trackChanges);
        Task<Brand> GetById(int id);
        Task<Brand> Add(Brand entity);
        Task<int> AddRange(IEnumerable<Brand> entities);
        Task<Brand> Update(Brand entity);
        void Remove(int id);
        IEnumerable<Brand> Find(Expression<Func<Brand, bool>> expression);
    }
    public class BrandService : IBrandService
    {
        private readonly IBrandRepository _brandRepository;

        public BrandService(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }
        public async Task<IEnumerable<Brand>> GetAll()
        {
            var brands = await _brandRepository.GetAll();
            return brands;
        }

        public Task<Brand> Add(Brand entity)
        {
            return _brandRepository.Add(entity);
        }

        public Task<int> AddRange(IEnumerable<Brand> entities)
        {
            return _brandRepository.AddRange(entities);
        }

        public IEnumerable<Brand> Find(Expression<Func<Brand, bool>> expression)
        {
            return _brandRepository.Find(expression);
        }
        public Task<IQueryable<Brand>> GetAll(bool trackChanges)
        {
            return _brandRepository.GetAll(trackChanges);
        }

        public Task<Brand> GetById(int id)
        {
            return _brandRepository.GetById(id);
        }

        public void Remove(int id)
        {
            _brandRepository.Remove(id);
        }

        public Task<Brand> Update(Brand entity)
        {
            return _brandRepository.Update(entity);
        }

    }
}
