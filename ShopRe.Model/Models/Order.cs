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
        public int Status { get; set; } // 0 Da Huy, 1 Cho xac nhanh, 2 Cho giao hang, 3 Cho lay hang, 4 Da giao.
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public decimal? TotalPrice { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? DeletedAt { get; set; } // Thời điểm đánh dấu đơn hàng đã bị xóa (nếu có)
        public DateTime? UpdatedAt { get; set; }
        public string? Email { get; set; }
        public string? Name { get; set; }
        public ApplicationUser? ApplicationUser { get; set; }
        public ShippingAddress? ShippingAddress { get; set; }

    }
}
