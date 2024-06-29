using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.RequestFeatures
{
    public class OptionValue
    {
        public string Value { get; set; }
        public string Image { get; set; }
    }
    public class CreateOptionParameters
    {
        public int IdProduct { get; set; }
        public string Name { get; set; }
        public int OptionNumber { get; set; }
        public List<OptionValue> Values { get; set; } = new List<OptionValue>();
    }
}
