using ShopRe.Model.Models;

namespace ShopRe.Common.DTOs
{
    public class ProductWithImages
    {
        public int ID_NK { get; set; }
        public string? Name { get; set; }
        public decimal? Price { get; set; } // Giá
        public double? RatingAverage { get; set; } // Đánh giá trung bình
        public int? RatingCount { get; set; } // Số lượng đánh giá
        public List<string>? Images { get; set; }
        public Seller? Seller { get; set; }
    }
}

