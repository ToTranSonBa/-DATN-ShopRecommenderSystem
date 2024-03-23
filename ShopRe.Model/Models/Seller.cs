using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopRe.Model.Models
{
    [Table("Seller")]
    public class Seller
    {
        [Key]
        public Guid ID { get; set; }
        public string? Name { get; set; }
        public bool IsOfficial { get; set; }
        public bool IsFollowed { get; set; }
        public int? StoreLevel { get; set; }
        public double? AvgRatingPoint { get; set; }
        public int? TotalFollower { get; set; }
        public int? ReviewCount { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public ICollection<Product>? Products { get; set; }
    }
}
