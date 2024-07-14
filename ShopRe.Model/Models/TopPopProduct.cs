using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Model.Models
{
    public class TopPopProduct
    {
        [Key]
        public int Id { get; set; }

        public int ProductID_NK { get; set; }
        public Product Product { get; set; }
        public DateTime CreatedAt { get; set; } = System.DateTime.Now;
    }
}
