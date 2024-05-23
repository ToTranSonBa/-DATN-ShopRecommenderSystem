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
        Task<IEnumerable<BrandDTO>> GetAll();
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
        private readonly IElasticClient _elasticClient;

        public BrandService(IBrandRepository brandRepository, IElasticClient elasticClient)
        {
            _elasticClient = elasticClient;
            _brandRepository = brandRepository;
        }

        private async Task<int> GetTotalProductCountForBrand(int brandId)
        {
            var response = await _elasticClient.SearchAsync<object>(s => s
                .Index("shoprecommend")
                .Query(q => q
                    .Bool(b => b
                        .Filter(filters => filters
                            .Term(t => t.Field("BrandID_NK").Value(brandId))
                        )
                    )
                )
            );

            if (!response.IsValid)
            {
                return 0;
            }

            return Convert.ToInt32(response.Total);
        }

        public async Task<IEnumerable<BrandDTO>> GetAll()
        {
            var brands = await _brandRepository.GetAll();
            var brandsResponse = new List<BrandDTO>();

            foreach (var brand in brands)
            {
                var totalProductOfBrand = await GetTotalProductCountForBrand(brand.ID_NK);
                var brandItem = new BrandDTO()
                {
                    Brand = brand,
                    TotalProduct = totalProductOfBrand
                };
                brandsResponse.Add(brandItem);
            }

            // Order the brands by total product count in descending order and take top 15
            var orderedBrands = brandsResponse.OrderByDescending(b => b.TotalProduct).Take(15).ToList();

            return orderedBrands;
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
