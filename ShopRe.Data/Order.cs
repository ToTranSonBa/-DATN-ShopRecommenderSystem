using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data
{
    [Table("Order")]
    public class Order
    {
        [Key]
        public int ID_NK { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ProductOptionPurchased { get; set; } // Tùy chọn sản phẩm đã mua
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? DeletedAt { get; set; } // Thời điểm đánh dấu đơn hàng đã bị xóa (nếu có)
        public DateTime? UpdatedAt { get; set; }
        public Account? Account { get; set; }
        public Ownership? Ownership { get; set; }


    }
}
