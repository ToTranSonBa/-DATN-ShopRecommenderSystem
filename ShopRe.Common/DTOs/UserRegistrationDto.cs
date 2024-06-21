using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public record UserRegistrationDto
    {
        public ICollection<string>? Roles { get; init; }
        [Required, EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
        [Required]
        public string FirstName { get; set; } = null!;
        [Required]
        public string LastName { get; set; } = null!;
        [Required]
        public string Address { get; set; } = null!;
        [Required]
        public string PhoneNumber { get; set; } = null!;
        public string UserName { get; set; } = null!;
    }
    public enum RegisterUserStatus
    {
        SUCCESS,
        USEREXIST,
        ROLEERROR,
        FAILED
    }
}
