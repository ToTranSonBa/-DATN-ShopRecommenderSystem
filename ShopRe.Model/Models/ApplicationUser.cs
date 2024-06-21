using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopRe.Model.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Avatar { get; set; }
        public int? ShippingAddress { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TrainCode { get; set; }
        public DateTime? DayOfBirth { get; set; }
        public ICollection<ShippingAddress> ShippingAddresses { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiry { get; set; }

        public string GetFullName()
        {
            return $"{FirstName} {LastName}";
        }

        public string GetAddress()
        {
            return Address;
        }

        public void ChangeAvatar(string newAvatar)
        {
            Avatar = newAvatar;
        }
    }
}
