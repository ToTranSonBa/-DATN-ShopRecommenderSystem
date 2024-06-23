using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class LoginRespone
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public DateTime ValidTo { get; set; }
        public List<string>? Role { get; set; }
    }
}
