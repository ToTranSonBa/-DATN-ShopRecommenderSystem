using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class CommentDTO
    {
        public int ID { get; set; }
        public int ID_SK { get; set; }
        public int AccountID { get; set; } //customer id
        public int SellerID { get; set; }
        public int ProductID { get; set; }
        public List<string> Image { get; set; } = new List<string>();
        public int? Rating { get; set; } // Điểm đánh giá
        public string? Content { get; set; } // Nội dung
        public string? TimelineContent { get; set; }
        public DateTime? CreatedAt { get; set; } 
        public AccountDTO Account { get; set; }
    }
}
