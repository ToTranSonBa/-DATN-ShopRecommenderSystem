using AutoMapper;
using Newtonsoft.Json.Linq;
using ShopRe.Common.DTOs;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System.Linq.Expressions;

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
        Task<List<Seller>> GetSellerSimilarity(int sellerid, int userCode);
    }
    public class SellerService : ISellerService
    {
        private readonly ISellerRepository _sellerRepository;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;


        public SellerService(ISellerRepository sellerRepository, IMapper mapper, HttpClient httpClient)
        {
            _sellerRepository = sellerRepository;
            _mapper = mapper;
            _httpClient = httpClient;
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
        public async Task<SellerInfo> UpdateUserSeller(ChangeUserSeller entity, string userId)
        {
            var seller = await _sellerRepository.GetUserSeller(userId);
            seller.Address = entity.Address;
            seller.Name = entity.Name;
            seller.ImageUrl = entity.ImageUrl;
            seller.Phone = entity.Phone;

            var result = await _sellerRepository.Update(seller);
            var sellerDto = _mapper.Map<SellerInfo>(result);
            return sellerDto;
        }
        public async Task<List<Seller>> GetSellerSimilarity(int sellerid, int userCode)
        {
            var requestUri = $"https://fastapi-2i32.onrender.com/api/CBF-S/recommend?userid={sellerid}&storeid={sellerid}";
            //var requestUri = $"https://fastapi-2i32.onrender.com/get/RecommendProductForUser?userid={userCode}";
            bool error = false;
            List<Seller> seller = new List<Seller>();
            JObject result = new JObject();
            try
            {
                var response = await _httpClient.GetAsync(requestUri);
                response.EnsureSuccessStatusCode();
                var content = await response.Content.ReadAsStringAsync();
                result = JObject.Parse(content);
            }
            catch
            {
                return new List<Seller>();
            }

            int total = (int)result["total"];
            if (total == 0)
            {
                return seller;
            }

            List<int> sellerId = result["stores"].ToObject<List<int>>();

            seller = await _sellerRepository.GetSellers(sellerId);

            return seller;
        }
    }
}
