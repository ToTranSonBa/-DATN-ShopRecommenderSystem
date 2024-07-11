using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class CartItemsDTO
    {
        public int Id { get; set; }
        public int? Quantity { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public ShoppingSession? Session { get; set; }
        public Product? Product { get; set; }
        public int? OptionValuesId { get; set; }
        public ProductOptionValues? OptionValues { get; set; }
        public string? productImgs { get; set; }
        public int? SellerId { get; set; }
        public string? SellerName { get; set; }
        public int? OptionValuesId2 { get; set; }
        public ProductOptionValues? optionValues2 { get; set; }
    }
}
