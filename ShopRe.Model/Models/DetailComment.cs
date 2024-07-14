using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Model.Models
{
    public class DetailComment
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public int ID_SK { get; set; }
        public int AccountID { get; set; } //customer id
        public int SellerID { get; set; }
        public int ProductID { get; set; }
        public string? Image { get; set; } // Đối tượng hình ảnh
        public bool? Is_True { get; set; } // Giá trị boolean
        public int? Rating { get; set; } // Điểm đánh giá
        public string? Content { get; set; } // Nội dung
        public string? TimelineContent { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public int? OrderID { get; set; }
        public Order? Order { get; set; }
        public Account? Account { get; set; }
        public List<CommentImages>? Images { get; set; }
        public float? CreditRating { get; set; }
        public bool? IsCredited { get; set; }
    }
}
