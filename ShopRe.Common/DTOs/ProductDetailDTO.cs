using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class ProductDetailDTO
    {
        public ProductDTO Product { get; set; }
        public List<ImageDTO> Images { get; set; }
        public SellerDTO Seller { get; set; }
        public BrandDTO Brand { get; set; }
        public CategoryDTO Category { get; set; }
        public List<ProductChildDTO> ProductChildren { get; set; }
    }
}
