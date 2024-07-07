using ShopRe.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data.Infrastructure
{
    public interface IUnitOfWork : IDisposable
    {
        IProductRepository Products { get; }
        ISellerRepository Sellers { get; }
        IProductChildRepository ProductChilds { get; }
        int Save();

    }
}
