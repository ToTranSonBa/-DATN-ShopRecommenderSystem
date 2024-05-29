using ShopRe.Data;
using ShopRe.Data.Infrastructure;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using static ShopRe.Service.OrderService;

namespace ShopRe.Service
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAll();
        Task<IQueryable<Order>> GetAll(bool trackChanges);
        Task<Order> GetById(int id);
        Task<Order> Add(Order entity);
        Task<int> AddRange(IEnumerable<Order> entities);
        Task<Order> Update(Order entity);
        void Remove(int id);
        IEnumerable<Order> Find(Expression<Func<Order, bool>> expression);
        Task<List<OrderDTO>> GetOrdersOfUser(ApplicationUser user);

        Task<Order> CreateOrder(ApplicationUser user, string Address, string PhoneNumber);
        Task<Order> UpdateStatus(ApplicationUser user, int status, int idOrder);
    }
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ShopRecommenderSystemDbContext _dbContext;

        public OrderService(IOrderRepository orderRepository, ShopRecommenderSystemDbContext dbContext)
        {
            _orderRepository = orderRepository;
            _dbContext = dbContext;
        }

        public class OrderDTO
        {
            public Order? Order;
            public List<OrderItems>? OrderItems;
        }

        public async Task<List<OrderDTO>> GetOrdersOfUser(ApplicationUser user)
        {
            // Truy vấn danh sách đơn hàng của người dùng
            var orders = await _dbContext.Order
                                         .Where(o => o.ApplicationUser.Id == user.Id)
                                         .ToListAsync();

            List<OrderDTO> listOrder = new List<OrderDTO>();

            foreach (var order in orders)
            {
                var orderItem = await _dbContext.OrderItems
                                             .Where(o=>o.Id==order.ID)
                                             .ToListAsync();
                var orderTemp = new OrderDTO()
                {
                    Order = order,
                    OrderItems = orderItem
                };
                listOrder.Add(orderTemp);
            }

            return listOrder;
        }

        public async Task<Order> CreateOrder(ApplicationUser user, string address, string phoneNumber)
        {
            if (string.IsNullOrWhiteSpace(address))
            {
                address = user.Address;
            }

            if (string.IsNullOrWhiteSpace(phoneNumber))
            {
                phoneNumber = user.PhoneNumber;
            }

            var order = new Order()
            {
                TotalPrice = 0,
                ApplicationUser = user,
                Status = 1,
                Address = address,
                PhoneNumber = phoneNumber
            };

            await _dbContext.Order.AddAsync(order);
            await _dbContext.SaveChangesAsync();

            return order;
        }


        public async Task<Order> UpdateStatus(ApplicationUser user, int status, int idOrder)
        {
            var order = await _dbContext.Order.FirstOrDefaultAsync(p => p.ID == idOrder);
            if (order == null)
            {
                return await Task.FromResult<Order>(null);
            }
            else
            {
                //Cap nhat status
                order.Status = status;
                _dbContext.Order.Update(order);
                await _dbContext.SaveChangesAsync();
                return order;
            }
        }

        public Task<Order> Add(Order entity)
        {
            return _orderRepository.Add(entity);
        }

        public Task<int> AddRange(IEnumerable<Order> entities)
        {
            return _orderRepository.AddRange(entities);
        }

        public IEnumerable<Order> Find(Expression<Func<Order, bool>> expression)
        {
            return _orderRepository.Find(expression);
        }

        public Task<IEnumerable<Order>> GetAll()
        {
            return _orderRepository.GetAll();
        }

        public Task<IQueryable<Order>> GetAll(bool trackChanges)
        {
            return _orderRepository.GetAll(trackChanges);
        }

        public Task<Order> GetById(int id)
        {
            return _orderRepository.GetById(id);
        }

        public void Remove(int id)
        {
            _orderRepository.Remove(id);
        }

        public Task<Order> Update(Order entity)
        {
            return _orderRepository.Update(entity);
        }
    }
}
