using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class CategoryDetailDTO
    {
        public Category Category { get; set; }
        public long? Total { get; set; }
    }
}
