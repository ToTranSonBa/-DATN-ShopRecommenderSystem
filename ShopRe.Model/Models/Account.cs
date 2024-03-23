using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Model.Models
{
    public class Account
    {
        [Key]
        public int ID_NK { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? CustomerID { get; set; }
        public string? FullName { get; set; }
        public string? Username { get; set; }
        public string? Avatar { get; set; }
        public DateTime? JoinedTime { get; set; }
        public int? TotalReview { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}
