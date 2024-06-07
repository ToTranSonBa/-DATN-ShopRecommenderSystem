using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nest;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data;
using ShopRe.Data.Migrations;
using ShopRe.Model.Models;
using ShopRe.Service;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [EnableCors()]
    [Route("api/[controller]")]
    [ApiController]
    public class ShippingAddressController : ControllerBase
    {
        readonly IShippingAddressService _shippingAddressService;
        private readonly IAccountService _accountService;
        private readonly ShopRecommenderSystemDbContext _context;
        public ShippingAddressController(ShopRecommenderSystemDbContext context,IShippingAddressService shippingAddressService, IAccountService accountService)
        {
            _shippingAddressService = shippingAddressService;
            _context = context;
            _accountService = accountService;
        }
        [Authorize]
        [HttpGet("GetListAdress")]
        public async Task<IActionResult> GetAll()
        {
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
            var addresses = await _shippingAddressService.GetAllbyUser(user);

            return Ok(addresses);
        }
        [Authorize]
        [HttpGet("GetbyId")]
        public async Task<IActionResult> GetById(int id)
        {
            var adr = await _shippingAddressService.GetById(id);
            if (adr == null)
            {
                return NotFound();
            }
            return Ok(adr);
        }
        [Authorize]
        [HttpGet("GetDefault")]
        public async Task<IActionResult> GetDefault()
        {
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
            var address = await _shippingAddressService.GetById((int)user.ShippingAddress);
            return Ok(address);
        }

        [Authorize]
        [HttpPut("ChangeDefaulAddress")]
        public async Task<IActionResult> UpdateDefault(int id)
        {
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
            
            var res = await _accountService.UpdateShip(user, id);
            return Ok(res);
        }
        [Authorize, HttpPut("UpdateAdress/{Id}")]
        public async Task<ActionResult> UpdateAdress(int Id,[FromBody] UpdateShipDTO updateShipDTO)
        {
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
            await _shippingAddressService.Update(Id, updateShipDTO);
            if (updateShipDTO.IsDefault)
            {
                await _accountService.UpdateShip(user, Id);
            }
            return NoContent();
        }
        [Authorize]
        [HttpPost("AddNewAddress")]
        public async Task<ActionResult<ShippingAddress>> AddAddress(ShippingAddressDTO shippingAddressDTO)
        {
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
            var address = new ShippingAddress
            {
                Id = 0,
                FullName = shippingAddressDTO.FullName,
                PhoneNumber = shippingAddressDTO.PhoneNumber,
                Address = shippingAddressDTO.Address,
                Type = shippingAddressDTO.Type,
                Email = shippingAddressDTO.Email,
                User = user
            };
            var res = await _shippingAddressService.Add(address);
            return CreatedAtAction(nameof(GetById), new { Id = address.Id }, address);
        }
    }
}
