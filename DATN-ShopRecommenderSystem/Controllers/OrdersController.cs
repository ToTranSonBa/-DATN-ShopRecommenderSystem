﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nest;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;
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
        [Authorize]
        [HttpGet("OrdersByStatus")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByStatus(int status)
        {
            try
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

                var orders = await _orderService.GetOrdersByStatus(status, user);
                if (orders == null)
                {
                    return NotFound();
                }
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<object>
                {
                    message = $"Internal server error: {ex.Message}",
                    status = "500",
                    token = null,
                    Data = null
                });
            }
        }

        // GET: api/orders/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            try
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

                var order = await _orderService.GetById(id, user);
                if (order == null)
                {
                    return NotFound();
                }
                return Ok(order);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<object>
                {
                    message = $"Internal server error: {ex.Message}",
                    status = "500",
                    token = null,
                    Data = null
                });
            }
        }

        [Authorize]
        [HttpPost("CreatOrderForUser")]
        public async Task<ActionResult<Order>> CreateOrder([FromQuery] OrderParameters orderParameters)
        {
            try
            {
                // Get token from the Authorization header
                var authHeader = Request.Headers["Authorization"].ToString();
                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    return Unauthorized();
                }
                var token = authHeader.Substring("Bearer ".Length).Trim();

                // Get user from token
                var user = await _accountService.GetUserFromTokenAsync(token);
                if (user == null)
                {
                    return Unauthorized(new 
                    {
                        message = "Unauthorized!",
                        status = "401",
                        token = token,
                    });
                }
                var order = await _orderService.CreateOrderForUser(user, orderParameters);

                if (order != null)
                {
                    return Ok(new
                    {
                        message = "Create Order Successfully.",
                        status = 201,
                        token = token,
                        Data = order
                    });
                }
                else
                {
                    return BadRequest(new Response<object>
                    {
                        message = "Failed to create order.",
                        status = "400",
                        token = token,
                        Data = null
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<object>
                {
                    message = $"Internal server error: {ex.Message}",
                    status = "500",
                    token = null,
                    Data = null
                });
            }
        }
        [Authorize]
        [HttpPost("CreatOrderForNewUser")]
        public async Task<ActionResult<Order>> CreateOrderForNewUser([FromQuery] OrderNewUserPrameters orderParameters)
        {
            try
            {
                // Get token from the Authorization header
                var authHeader = Request.Headers["Authorization"].ToString();
                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    return Unauthorized();
                }
                var token = authHeader.Substring("Bearer ".Length).Trim();

                // Get user from token
                var user = await _accountService.GetUserFromTokenAsync(token);
                if (user == null)
                {
                    return Unauthorized(new Response<object>
                    {
                        message = "Unauthorized!",
                        status = "401",
                        token = token,
                        Data = null,
                    });
                }
                var order = await _orderService.CreateOrderForNewUser(orderParameters);

                if (order != null)
                {
                    return Ok(order);
                }
                else
                {
                    return BadRequest(new Response<object>
                    {
                        message = "Failed to create order.",
                        status = "400",
                        token = token,
                        Data = null
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<object>
                {
                    message = $"Internal server error: {ex.Message}",
                    status = "500",
                    token = null,
                    Data = null
                });
            }
        }

        [Authorize]
        [HttpPut("UpdateStatusOrder{id}")]
        public async Task<ActionResult<Order>> UpdateStatusOrder(int id, int status)
        {
            try
            {
                // Get token from the Authorization header
                var authHeader = Request.Headers["Authorization"].ToString();
                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    return Unauthorized();
                }
                var token = authHeader.Substring("Bearer ".Length).Trim();

                // Get user from token
                var user = await _accountService.GetUserFromTokenAsync(token);
                if (user == null)
                {
                    return Unauthorized(new Response<CartItem>
                    {
                        message = "Unauthorized!",
                        status = "401",
                        token = token,
                        Data = null,
                    });
                }

                var order = await _orderService.UpdateStatus(user, status, id);

                if (order != null)
                {
                    return Ok(new Response<Order>
                    {
                        message = "Order Successfully!",
                        token = token,
                        Data = null,
                        status = "201"
                    });
                }
                else
                {
                    return BadRequest(new Response<object>
                    {
                        message = "Failed to create order.",
                        status = "400",
                        token = token,
                        Data = null
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<object>
                {
                    message = $"Internal server error: {ex.Message}",
                    status = "500",
                    token = null,
                    Data = null
                });
            }
        }
        
    }
}