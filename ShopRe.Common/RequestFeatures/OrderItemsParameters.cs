using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.RequestFeatures
{
    public class OrderItemsParameters
    {
        public int idOrder { get; set; }
        public int idProduct { get; set; }
        public string Image { get; set; }
        public int? idOptionValues { get; set; }
        public int Quantity { get; set; }
    }
}
