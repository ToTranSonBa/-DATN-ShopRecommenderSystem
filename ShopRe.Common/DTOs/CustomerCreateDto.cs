using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Common.DTOs
{
    public class CustomerCreateDto
    {
        [Required]
        public string? FirstName { get; init; }
        [Required]
        public string LastName { get; set; } = null!;
        [Required, MinLength(6, ErrorMessage = "Please enter at least 6 character!")]
        public string? Password { get; init; }
        [Required, EmailAddress(ErrorMessage = "Email is required")]
        public string? Email { get; init; }
        public ICollection<string>? Roles { get; init; }
        public string? PhoneNumber { get; init; }
        public string? Address { get; init; }
    }
}

