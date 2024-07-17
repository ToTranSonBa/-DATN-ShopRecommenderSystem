using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class MonthlyFollow
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int? TotalFollow { get; set; }
        public List<AccountSeller>? Follows { get; set; }
    }
}
