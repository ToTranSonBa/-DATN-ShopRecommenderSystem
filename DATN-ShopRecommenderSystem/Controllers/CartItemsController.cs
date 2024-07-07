﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopRe.Common.DTOs;
using ShopRe.Model.Models;
using ShopRe.Service;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController : ControllerBase
    {
        private readonly ICartItemsService _cartItemsService;
        private readonly IAccountService _accountService;
        public CartItemsController(ICartItemsService cartItemsService, IAccountService accountService) { 
            _cartItemsService = cartItemsService;
            _accountService = accountService;
        }
        [Authorize]
        [HttpPost("AddToCart")]
        public async Task<IActionResult> AddToCart(int idProduct, int? idProductOptionValue, string ProductOptionImage, int Quantity)
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
                return Unauthorized(); 
            }

            var result = await _cartItemsService.AddToCart(idProduct, idProductOptionValue, ProductOptionImage, Quantity, user);
            if(result == null)
            {
                return NoContent();
            }

            var response = new Response<CartItem>("Add to cart successfully", "201", null, token);

            return Ok(response);
        }
        [Authorize]
        [HttpPost("AddToCart2")]
        public async Task<IActionResult> AddToCart2(int idProduct, int? idProductOptionValue1, int? idProductOptionValue2, string ProductOptionImage, int Quantity)
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
                return Unauthorized();
            }

            var result = await _cartItemsService.AddToCart2(idProduct, idProductOptionValue1, idProductOptionValue2, ProductOptionImage, Quantity, user);
            if (result == null)
            {
                return NoContent();
            }

            var response = new Response<CartItem>("Add to cart successfully", "201", null, token);

            return Ok(response);
        }

        [Authorize]
        [HttpGet("UserCartItems")]
        public async Task<IActionResult> GetUserCartItems()
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
                return Unauthorized(); 
            }

            var cartItems = await _cartItemsService.GetAllItemsOfUserInCart(user);

            var response = new Response<CartItem>("Success", "200", cartItems, token);

            return Ok(response);
        }

        [Authorize]
        [HttpPut("UpdateQuantity")]
        public async Task<IActionResult> UpdateQuantityItem(int idProduct, int Quantity)
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
                return Unauthorized();
            }

            var cartItem = await _cartItemsService.UpdateQuantityItem(idProduct, Quantity, user);

            if(cartItem == null)
            {
                return NoContent();
            }

            var response = new Response<CartItem>("Success", "200", null, token);

            return Ok(response);
        }

        [Authorize]
        [HttpPost("IncreaseProduct")]
        public async Task<IActionResult> IncreaseProduct(int idProduct)
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
                return Unauthorized();
            }

            var cartItems = await _cartItemsService.IncreaseProductInCart(idProduct, user);
            var response = new Response<CartItem>("Success", "200", null, token);

            return Ok(response);
        }
        [Authorize]
        [HttpPost("DecreaseProduct")]
        public async Task<IActionResult> DecreaseProduct(int idProduct)
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
                return Unauthorized(); // Trả về 401 nếu người dùng không hợp lệ
            }

            var cartItems = await _cartItemsService.DecreaseProductInCart(idProduct, user);
            var response = new Response<CartItem>("Success", "200", null, token);

            return Ok(response);
        }
        [Authorize]
        [HttpDelete("DeleteCartItems")]
        public async Task<IActionResult> DeleteItems(int idCartItem)
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

            bool check = await _cartItemsService.DeleteCartItem(idCartItem, user);

            if (check)
            {
                return Ok(new Response<CartItem>()
                {
                    message = "Delete Success!",
                    status = "204",
                    token = token,
                    Data = null,
                });
            }
            else { 
                return BadRequest(new Response<CartItem>()
                {
                    message = "Delete Failed!",
                    status = "204",
                    token = token,
                    Data = null,
                });
            }
        }
    }
}