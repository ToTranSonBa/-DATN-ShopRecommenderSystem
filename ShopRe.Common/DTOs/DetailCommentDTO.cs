using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class DetailCommentDTO
    {
        public List<CommentDTO> DetailComment {  get; set; }=new List<CommentDTO>();
        public int? Total {  get; set; }
    }
}
