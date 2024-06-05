using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class ProductOptionValuesDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ProductOptionDTO Option { get; set; }
    }
}
