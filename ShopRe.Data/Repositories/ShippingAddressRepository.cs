using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShopRe.Data.Infrastructure;
using ShopRe.Data.Migrations;
using ShopRe.Model.Models;

namespace ShopRe.Data.Repositories
{
    public interface IShippingAddressRepository : IRepository<ShippingAddress>
    {
        Task<IEnumerable<ShippingAddress>> GetAllbyUser(ApplicationUser user);
        void Detele(ShippingAddress shippingaddress);
        Task<ShippingAddress> AddAsync(ShippingAddress shippingaddress);

    }
    public class ShippingAddressRepository: RepositoryBase<ShippingAddress>, IShippingAddressRepository
    {
        private readonly ShopRecommenderSystemDbContext context;
        public ShippingAddressRepository(ShopRecommenderSystemDbContext _context, IMapper _mapper) : base(_context, _mapper) {
            context = _context;
        }
        
        public async Task<IEnumerable<ShippingAddress>> GetAllbyUser(ApplicationUser user)
        {
            var addresses = await context.Set<ShippingAddress>()
                                    .Where(addresses => addresses.UserId == user.Id)
                                    .ToListAsync();
           
            return addresses;
        }
        public void Detele(ShippingAddress shippingaddress)
        {
            context.Set<ShippingAddress>().Remove(shippingaddress);
            _ = SaveChangesAsync();
        }
        public async Task<ShippingAddress> AddAsync(ShippingAddress shippingaddress)
        {
            var res = context.Set<ShippingAddress>().Add(shippingaddress);
            await context.SaveChangesAsync();
            return shippingaddress;
        }
    }
}
