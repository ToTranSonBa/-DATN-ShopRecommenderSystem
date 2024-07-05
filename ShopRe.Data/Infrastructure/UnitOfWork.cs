using Microsoft.EntityFrameworkCore;
using ShopRe.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ShopRecommenderSystemDbContext _context;
        public IProductRepository Products { get; }
        public IProductOptionRepository ProductOptions { get; }
        public ISellerRepository Sellers { get; }
        public UnitOfWork(ShopRecommenderSystemDbContext context, IProductRepository products,
            IProductOptionRepository productOption, ISellerRepository seller)
        {
            _context = context;
            Products = products;
            ProductOptions = productOption;
            Sellers = seller;
        }
        public int Save()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
        }
    }
}
