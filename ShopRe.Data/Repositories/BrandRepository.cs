using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShopRe.Data.Infrastructure;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data.Repositories
{
    public interface IBrandRepository : IRepository<Brand>
    {

    }
    public class BrandRepository : RepositoryBase<Brand> , IBrandRepository
    {
        private readonly ShopRecommenderSystemDbContext _context;
        private readonly IMapper _mapper;

        public BrandRepository(ShopRecommenderSystemDbContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }

}
