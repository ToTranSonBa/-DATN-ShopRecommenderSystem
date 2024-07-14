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
        Task<List<int>> GetProductPopular(int number);
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
                    .Where(p => p.CreatedAt.HasValue && p.CreatedAt.Value.Date == (DateTime.Today))
                    .OrderByDescending(p => p.CreatedAt)
                    .Take(number)
                    .ToListAsync();
        }
        public async Task<List<int>> GetProductPopular(int number)
        {
                        
            var listId= await context.Set<TopPopProduct>().Select(p=>p.ProductID_NK).ToListAsync();
            
            return listId;

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

            var listId = await context.Set<TopViewProduct>().Select(p => p.ProductID_NK).ToListAsync();
            var listproduct = new List<Product>();
            foreach (var id in listId)
            {
                listproduct.Add(await GetById(id));
            }
            return listproduct;

        }
    }
}
