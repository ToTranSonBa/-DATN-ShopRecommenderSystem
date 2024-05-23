using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class ProductDto
    {
        public Product Product { get; set; }
        public List<Images> Images { get; set; }

    }
}
