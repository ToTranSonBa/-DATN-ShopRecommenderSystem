﻿using ShopRe.Data;
using ShopRe.Data.Infrastructure;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using static ShopRe.Service.OrderService;
using AutoMapper;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;

namespace ShopRe.Service
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAll();
        Task<IQueryable<Order>> GetAll(bool trackChanges);
        Task<OrderDTO> GetById(int id, ApplicationUser user);
        Task<Order> Add(Order entity);
        Task<int> AddRange(IEnumerable<Order> entities);
        Task<Order> Update(Order entity);
        void Remove(int id);
        IEnumerable<Order> Find(Expression<Func<Order, bool>> expression);
        Task<List<OrderDTO>> GetOrdersOfUser(ApplicationUser user);
        Task<Order> CreateOrderForUser(ApplicationUser user, OrderParameters orderParameters);
        Task<Order> UpdateStatus(ApplicationUser user, int status, int idOrder);
        Task<int> CreateOrderForNewUser(OrderNewUserPrameters orderParameters);
        Task<List<OrderDTO>> GetOrdersByStatus(int status, ApplicationUser user);
    }
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ShopRecommenderSystemDbContext _dbContext;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, ShopRecommenderSystemDbContext dbContext, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<OrderDTO>> GetOrdersOfUser(ApplicationUser user)
        {
            // Truy vấn danh sách đơn hàng của người dùng
            var orders = await _dbContext.Order
                                         .Where(o => o.ApplicationUser.Id == user.Id)
                                         .ToListAsync();


            List<OrderDTO> listOrder = _mapper.Map<List<OrderDTO>>(orders);

            foreach (var order in listOrder)
            {
                var orderItems = await _dbContext.OrderItems
                                             .Where(o=>o.Order.ID==order.ID).Include(o=>o.Product).Include(o=>o.OptionValues).ThenInclude(o=>o.Option)
                                             .ToListAsync();

                var Items = _mapper.Map<List<OrderItemsDTO>>(orderItems);
                order.Items = Items;
            }

            return listOrder;
        }

        public async Task<Order> CreateOrderForUser(ApplicationUser user, OrderParameters orderParameters)
        {
            if (orderParameters == null)
            {
                throw new InvalidOperationException("Information are null!");
            }

            var shippingAddress = await _dbContext.ShippingAddresses
                .FirstOrDefaultAsync(s => s.Id == orderParameters.idShippingAddress
                                            && s.User.Id == user.Id);

            if (shippingAddress == null)
            {
                throw new InvalidOperationException("Shipping Address don't exists!");
            }

            var order = new Order
            {
                Status = 1, // 0 Canceled, 1 Pending Confirmation, 2 Waiting for Shipment, 3 Waiting for Pickup, 4 Delivered.
                Address = shippingAddress.Address,
                PhoneNumber = shippingAddress.PhoneNumber,
                TotalPrice = 0, 
                Email = shippingAddress.Email,
                Name = shippingAddress.FullName,
                ShippingAddress = shippingAddress,
                ApplicationUser = user,
            };

            var newOrder = await _dbContext.Order.AddAsync(order);
            await _dbContext.SaveChangesAsync();

            return newOrder.Entity;
        }
        public async Task<int> CreateOrderForNewUser(OrderNewUserPrameters orderParameters)
        {

            var order = new Order
            {
                Status = 1, // 0 Canceled, 1 Pending Confirmation, 2 Waiting for Shipment, 3 Waiting for Pickup, 4 Delivered.
                Address = orderParameters.Address,
                PhoneNumber = orderParameters.PhoneNumber,
                TotalPrice = 0,
                Email = orderParameters.Email,
                Name = orderParameters.LastName + orderParameters.FirstName,
                ShippingAddress = null,
                ApplicationUser = null
            };

            var newOrder = await _dbContext.Order.AddAsync(order);
            await _dbContext.SaveChangesAsync();

            return newOrder.Entity.ID;
        }
        public async Task<List<OrderDTO>> GetOrdersByStatus(int status, ApplicationUser user)
        {
            var orders = await _dbContext.Order
                                 .Where(o => o.ApplicationUser.Id == user.Id && o.Status == status).ToListAsync();


            List<OrderDTO> listOrder = _mapper.Map<List<OrderDTO>>(orders);

            foreach (var order in listOrder)
            {
                var orderItems = await _dbContext.OrderItems
                                             .Where(o => o.Order.ID == order.ID).Include(o => o.Product).Include(o => o.OptionValues).ThenInclude(o => o.Option)
                                             .ToListAsync();

                var Items = _mapper.Map<List<OrderItemsDTO>>(orderItems);
                order.Items = Items;
            }

            return listOrder;
        }

        public async Task<Order> UpdateStatus(ApplicationUser user, int status, int idOrder)
        {
            var order = await _dbContext.Order.FirstOrDefaultAsync(o => o.ID == idOrder && o.ApplicationUser.Id == user.Id);
            if (order == null)
            {
                return null;
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

        public async Task<OrderDTO> GetById(int id, ApplicationUser user)
        {
            var orders = await _dbContext.Order.FirstOrDefaultAsync(o=>o.ID==id && o.ApplicationUser.Id==user.Id);


            OrderDTO Order = _mapper.Map<OrderDTO>(orders);


            var orderItems = await _dbContext.OrderItems
                                         .Where(o => o.Order.ID == Order.ID).Include(o => o.Product).Include(o => o.OptionValues).ThenInclude(o => o.Option)
                                         .ToListAsync();

            var Items = _mapper.Map<List<OrderItemsDTO>>(orderItems);
            Order.Items = Items;


            return Order;
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