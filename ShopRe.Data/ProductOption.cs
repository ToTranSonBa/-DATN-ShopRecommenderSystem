using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data
{
    public class ProductOption
    {
        [Key]
        public int ID_NK { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? Code { get; set; }
        public string? Name { get; set; }
        public string? Position { get; set; }
        public bool? ShowPreviewImage { get; set; }
        public String? Values { get; set; } // Object chứa các giá trị, có thể là label hoặc một dạng dữ liệu khác
        public DateTime? Create_at { get; set; } = DateTime.Now;
        public DateTime? Update_at { get; set; }
        public DateTime? Delete_at { get; set; }
    }
}
