using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopRe.Model.Models
{
    public class ProductChild
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }
        public int Id_sk { get; set; }
        public string? Name { get; set; }
        public string? thumbnail_url { get; set; }
        public int Price { get; set; }
        public ProductOptionValues? optionValues { get; set; }
        public Product? Product { get; set; }
    }
}
