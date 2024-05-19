using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Model.Models
{
    public class SellerPriority
    {
        [Key]
        public int AccID { get; set; }
        [Key]
        public int SellerID { get; set; }
        public int Idx { get; set; }
    }
}
