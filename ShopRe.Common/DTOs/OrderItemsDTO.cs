using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class OrderItemsDTO
    {
        public int Id { get; set; }
        public int? Quantity { get; set; }
        public decimal? Price { get; set; }
        public string? Image {  get; set; }
        public ProductDTO Product { get; set; } 
        public ProductOptionValuesDTO OptionValues { get; set; }
    }
}
