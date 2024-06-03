using Microsoft.EntityFrameworkCore;
using ShopRe.Common.RequestFeatures;
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
        Task<OrderItems> AddOrderItems(OrderItemsParameters orderItemsParameters, ApplicationUser user);
    }
    public class OrderItemsService : IOrderItemsService
    {
        private readonly ShopRecommenderSystemDbContext _dbContext;

        public OrderItemsService(ShopRecommenderSystemDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        private async Task<bool> UpdateTotalPriceOrder(ApplicationUser user, Order order)
        {
            var orderByUser = await _dbContext.Order
                                              .Include(o => o.ApplicationUser)
                                              .FirstOrDefaultAsync(s => s.ApplicationUser.Id == user.Id && s.ID == order.ID);

            if (orderByUser == null)
            {
                return false;
            }

            var orderItems = await _dbContext.OrderItems
                                             .Where(c => c.Order.ID == orderByUser.ID)
                                             .Include(c => c.Product)
                                             .Include(c => c.OptionValues)
                                             .ToListAsync();

            decimal total = 0;
            foreach (var orderItem in orderItems)
            {
                if (orderItem.Product != null)
                {
                    total += Convert.ToDecimal(orderItem.Quantity * orderItem.Product.Price);
                }
            }

            orderByUser.TotalPrice = total;

            _dbContext.Order.Update(orderByUser);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<OrderItems> AddOrderItems(OrderItemsParameters orderItemsParameters, ApplicationUser user)
        {
            // Validate the product
            var product = await _dbContext.Products.FindAsync(orderItemsParameters.idProduct);
            if (product == null)
            {
                throw new InvalidOperationException("Product not found.");
            }

            // Validate the option values if provided
            ProductOptionValues optionValues = null;
            if (orderItemsParameters.idOptionValues.HasValue)
            {
                optionValues = await _dbContext.ProductOptionValues
                                               .Include(p => p.Option)
                                               .FirstOrDefaultAsync(p => p.Id == orderItemsParameters.idOptionValues.Value);
                if (optionValues == null || optionValues.Option == null || optionValues.Option.ProductID != product.ID_NK)
                {
                    throw new InvalidOperationException("Invalid option values.");
                }
            }

            // Retrieve the existing order
            var order = await _dbContext.Order
                                        .Include(o => o.ApplicationUser)
                                        .FirstOrDefaultAsync(o => o.ID == orderItemsParameters.idOrder && o.ApplicationUser.Id == user.Id);
            if (order == null)
            {
                return null;
            }

            var orderItem = new OrderItems
            {
                Quantity = orderItemsParameters.Quantity,
                Price = Convert.ToInt32(orderItemsParameters.Quantity * product.Price),
                Product = product,
                Order = order,
                OptionValues = optionValues
            };


            await _dbContext.OrderItems.AddAsync(orderItem);
            await _dbContext.SaveChangesAsync();

            var check = await UpdateTotalPriceOrder(user, order);
            if (!check)
            {
               return null;
            }

            return orderItem;
        }

    }
}
