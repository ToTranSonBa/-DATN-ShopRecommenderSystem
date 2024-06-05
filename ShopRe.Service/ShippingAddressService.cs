using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Service
{
    public interface IShippingAddressService
    {
        Task<IEnumerable<ShippingAddress>> GetAll();
        Task<IEnumerable<ShippingAddress>> GetAllbyUser(ApplicationUser user);
        Task<IQueryable<ShippingAddress>> GetAll(bool trackChanges);
        Task<ShippingAddress> GetById(int id);
        Task<ShippingAddress> Add(ShippingAddress entity);
        Task<int> AddRange(IEnumerable<ShippingAddress> entities);
        Task<ShippingAddress> Update(ShippingAddress entity);
        void Remove(int id);
        IEnumerable<ShippingAddress> Find(Expression<Func<ShippingAddress, bool>> expression);
    }
    public class ShippingAddressService : IShippingAddressService
    {
        private readonly IShippingAddressRepository _shippingAddressRepository;

        public ShippingAddressService(IShippingAddressRepository shippingAddressService)
        {
            _shippingAddressRepository = shippingAddressService;
        }
        public Task<IEnumerable<ShippingAddress>> GetAllbyUser(ApplicationUser user)
        {
            return _shippingAddressRepository.GetAllbyUser(user);
        }

        public Task<ShippingAddress> Add(ShippingAddress entity)
        {
            return _shippingAddressRepository.Add(entity);
        }

        public Task<int> AddRange(IEnumerable<ShippingAddress> entities)
        {
            return _shippingAddressRepository.AddRange(entities);
        }

        public IEnumerable<ShippingAddress> Find(Expression<Func<ShippingAddress, bool>> expression)
        {
            return _shippingAddressRepository.Find(expression);
        }

        public Task<IEnumerable<ShippingAddress>> GetAll()
        {
            return _shippingAddressRepository.GetAll();
        }

        public Task<IQueryable<ShippingAddress>> GetAll(bool trackChanges)
        {
            return _shippingAddressRepository.GetAll(trackChanges);
        }

        public Task<ShippingAddress> GetById(int id)
        {
            return _shippingAddressRepository.GetById(id);
        }

        public async void Remove(int id)
        {
            var obj = await _shippingAddressRepository.GetById(id);
            _shippingAddressRepository.Detele(obj);
        }

        public Task<ShippingAddress> Update(ShippingAddress entity)
        {
            return _shippingAddressRepository.Update(entity);
        }
    }
}
