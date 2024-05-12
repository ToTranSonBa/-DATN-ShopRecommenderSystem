using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Model.Models
{
    [Table("Product")]
    public class Product
    {
        
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID_NK { get; set; }
        public int? ID_SK { get; set; }
        public string? Name { get; set; }
        public string? ShortDescription { get; set; } // Mô tả ngắn
        public string? Description { get; set; } // Mô tả
        public string? Image {  get; set; }
        public decimal? Price { get; set; } // Giá
        public decimal? ListPrice { get; set; } // Giá niêm yết
        public decimal? OriginalPrice { get; set; } // Giá gốc
        public double? RatingAverage { get; set; } // Đánh giá trung bình
        public int? RatingCount { get; set; } // Số lượng đánh giá
        public int? MaxSaleQuantity { get; set; } // Số lượng bán tối đa
        public int? MinSaleQuantity { get; set; } // Số lượng bán tối thiểu
        public int? Quantity { get; set; } // Số lượng tồn kho
        public int? AllTimeQuantitySold { get; set; } // Tổng số lượng đã bán từ khi bắt đầu
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; } 
        public int BrandID_NK { get; set; }
        public int Category_LV0_NK { get; set; }
        public int Category_LV1_NK { get; set; }
        public int Category_LV2_NK { get; set; }
        public int Category_LV3_NK { get; set; }
        public int Category_LV4_NK { get; set; }

        public int Category_LV5_NK { get; set; }

        public int Category_LV6_NK { get; set; }

        public int SellerID_NK { get; set; }
        public string? ShortUrl { get; set; }
    }
}
