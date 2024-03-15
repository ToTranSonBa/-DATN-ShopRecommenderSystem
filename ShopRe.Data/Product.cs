using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data
{
    [Table("Product")]
    public class Product
    {
        public Product()
        {
            this.Categories = new HashSet<Category>();
        }

        [Key]
        public int ID_NK { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? ID_SK { get; set; }
        public string? Name { get; set; }
        public DateTime? Create_at { get; set; } = DateTime.Now;
        public DateTime? Update_at { get; set; }
        public DateTime? Delete_at { get; set; }
        public ProductOption ProductOption { get; set; }
        public Brand? Brand { get; set; }

        public ICollection<Category> Categories{ get; set; }

        public ICollection<Seller> Sellers { get; set;}

    }
}
