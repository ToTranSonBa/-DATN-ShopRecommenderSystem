using DATN_ShopRecommenderSystem.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopRe.Common.DTOs;
using ShopRe.Data;
using ShopRe.Model.Models;
using ShopRe.Service;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        readonly IOrderService _orderService;
        private readonly IAccountService _accountService;
        private readonly ICartItemsService _cartItemsService;
        private readonly ShopRecommenderSystemDbContext _dbContext;
        public OrdersController(IOrderService orderService, IAccountService accountService, 
            ICartItemsService cartItemsService, ShopRecommenderSystemDbContext dbContext)
        {
            _orderService = orderService;
            _accountService = accountService;
            _cartItemsService = cartItemsService;
            _dbContext = dbContext;
        }
        [Authorize]
        [HttpGet("UserOrders")]
        public async Task<IActionResult> GetOrdersOfUser()
        {
            // Lấy token từ header Authorization
            var authHeader = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return Unauthorized();
            }
            var token = authHeader.Substring("Bearer ".Length).Trim();

            var user = await _accountService.GetUserFromTokenAsync(token);
            if (user == null)
            {
                return Unauthorized(new Response<CartItem>()
                {
                    message = "Unauthorized!",
                    status = "401",
                    token = token,
                    Data = null,
                });
            }

            var res = await _orderService.GetOrdersOfUser(user);
            return Ok(res);
        }

        // GET: api/orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var res = await _orderService.GetAll();
            return Ok(res);
        }

        // GET: api/orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _orderService.GetById(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        // POST: api/orders
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(string Address, string PhoneNumber)
        {
            // Lấy token từ header Authorization
            var authHeader = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return Unauthorized();
            }
            var token = authHeader.Substring("Bearer ".Length).Trim();

            var user = await _accountService.GetUserFromTokenAsync(token);
            if (user == null)
            {
                return Unauthorized(new Response<CartItem>()
                {
                    message = "Unauthorized!",
                    status = "401",
                    token = token,
                    Data = null,
                });
            }else
            {
                var cartItems = await _cartItemsService.GetAllItemsOfUserInCart(user);


                Order order = await _orderService.CreateOrder(user, Address, PhoneNumber);

                var orderItems = new List<OrderItems>();
                try
                {
                    foreach (var item in cartItems)
                    {
                        var orderItem = new OrderItems()
                        {
                            Product = item.Product,
                            Order = order,
                            Quantity = item.Quantity,
                            Price = item.Product.Price * item.Quantity
                        };

                        order.TotalPrice += item.Product.Price * item.Quantity;

                        _dbContext.OrderItems.AddAsync(orderItem);
                        _dbContext.Order.Update(order);
                        await _dbContext.SaveChangesAsync();
                    }

                    return Ok(new Response<OrderItems>
                    {
                        message = "Order Successfully!",
                        status = "200",
                        Data = null,
                        token = token
                    });
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }

            }
        }

        // DELETE: api/orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(int id)
        {
            _orderService.Remove(id);

            return NoContent();
        }
        // PUT: api/orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            var res = _orderService.Update(order);
            return NoContent();
        }

    }
}
