using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopRe.Model.Models
{
    [Table(name: "Images")]
    public class Images
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Image { get; set; }
        public Product? Product { get; set; }
    }
}
