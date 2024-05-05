using AutoMapper;
using ShopRe.Data.Infrastructure;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ShopRe.Common;
using ShopRe.Common.RequestFeatures;

namespace ShopRe.Data.Repositories
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<PagedList<Product>?> GetAllProduct(ProductParameters productParameters);
    }
    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(ShopRecommenderSystemDbContext _context, IMapper _mapper) : base(_context, _mapper)
        {

        }
        public async Task<PagedList<Product>?> GetAllProduct(ProductParameters productParameters)
        {
            var obj = await GetAll();
            return PagedList<Product>
                .ToPagedList(obj, productParameters.PageNumber,
                productParameters.PageSize);

        }
    }
}
