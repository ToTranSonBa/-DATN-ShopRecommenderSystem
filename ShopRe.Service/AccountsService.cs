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
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Cryptography;


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
        Task<RegisterSellerStatus> RegisterSeller(SellerRegistrationDTO sellerRegistrationDTO);
        Task<(LoginStatus status, LoginRespone Token)> LoginAsync(SignInModel userLoginDto);

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
            ShopRecommenderSystemDbContext dbContext, RoleManager<IdentityRole> roleManager, IMapper mapper,IConfiguration configuration)
        {
            _context = context;
            _accountRepository = accountRepository;
            this._userManager = userManager;
            this._roleManager = roleManager;
            _dbContext = dbContext;
            _mapper= mapper;
            _configuration = configuration;
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
                var accountRegister = new Account
                {
                    FullName = $"{userForRegistration.FirstName} {userForRegistration.LastName}",
                    Username = userForRegistration.UserName,
                    Avatar = "No Avatar yet !",
                    TotalReview = 0,
                    UserID = userRegister.TrainCode
                };
                if (accountRegister == null)
                {
                    return RegisterUserStatus.FAILED;
                }
                await _context.Accounts.AddAsync(accountRegister);
                await _context.SaveChangesAsync();

                return RegisterUserStatus.SUCCESS;
            }
            else
            {
                return RegisterUserStatus.ROLEERROR;
            }
        }
        public async Task<RegisterSellerStatus> RegisterSeller(SellerRegistrationDTO sellerRegistrationDTO)
        {
            if (sellerRegistrationDTO == null)
                return RegisterSellerStatus.FAILED;
            var sellerExitst = await _context.Sellers.Where(s => s.ApplicationUserId == sellerRegistrationDTO.user.Id).ToListAsync();
            if(sellerExitst.Count > 0) 
                return RegisterSellerStatus.SELLEREXIST;
            await _userManager.AddToRoleAsync(sellerRegistrationDTO.user,"Seller");
            await _context.SaveChangesAsync();
            var seller = new Seller
            {
                Name = sellerRegistrationDTO.StoreName,
                Phone = sellerRegistrationDTO.Phone,
                Address = sellerRegistrationDTO.Address,
                ImageUrl = sellerRegistrationDTO.ImageUrl,
                ApplicationUser = sellerRegistrationDTO.user
            };
            var addingSeller = await _context.Sellers.AddAsync(seller);
            await _context.SaveChangesAsync();
            if (addingSeller == null)
                return RegisterSellerStatus.FAILED_TO_ADD_SELLER;
            return RegisterSellerStatus.SUCCESS;

        }

        public async Task<(LoginStatus status, LoginRespone Token)> LoginAsync(SignInModel userLoginDto)
        {
            var resultUsername = await _userManager.FindByEmailAsync(userLoginDto.Email);
            if (resultUsername != null)
            {
                var result = await _userManager.CheckPasswordAsync(resultUsername, userLoginDto.Password);
                if (!result)
                {
                    return (LoginStatus.INCORRECTPASSWORD, new LoginRespone());
                }
                /*var checkConfirmEmail = await _userManager.IsEmailConfirmedAsync(resultUsername);
                if (!checkConfirmEmail)
                {
                    return (LoginStatus.EMAILNOTCONFIRMED, new LoginRespone());
                }*/

                var refreshToken = await GenerateRefreshToken();
                resultUsername.RefreshToken = refreshToken;
                resultUsername.RefreshTokenExpiry = DateTime.Now.AddDays(1);
                await _userManager.UpdateAsync(resultUsername);

                var accessToken = await GenerateJWTToken(userLoginDto.Email);
                var role = await _userManager.GetRolesAsync(resultUsername);

                var response = new LoginRespone
                {
                    AccessToken = accessToken.token,
                    RefreshToken = refreshToken,
                    ValidTo = accessToken.ValidTo,
                    Role = role.ToList()
                };
                return (LoginStatus.SUCCESS, response);
            }
            else
            {
                return (LoginStatus.USERNOTEXIST, new LoginRespone());
            }
        }

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

        public async Task<(string token, DateTime ValidTo)> GenerateJWTToken(string Email)
        {
            var resultUser = await _userManager.FindByEmailAsync(Email);
            if (resultUser == null)
            {
                return new(string.Empty, DateTime.Now);
            }
            var role = await _userManager.GetRolesAsync(resultUser);
            if (role.Count == 0)
            {
                var customerRole = await _roleManager.GetRoleNameAsync(new IdentityRole
                {
                    Name = "Customer",
                    NormalizedName = "CUSTOMER"
                });
                await _userManager.AddToRoleAsync(resultUser, customerRole);
                role = await _userManager.GetRolesAsync(resultUser);
            }
            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, role.First())

                };

            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var token = new JwtSecurityToken
            (
                audience: _configuration["JWT:ValidAudience"],
                issuer: _configuration["JWT:ValidIssuer"],
                expires: DateTime.UtcNow.AddDays(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha256Signature)
            );
            return new(new JwtSecurityTokenHandler().WriteToken(token), token.ValidTo);
        }
    }
}
