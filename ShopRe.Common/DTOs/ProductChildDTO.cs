using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class ProductChildDTO
    {
        public int Id { get; set; }
        public int Id_sk { get; set; }
        public string? Name { get; set; }
        public string? option1 { get; set; }
        public string? option2 { get; set; }
        public string? option3 { get; set; }
        public string? option4 { get; set; }
        public string? thumbnail_url { get; set; }
        public int? Price { get; set; }
    }
}
