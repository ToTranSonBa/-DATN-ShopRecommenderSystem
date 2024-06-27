using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.RequestFeatures
{
    public class UpdateProductParameters
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public int Price { get; set; }
        public string ShortDescription { get; set; }
        public string Categories { get; set; }
        public string BrandId { get; set; }
        public int Quantity { get; set; }
        public List<string> Images { get; set; }
    }
}
