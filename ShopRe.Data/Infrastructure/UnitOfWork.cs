using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data.Infrastructure
{
    public class UnitOfWork
    {
        private ShopRecommenderSystemDbContext _context;

        UnitOfWork(ShopRecommenderSystemDbContext context) { 
            _context = context;
        }
        
        public void Commit()
        {
            _context.SaveChanges();
        }
    }
}
