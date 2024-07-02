using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;
using ShopRe.Model.Models;
using ShopRe.Service;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemsController : ControllerBase
    {
        private readonly IOrderItemsService _orderItemsService;
        private readonly IAccountService _accountService;
        public OrderItemsController(IOrderItemsService orderItemsService, IAccountService accountService)
        {
            _orderItemsService = orderItemsService;
            _accountService = accountService;
        }
        [Authorize]
        [HttpPost("AddOrderItemsForUser")]
        public async Task<ActionResult<OrderItems>> AddOrderItems([FromQuery] OrderItemsParameters orderItemsParameters)
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

                var orderItems = await _orderItemsService.AddOrderItems(orderItemsParameters, user);

                if (orderItems != null)
                {
                    return Ok(new 
                    {
                        message = "Order Successfully!",
                        token = token,
                        Data = orderItems,
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
        [Authorize]
        [HttpPost("AddOrderItemsForUser2")]
        public async Task<ActionResult<OrderItems>> AddOrderItems2([FromQuery] OrderItemsParameters orderItemsParameters)
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

                var orderItems = await _orderItemsService.AddOrderItems2(orderItemsParameters, user);

                if (orderItems != null)
                {
                    return Ok(new
                    {
                        message = "Order Successfully!",
                        token = token,
                        Data = orderItems,
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
        [HttpPost("AddOrderItemsForNewUser")]
        public async Task<ActionResult<OrderItems>> AddOrderItemsForNewUser([FromQuery] OrderItemsParameters orderItemsParameters)
        {
            try
            {
                var orderItems = await _orderItemsService.AddOrderItemsForNewUser(orderItemsParameters);

                if (orderItems != null)
                {
                    return Ok(new Response<Order>
                    {
                        message = "Order Successfully!",
                        token = null,
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
                        token = null,
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
