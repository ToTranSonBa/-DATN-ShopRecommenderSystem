using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopRe.Data;
using ShopRe.Model.Models;
using ShopRe.Service;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnershipsController : ControllerBase
    {
        readonly IOwnershipService _ownershipService;
        public OwnershipsController(IOwnershipService ownershipService)
        {
            _ownershipService = ownershipService;
        }
        // GET: api/ownerships
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ownership>>> GetProducts()
        {
            var res = await _ownershipService.GetAll();
            return Ok(res);
        }

        // GET: api/ownerships/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ownership>> GetOwnershipt(int id)
        {
            var res = await _ownershipService.GetById(id);
            return Ok(res);
        }

        // POST: api/ownerships
        [HttpPost]
        public async Task<ActionResult<Ownership>> PostProduct(Ownership ownership)
        {
            var res = await _ownershipService.Add(ownership);
            return Ok();
        }

        // DELETE: api/ownerships/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ownership>> DeleteOwnership(int id)
        {
            _ownershipService.Remove(id);
            return NoContent();
        }
        // PUT: api/ownerships/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOwnership(int id, Ownership ownership)
        {
            var res = await _ownershipService.Update(ownership);
            return NoContent();
        }

    }
}
