using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class CommentDto
    {
        public int ID { get; set; }
        public int AccountID { get; set; } //customer id
        public string userName { get; set; }
        public int SellerID { get; set; }
        public int ProductID { get; set; }
        public string? Image { get; set; } // Đối tượng hình ảnh
        public int? Rating { get; set; } // Điểm đánh giá
        public string? Content { get; set; } // Nội dung
        public DateTime? CreatedAt { get; set; }
    }
}
