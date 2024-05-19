using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Model.Models.user_s_log
{
    public class Log
    {
        public int Id { get; set; }
        public DateTime? DateTime { get; set; }
        public ApplicationUser? User { get; set; }
        public EventType? EventType { get; set; }
    }
}
