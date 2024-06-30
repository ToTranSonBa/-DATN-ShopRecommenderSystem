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
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID_NK { get; set; }
        public int? ID_SK { get; set; }
        public string? Name { get; set; }
        public bool? IsOfficial { get; set; }
        public string? StoreLevel { get; set; }
        public double? AvgRatingPoint { get; set; }
        public int? TotalFollower { get; set; }
        public int? ReviewCount { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? ApplicationUserId { get; set; }
        public ApplicationUser? ApplicationUser { get; set; }
        public List<Account>? Accounts { get; set; }
        //public ICollection<Product>? Products { get; set; }
    }
}
