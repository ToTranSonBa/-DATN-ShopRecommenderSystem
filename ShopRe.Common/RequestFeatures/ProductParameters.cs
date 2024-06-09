using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.RequestFeatures
{
    public class ProductParameters : RequestFeatures
    {
        public string? ProductName { get; set; }
        public List<string> CategoryIds { get; set; } = new List<string>();
        public List<string> BrandIds { get; set; } = new List<string>();
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public int? MinReviewRating { get; set; }
    }
}
