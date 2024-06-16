using AutoMapper;
using ShopRe.Data.Infrastructure;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ShopRe.Common;
using ShopRe.Common.RequestFeatures;
using Microsoft.EntityFrameworkCore;


namespace ShopRe.Data.Repositories
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<PagedList<Product>?> GetAllProduct(ProductParameters productParameters);
        Task<IEnumerable<Product>> GetPaged(int pageSize, int pageNumber);
        Task<List<Product>> GetTopNew(int number);
        Task<List<Product>> GetProductPopular(int number);
    }
    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        private readonly ShopRecommenderSystemDbContext context;
        public ProductRepository(ShopRecommenderSystemDbContext _context, IMapper _mapper) : base(_context, _mapper)
        {
            context = _context;
        }
        public async Task<PagedList<Product>?> GetAllProduct(ProductParameters productParameters)
        {
            var obj = await GetAll();
            return PagedList<Product>
                .ToPagedList(obj, productParameters.PageNumber,
                productParameters.PageSize);

        }
        public async Task<IEnumerable<Product>> GetPaged(int pageSize, int pageNumber)
        {
            // Sử dụng LINQ để phân trang
            var pagedData = await context.Products
                                           .OrderBy(p => p.ID_NK) // Sắp xếp theo ID_NK hoặc thuộc tính khác
                                           .Skip(pageSize * (pageNumber - 1)) // Bỏ qua số lượng bản ghi của các trang trước
                                           .Take(pageSize) // Lấy số lượng bản ghi của trang hiện tại
                                           .ToListAsync();

            return pagedData;
        }
        public async Task<List<Product>> GetTopNew(int number)
        {
            return await context.Products
                    .Where(p => p.CreatedAt.HasValue && p.CreatedAt.Value.Date == DateTime.Today)
                    .OrderByDescending(p => p.CreatedAt)
                    .Take(number)
                    .ToListAsync();
        }
        public async Task<List<Product>> GetProductPopular(int number)
        {
            var firstDayOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            // Lấy ngày cuối cùng của tháng hiện tại
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

            // Truy vấn lấy ra 10 ProductID_NK xuất hiện nhiều nhất trong tháng hiện tại
            var topProductIDs = await context.OrderItems
                .Where(oi => oi.Order.CreatedAt >= firstDayOfMonth && oi.Order.CreatedAt <= lastDayOfMonth)
                    .GroupBy(oi => oi.ProductID_NK)
                    .OrderByDescending(g => g.Count())
                    .Select(g => g.Key)
                    .Take(number)
                    .ToListAsync();
            var topProducts = await context.Products
                    .Where(p => topProductIDs.Contains(p.ID_NK))
                    .ToListAsync();
            return topProducts;
        }
    }
}
