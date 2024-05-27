using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class BrandDetailDTO
    {
        public Brand? Brand { get; set; }
        public int? TotalProduct { get; set; }
    }
}
