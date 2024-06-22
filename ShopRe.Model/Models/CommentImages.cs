using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Model.Models
{
    public class CommentImages
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }    
        public int DetailCommentID { get; set; }
        public DetailComment DetailComment { get; set; }
    }
}
