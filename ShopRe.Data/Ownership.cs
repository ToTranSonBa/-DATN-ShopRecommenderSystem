using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data
{
    public class Ownership
    {
        public string? ShortDescription { get; set; } // Mô tả ngắn
        public string? Description { get; set; } // Mô tả
        public decimal? Price { get; set; } // Giá
        public decimal? ListPrice { get; set; } // Giá niêm yết
        public decimal? OriginalPrice { get; set; } // Giá gốc
        public double? RatingAverage { get; set; } // Đánh giá trung bình
        public int? RatingCount { get; set; } // Số lượng đánh giá
        public int? MaxSaleQuantity { get; set; } // Số lượng bán tối đa
        public int? MinSaleQuantity { get; set; } // Số lượng bán tối thiểu
        public int? Quantity { get; set; } // Số lượng tồn kho
        public int? AllTimeQuantitySold { get; set; } // Tổng số lượng đã bán từ khi bắt đầu
        public DateTime? CreatedAt { get; set; } = DateTime.Now; // Thời gian tạo
        public DateTime? DeletedAt { get; set; } // Thời gian xóa (nếu có)
        public DateTime? UpdatedAt { get; set; }

        public int SellerId { get; set; }
        [ForeignKey("ID")]
        public Seller Seller { get; set; }


        public int ProductId { get; set; }
        [ForeignKey("ID_NK")]
        public Product Product { get; set; }

    }
}
