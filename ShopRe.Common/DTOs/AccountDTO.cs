using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class AccountDTO
    {
        public int ID_NK { get; set; }
        public int ID_SK { get; set; }
        public string? CustomerID { get; set; }
        public string? FullName { get; set; }
        public string? Username { get; set; }
        public string? Avatar { get; set; }
        public int? TotalReview { get; set; }
    }
}
