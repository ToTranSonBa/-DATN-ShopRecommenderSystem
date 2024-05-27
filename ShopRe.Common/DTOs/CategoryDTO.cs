using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class CategoryDTO
    {
        public int ID_NK { get; set; }
        public int? ID_SK { get; set; }
        public string Name { get; set; }
        public string? Image { get; set; }
        public int ParentId0 { get; set; }
        public int ParentId1 { get; set; }
        public int ParentId2 { get; set; }
        public int ParentId3 { get; set; }
        public int ParentId4 { get; set; }
        public int ParentId5 { get; set; }
        public int Level { get; set; }
        public long Total { get; set; }

    }
}
