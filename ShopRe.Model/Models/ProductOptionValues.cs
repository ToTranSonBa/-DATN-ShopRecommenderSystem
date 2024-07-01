using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopRe.Model.Models
{
    [Table(name: "ProductOptionValues")]
    public class ProductOptionValues
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }
        public string Name { get; set; }
        public ProductOption Option { get; set; }
        public string? ImageUrl { get; set; }
    }
}
