using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class OptionAndValueDTO
    {
        public ProductOption? Option { get; set; }
        public List<ProductOptionValues> ProductOptionValues { get; set; } = new List<ProductOptionValues>();
    }
}
