using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class OrderDTO
    {
        public int ID { get; set; }
        public decimal? TotalPrice { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public int Status { get; set; }
        public List<OrderItemsDTO> Items { get; set; } = new List<OrderItemsDTO>();
        public UserOrderDTO? User { get; set; }

    }
}
