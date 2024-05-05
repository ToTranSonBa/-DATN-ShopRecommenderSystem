using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class ProductDto
    {
        public int ID_NK { get; set; }
        public string? Name { get; set; }
        public string? Image { get; set; }
        public decimal? Price { get; set; } // Giá
        public double? RatingAverage { get; set; } // Đánh giá trung bình
        public int? AllTimeQuantitySold { get; set; } // Tổng số lượng đã bán từ khi bắt đầu
        public string? ShortUrl { get; set; }
    }
}
