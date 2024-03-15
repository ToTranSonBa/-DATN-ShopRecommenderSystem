using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data
{
    public class Brand
    {
        [Key]
        public int ID_NK { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? ID_SK { get; set; }
        public string? Name { get; set; }
        public string? Slug { get; set; }
        public DateTime? Create_at { get; set; } = DateTime.Now;
        public DateTime? Update_at { get; set; }
        public DateTime? Delete_at { get; set; }
    }
}
