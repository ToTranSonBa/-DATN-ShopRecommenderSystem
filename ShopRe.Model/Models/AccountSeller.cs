using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Model.Models
{
    public class AccountSeller
    {
        public int? AccountID_NK { get; set; }
        public int? SellerID_NK { get; set; }
        public DateTime? CreatedAt { get; init; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}
