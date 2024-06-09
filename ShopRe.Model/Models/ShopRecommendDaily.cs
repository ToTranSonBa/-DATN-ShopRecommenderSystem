using System.ComponentModel.DataAnnotations;

namespace ShopRe.Model.Models
{
    public class ShopRecommendDaily
    {
        [Key]
        public Guid Id { get; set; }
        public Seller? Seller { get; set; }
    }
}
