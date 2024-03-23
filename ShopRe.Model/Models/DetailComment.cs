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
        [Key]
        public int ID_NK { get; set; } // Chuỗi định danh
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? Image { get; set; } // Đối tượng hình ảnh
        public bool? Is_True { get; set; } // Giá trị boolean
        public int? Rating { get; set; } // Điểm đánh giá
        public string? Content { get; set; } // Nội dung
        public string? TimelineContent { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public Order? Order { get; set; }
        public Ownership? Ownership { get; set; }
    }
}
