using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data
{
    public class DetailComment
    {
        [Key]
        public int ID_NK { get; set; } // Chuỗi định danh
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime? Created { get; set; } = DateTime.Now; 
        public string? Image { get; set; } // Đối tượng hình ảnh
        public bool? Is_True { get; set; } // Giá trị boolean
        public DateTime? CreatedTime { get; set; } // Thời điểm tạo
        public int? Rating { get; set; } // Điểm đánh giá
        public string? Content { get; set; } // Nội dung
        public string? TimelineContent { get; set; } 
        public DateTime? Delete_at { get; set; } 
        public DateTime Update_at { get; set; }
        public Order? Order { get; set; }
        public Ownership? Ownership { get; set; }
    }
}
