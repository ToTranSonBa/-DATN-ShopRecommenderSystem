using ShopRe.Model.Models;
using ShopRe.Model.Models.user_s_log;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class UserLogDto
    {
        public string? Detail { get; set; }
        public LogRate LogRate { get; set; }
        public int? SellerId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
