using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class SellerRegistrationDTO
    {
        public string StoreName { get; set; }  
        public ApplicationUser user { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string ImageUrl { get; set; }
    }
    public enum RegisterSellerStatus
    {
        SUCCESS,
        SELLEREXIST,
        ROLEERROR,
        FAILED,
        FAILED_TO_ADD_SELLER,
    }
}
