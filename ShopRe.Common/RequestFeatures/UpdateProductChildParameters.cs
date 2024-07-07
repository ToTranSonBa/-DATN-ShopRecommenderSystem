using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.RequestFeatures
{
    public class UpdateProductChildParameters
    {
        public int IdProduct { get; set; }
        public string? thumbnail_url { get; set; }
        public int Price { get; set; }
        public int? OptionValuesID1 { get; set; }
        public int? OptionValuesID2 { get; set; }
    }
}
