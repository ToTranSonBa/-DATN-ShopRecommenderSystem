using AutoMapper;
using ShopRe.Data.Infrastructure;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data.Repositories
{
    public interface IProductOptionRepository : IRepository<ProductOption>
    {

    }
    public class ProductOptionRepository : RepositoryBase<ProductOption> , IProductOptionRepository
    {
        public ProductOptionRepository(ShopRecommenderSystemDbContext _context, IMapper _mapper) : base(_context, _mapper)
        {

        }
    }
}
