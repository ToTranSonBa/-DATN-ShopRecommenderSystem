using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Model.Models
{
    [Table("Order")]
    public class Order
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public int? ID_SK { get; set; }
        public decimal? TotalPrice { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? DeletedAt { get; set; } // Thời điểm đánh dấu đơn hàng đã bị xóa (nếu có)
        public DateTime? UpdatedAt { get; set; }
        public ApplicationUser? ApplicationUser { get; set; }

    }
}
