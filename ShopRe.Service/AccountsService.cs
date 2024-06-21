using ShopRe.Model.Models;
using System.Linq.Expressions;
using ShopRe.Data.Infrastructure;
using ShopRe.Data.Repositories;
using ShopRe.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using ShopRe.Model.Authentication;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AutoMapper;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;
using Microsoft.Extensions.Configuration;

namespace ShopRe.Service
{
    public interface IAccountService
    {
        public Task<IdentityResult> SignUpAsync(SignUpModel signUp);
        public Task<string> SignInAsync(SignInModel signIn);
        public Task<ApplicationUser> GetUserFromTokenAsync(string token);
        Task<UserDTO> GetUserInformation(ApplicationUser user);
        Task<ApplicationUser> UpdateShip(ApplicationUser user, int id);
        Task<UserDTO> UpdateInformation(UserInformationParameters userInfo, ApplicationUser user);
        Task<int> ChangePassword(ChangePasswordParameters changePasswordParams, ApplicationUser user);
        Task<RegisterUserStatus> RegisterAsync(UserRegistrationDto userForRegistration);
        public Task<string> GenerateRefreshToken();
    }
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ShopRecommenderSystemDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ShopRecommenderSystemDbContext _context;

        public AccountService(ShopRecommenderSystemDbContext context, IAccountRepository accountRepository, UserManager<ApplicationUser> userManager,
            ShopRecommenderSystemDbContext dbContext, RoleManager<IdentityRole> roleManager, IMapper mapper)
        {
            _context = context;
            _accountRepository = accountRepository;
            this._userManager = userManager;
            this._roleManager = roleManager;
            _dbContext = dbContext;
            _mapper= mapper;
        }
        public Task<string> SignInAsync(SignInModel signIn)
        {


            //throw new NotImplementedException();
            return _accountRepository.SignInAsync(signIn);
        }

        public Task<IdentityResult> SignUpAsync(SignUpModel signUp)
        {
            //throw new NotImplementedException();
            return _accountRepository.SignUpAsync(signUp);
        }
        public async Task<ApplicationUser> GetUserFromTokenAsync(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var decodedToken = handler.ReadJwtToken(token);

            var userEmailClaim = decodedToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
            if (userEmailClaim == null)
            {
                return await Task.FromResult<ApplicationUser>(null);
            }

            var userEmail = userEmailClaim.Value;
            return await _userManager.FindByEmailAsync(userEmail);
        }
        public async Task<UserDTO> GetUserInformation(ApplicationUser user)
        {
            var userFromDb = await _userManager.FindByIdAsync(user.Id);
            var accountDTO = _mapper.Map<UserDTO>(userFromDb);
            return accountDTO;
        }

        public async Task<UserDTO> UpdateInformation(UserInformationParameters userInfo, ApplicationUser user)
        {
            var userFromDb = await _userManager.FindByIdAsync(user.Id);

            if (userFromDb == null)
            {
                throw new Exception("User not found");
            }

            userFromDb.PhoneNumber = userInfo.PhoneNumber;
            userFromDb.UserName = userInfo.Email;
            userFromDb.Email = userInfo.Email;
            userFromDb.Address = userInfo.Address;
            userFromDb.FirstName = userInfo.FirstName;
            userFromDb.LastName = userInfo.LastName;

            if (userInfo.Avatar == null)
            {
                userFromDb.Avatar = "No image yet";
            }
            else
            {
                userFromDb.Avatar = userInfo.Avatar;
            }

            var updateResult = await _userManager.UpdateAsync(userFromDb);
            if (!updateResult.Succeeded)
            {
                throw new Exception("Failed to update user: " + string.Join(", ", updateResult.Errors.Select(e => e.Description)));
            }

            await _dbContext.SaveChangesAsync();

            var accountDTO = _mapper.Map<UserDTO>(userFromDb);

            return accountDTO;
        }

        public async Task<int> ChangePassword(ChangePasswordParameters changePasswordParams, ApplicationUser user)
        {
            var userFromDb = await _userManager.FindByIdAsync(user.Id);

            if (userFromDb == null)
            {
                return 1; //User không tồn tại
            }

            var passwordCheck = await _userManager.CheckPasswordAsync(userFromDb, changePasswordParams.PasswordOld);
            if (!passwordCheck)
            {
                return 2; //Password sai
            }

            if (changePasswordParams.PasswordNew != changePasswordParams.PasswordNewConfirm)
            {
                return 3; //Xác nhận mật khẩu không chính xác
            }

            var result = await _userManager.ChangePasswordAsync(userFromDb, changePasswordParams.PasswordOld, changePasswordParams.PasswordNew);
            if (!result.Succeeded)
            {
                return 4; //Đổi mật khẩu thất bại
            }

            return 0; //Đổi mật khẩu thành công
        }

        public async Task<ApplicationUser> UpdateShip(ApplicationUser user, int id)
        {
            return await _accountRepository.Update(user, id);
        }

        public async Task<string> GenerateRefreshToken()
        {
            return  _accountRepository.GenerateRefreshToken();
        }
        public async Task<RegisterUserStatus> RegisterAsync(UserRegistrationDto userForRegistration)
        {
            var userRegister = _mapper.Map<ApplicationUser>(userForRegistration);
            userRegister.Avatar = "No Avatar yet !";

            //Check user exits
            var userExist = await _userManager.FindByEmailAsync(userRegister.Email);
            if (userExist != null)
            {
                return RegisterUserStatus.USEREXIST;
            }
            var listUserRoles = new List<string>();
            foreach (var role in userForRegistration.Roles)
            {
                var roleExist = await _roleManager.FindByNameAsync(role);
                if (roleExist != null)
                {
                    listUserRoles.Add(roleExist.Name);
                }
            }
            if (listUserRoles.Count > 0)
            {
                // Create user
                var result = await _userManager.CreateAsync(userRegister, userForRegistration.Password);
                if (!result.Succeeded)
                {
                    return RegisterUserStatus.FAILED;
                }

                // Add roles to user
                await _userManager.AddToRolesAsync(userRegister, listUserRoles);

                await _context.SaveChangesAsync();
                var shippingAddress = new ShippingAddress
                {
                    Address = userForRegistration.Address,
                    FullName = userForRegistration.FirstName + userForRegistration.LastName,
                    PhoneNumber = userForRegistration.PhoneNumber,
                    Type = "Văn phòng",
                    Email = userForRegistration.Email,
                    UserId = userRegister.Id
                };
                _context.ShippingAddresses.Add(shippingAddress);
                await _context.SaveChangesAsync();

                // Cập nhật defaultAddress của user với Id của địa chỉ giao hàng mới tạo
                userRegister.ShippingAddress = shippingAddress.Id;
                await _userManager.UpdateAsync(userRegister);

                return RegisterUserStatus.SUCCESS;
            }
            else
            {
                return RegisterUserStatus.ROLEERROR;
            }
        }
        //custommer
        /*public async Task<CustomerDto> CreateCustomerAsync(CustomerCreateDto CustomerDto)
        {

            var user = await _userManager.FindByEmailAsync(CustomerDto.Email);
            var existCustomer = await GetCustomerByEmail(CustomerDto.Email, true);
            if (existCustomer != null)
            {
                existCustomer.User = user;
                existCustomer.UserID = user.Id;
                await _dbContext.SaveChangesAsync();
                var customerReturn = _mapper.Map<CustomerDto>(existCustomer);
                return customerReturn;
            }
            var customer = _mapper.Map<Customer>(CustomerDto);
            var result = _repositoryManager.Customers.CreateCusomter(customer);
            customer.UserID = user.Id;
            customer.User = user;
            await _repositoryManager.SaveAsync();
            if (result)
            {
                var customerReturn = _mapper.Map<CustomerDto>(customer);
                return customerReturn;
            }
            else
            {
                return null;
            }
        }*/
        public async Task<CustomerDto> GetCustomerByEmail(string email)
        {
            var customer = await _accountRepository.GetCustomerByEmail(email, false);
            if (customer == null)
            {
                throw new Exception($"Email not found {email}");
            }
            var customerReturn = _mapper.Map<CustomerDto>(customer);
            return customerReturn;
        }
    }
}
