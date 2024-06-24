using ShopRe.Data.Infrastructure;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System.Linq.Expressions;
using ShopRe.Common.DTOs;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using Nest;

namespace ShopRe.Service
{
    public interface ISellerService
    {
        Task<IEnumerable<Seller>> GetAll();
        Task<IQueryable<Seller>> GetAll(bool trackChanges);
        Task<Seller> GetById(int id);
        Task<Seller> Add(Seller entity);
        Task<int> AddRange(IEnumerable<Seller> entities);
        Task<Seller> Update(Seller entity);
        void Remove(int id);
        IEnumerable<Seller> Find(Expression<Func<Seller, bool>> expression);
        Task<SellerInfo> GetUserSerller(string userId);
        Task<SellerInfo> UpdateUserSeller(ChangeUserSeller entity, string userId);
    }
    public class SellerService : ISellerService
    {
        private readonly ISellerRepository _sellerRepository;
        private readonly IMapper _mapper;


        public SellerService( ISellerRepository sellerRepository, IMapper mapper )
        {
            _sellerRepository = sellerRepository;
            _mapper = mapper;
        }

        public Task<Seller> Add(Seller entity)
        {
            return _sellerRepository.Add(entity);
        }

        public Task<int> AddRange(IEnumerable<Seller> entities)
        {
            return _sellerRepository.AddRange(entities);
        }

        public IEnumerable<Seller> Find(Expression<Func<Seller, bool>> expression)
        {
            return _sellerRepository.Find(expression);
        }

        public Task<IEnumerable<Seller>> GetAll()
        {
            return _sellerRepository.GetAll();
        }

        public Task<IQueryable<Seller>> GetAll(bool trackChanges)
        {
            return _sellerRepository.GetAll(trackChanges);
        }

        public Task<Seller> GetById(int id)
        {
            return _sellerRepository.GetById(id);
        }

        public void Remove(int id)
        {
            _sellerRepository.Remove(id);
        }

        public Task<Seller> Update(Seller entity)
        {
            return _sellerRepository.Update(entity);
        }
        public async Task<SellerInfo> GetUserSerller(string userId) 
        {
            var info = await _sellerRepository.GetUserSeller(userId);
            var sellerDTO = _mapper.Map<SellerInfo>(info);
            return sellerDTO;
        }
        public async Task<SellerInfo> UpdateUserSeller(ChangeUserSeller entity,string userId)
        {
            var seller = await _sellerRepository.GetUserSeller(userId);
            seller.Address= entity.Address;
            seller.Name= entity.Name;
            seller.ImageUrl= entity.ImageUrl;
            seller.Phone= entity.Phone;

            var result = await _sellerRepository.Update(seller);
            var sellerDto= _mapper.Map<SellerInfo>(result);
            return sellerDto;
        }
    }
}
