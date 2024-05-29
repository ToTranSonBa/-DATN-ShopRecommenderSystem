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
        public int? ID_SK { get; set; }
        public decimal? TotalPrice { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
    }
}
