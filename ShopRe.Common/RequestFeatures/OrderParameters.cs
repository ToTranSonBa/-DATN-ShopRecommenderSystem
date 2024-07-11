using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.RequestFeatures
{
    public class OrderParameters
    {
        public int idShippingAddress { get; set; }
        public decimal? TotalPrice { get; set; }
    }
}
