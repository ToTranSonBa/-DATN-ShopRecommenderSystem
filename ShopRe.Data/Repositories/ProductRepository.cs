using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data.Infrastructure;
using ShopRe.Model.Models;


namespace ShopRe.Data.Repositories
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<PagedList<Product>?> GetAllProduct(ProductParameters productParameters);
        Task<IEnumerable<Product>> GetPaged(int pageSize, int pageNumber);
        Task<List<Product>> GetTopNew(int number);
        Task<List<Product>> GetProductPopular(int number);
        Task<List<Product>> GetProductByCateId(int cateId);
        Task<List<Product>> GetProductByCateId(int cateId, List<int> proIds, int quantity);
        Task<List<Product>> GetTopView(int number);

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
        public async Task<List<Product>> GetProductByCateId(int cateId)
        {
            return await context.Products.Where(p => p.Category_LV0_NK == cateId)
                .OrderBy(e => e.RatingCount)
                .ThenBy(e => e.RatingAverage)
                .Take(10)
                .ToListAsync();
        }
        public async Task<List<Product>> GetProductByCateId(int cateId, List<int> proIds, int quantity)
        {
            return await context.Products.Where(p => p.Category_LV0_NK == cateId && !proIds.Contains(p.ID_NK))
                .OrderBy(e => e.RatingCount)
                .ThenBy(e => e.RatingAverage)
                .Take(quantity)
                .ToListAsync();
        }
        public async Task<List<Product>> GetTopView(int number)
        {

            var firstDayOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            // Lấy ngày cuối cùng của tháng hiện tại
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
            var topIds = await context.UserLog
                   .Where(u=>u.DateTime >= firstDayOfMonth && u.DateTime <= lastDayOfMonth)
                   .GroupBy(u => u.ProductID_NK)
                    .OrderByDescending(g => g.Count())
                    .Select(g => g.Key)
                    .Take(number)
                    .ToListAsync();
            var topViews = await context.Products
                .Where(p => topIds.Contains(p.ID_NK))
                .ToListAsync();
            return topViews;    

        }
    }
}
