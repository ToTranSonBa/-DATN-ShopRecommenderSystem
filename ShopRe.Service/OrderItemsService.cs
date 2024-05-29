using ShopRe.Data;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Service
{
    public interface IOrderItemsService
    {
        Task<bool> AddOrderItems(List<OrderItems> orderItems);
        Task<bool> AddOrderItem(OrderItems orderItem);
    }
    public class OrderItemsService : IOrderItemsService
    {
        private readonly ShopRecommenderSystemDbContext _dbContext;

        public OrderItemsService(ShopRecommenderSystemDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> AddOrderItem(OrderItems orderItem)
        {
            if (orderItem == null)
            {
                return false;
            }
            _dbContext.OrderItems.AddAsync(orderItem);
            await _dbContext.SaveChangesAsync();
            return true;
        }
        public async Task<bool> AddOrderItems(List<OrderItems> orderItems)
        {
            if (orderItems == null)
            {
                return false; // Trả về false nếu đơn đặt hàng hoặc danh sách các mục đặt hàng là null
            }

            try
            {
                foreach (var item in orderItems)
                {
                    await AddOrderItem(item);
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}
