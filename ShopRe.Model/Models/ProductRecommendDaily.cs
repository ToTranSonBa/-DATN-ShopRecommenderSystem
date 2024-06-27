using System.ComponentModel.DataAnnotations;

namespace ShopRe.Model.Models
{
    public class ProductRecommendDaily
    {
        [Key]
        public Guid Id { get; set; }
        public int? ProductID_NK { get; set; }
        public Product? Product { get; set; }
    }
}
