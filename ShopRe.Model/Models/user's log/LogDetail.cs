using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopRe.Model.Models.user_s_log
{
    public class LogDetail
    {
        public int Id { get; set; }
        public string Detail { get; set; }
        public Log? Log { get; set; }
        public EventParameter? EventParameter { get; set; }
    }
}
