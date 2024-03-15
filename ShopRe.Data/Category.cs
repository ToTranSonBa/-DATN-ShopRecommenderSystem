using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data
{
    [Table("Category")]
    public class Category
    {
        public Category()
        {
            this.Products = new HashSet<Product>();
        }
        [Key]
        public Guid ID { get; set; }
        public string Name { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
