using AutoMapper;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data.Infrastructure;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data.Repositories
{
    public interface IProductChildRepository : IRepository<ProductChild>
    {

    }
    public class ProductChildRepository : RepositoryBase<ProductChild>, IProductChildRepository
    {
        public ProductChildRepository(ShopRecommenderSystemDbContext _context, IMapper _mapper) : base(_context, _mapper)
        {
           
        }
    }
}
