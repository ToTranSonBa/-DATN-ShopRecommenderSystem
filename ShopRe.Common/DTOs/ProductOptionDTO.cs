using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class ProductOptionDTO
    {
        public int ID { get; set; }
        public int ProductID { get; set; }

        public string? Name { get; set; }
        public string? Code { get; set; }
       
    }
}
