using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Model.Models
{
    [Table("Category")]
    public class Category
    {
        
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID_NK { get; set; }
        public int? ID_SK { get; set; }
        public string Name { get; set; }
        public string? Image { get; set; }
        public int ParentId0 { get; set; }
        public int ParentId1 { get; set; }
        public int ParentId2 { get; set; }
        public int Level { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}
