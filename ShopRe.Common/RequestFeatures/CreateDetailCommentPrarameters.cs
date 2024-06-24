using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.RequestFeatures
{
    public class CreateDetailCommentPrarameters
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int SellerId { get; set; }
        public List<string> Images { get; set; } = new List<string>();
        public string? Content { get; set; }
        public int Rating { get; set; }
    }
}
