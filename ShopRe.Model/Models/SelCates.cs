using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopRe.Model.Models
{
    public class SelCates
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)] public int Id { get; set; }
        public int CateLv0 { get; set; }
        public int CateLv1 { get; set; }
        public int CateLv2 { get; set; }
        public int CateLv3 { get; set; }
        public int CateLv4 { get; set; }
        public int CateLv5 { get; set; }

        public Seller? Seller { get; set; }
    }
}
