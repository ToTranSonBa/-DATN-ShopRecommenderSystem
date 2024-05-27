using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class BrandDTO
    {
        public int ID_NK { get; set; }
        public int? ID_SK { get; set; }
        public string? Name { get; set; }
        public string? Slug { get; set; }
        public int TotalProduct { get; set; }
    }
}
