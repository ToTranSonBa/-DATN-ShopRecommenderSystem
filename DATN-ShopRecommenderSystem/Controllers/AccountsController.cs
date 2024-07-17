using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nest;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data;
using ShopRe.Data.Infrastructure;
using ShopRe.Model;
using ShopRe.Model.Authentication;
using ShopRe.Model.Models;
using ShopRe.Service;
using System.Diagnostics.Contracts;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;

namespace DATN_ShopRecommenderSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly IAccountService _accountService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IShoppingSessionService _shopSessionService;
        private readonly ISellerService _sellerService;
        private readonly IOrderService _orderService;
        private readonly ShopRecommenderSystemDbContext _context;
        public IUnitOfWork _unitOfWork;
        public AccountsController(ISellerService sellerService, IAccountService accountService
            , UserManager<ApplicationUser> userManager, IShoppingSessionService shopSessionService
            , IConfiguration configuration, IOrderService orderService
            , ShopRecommenderSystemDbContext context, IUnitOfWork unitOfWork)
        {
            _context = context;
            _accountService = accountService;
            _userManager = userManager;
            _shopSessionService = shopSessionService;
            _configuration = configuration;
            _sellerService = sellerService;
            _orderService = orderService;
            _unitOfWork = unitOfWork;
        }
        [HttpPost("SignUp")]
        public async Task<ActionResult> SignUp(SignUpModel signUp)
        {
            var result = await _accountService.SignUpAsync(signUp);
            if (result.Succeeded)
            {
                return Ok(result.Succeeded);
            }
            return Unauthorized(result.Errors);
        }
        [HttpPost("SignIn")]
        public async Task<ActionResult> SignIn(SignInModel signIn)
        {
            var token = await _accountService.SignInAsync(signIn);
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized();
            }
            var refreshToken = _accountService.GenerateRefreshToken();
            ApplicationUser user = await _accountService.GetUserFromTokenAsync(token);
            await _shopSessionService.CreateCart(user);

            var response = new Response<Account>("Login Successfully!", "200", null, token);
            return Ok(response);
        }
        [Authorize]
        [HttpGet("UserInformation")]
        public async Task<ActionResult> GetUserInformation()
        {
            // Lấy token từ header Authorization
            var authHeader = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return Unauthorized();
            }

            var token = authHeader.Substring("Bearer ".Length).Trim();

            var user = await _accountService.GetUserFromTokenAsync(token);
            if (user == null)
            {
                return Unauthorized();
            }

            var userDTO = await _accountService.GetUserInformation(user);


            return Ok(userDTO);
        }
        [Authorize]
        [HttpPut("UpdateInformation")]
        public async Task<ActionResult> UpdateInformation([FromQuery] UserInformationParameters userInfo)
        {
            try
            {
                // Lấy token từ header Authorization
                var authHeader = Request.Headers["Authorization"].ToString();
                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    return Unauthorized();
                }

                var token = authHeader.Substring("Bearer ".Length).Trim();

                var user = await _accountService.GetUserFromTokenAsync(token);
                if (user == null)
                {
                    return Unauthorized();
                }

                var userDTO = await _accountService.UpdateInformation(userInfo, user);


                return Ok(userDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<object>
                {
                    message = $"Internal server error: {ex.Message}",
                    status = "500",
                    token = null,
                    Data = null
                });
            }
        }
        [Authorize]
        [HttpPut("UpdatePassword")]
        public async Task<IActionResult> ChangePassword([FromQuery] ChangePasswordParameters changePasswordParams)
        {
            try
            {
                // Lấy token từ header Authorization
                var authHeader = Request.Headers["Authorization"].ToString();
                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    return Unauthorized();
                }

                var token = authHeader.Substring("Bearer ".Length).Trim();

                var user = await _accountService.GetUserFromTokenAsync(token);
                if (user == null)
                {
                    return Unauthorized();
                }

                int result = await _accountService.ChangePassword(changePasswordParams, user);

                if (result != 4)
                {
                    return Ok(new { message = "Call Api success", token = token, status = "204", Data = result });
                }
                else
                {
                    return BadRequest(new { message = "Failed to change password", token = token, status = "400" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPost("Register/Customer")]
        public async Task<IActionResult> RegisterCustomer([FromBody] CustomerCreateDto customerCreateDto)
        {
            List<String> roles = new List<String>();
            roles.Add("Customer");
            if (customerCreateDto == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                    "Invalid user!");
            }
            else
            {
                var userForRegistrationDto = new UserRegistrationDto
                {
                    Email = customerCreateDto.Email,
                    PhoneNumber = customerCreateDto.PhoneNumber,
                    Password = customerCreateDto.Password,
                    FirstName = customerCreateDto.FirstName,
                    LastName = customerCreateDto.LastName,
                    Roles = roles,
                    UserName = customerCreateDto.Email,
                    Address = customerCreateDto.Address
                };
                var result = await _accountService.RegisterAsync(userForRegistrationDto);
                if ((int)result == ((int)RegisterUserStatus.FAILED))
                {
                    return StatusCode(StatusCodes.Status400BadRequest,
                        "User failed to create");
                }
                if ((int)result == ((int)RegisterUserStatus.ROLEERROR))
                {
                    return StatusCode(StatusCodes.Status400BadRequest,
                         "Roles not exist");
                }
                if ((int)result == ((int)RegisterUserStatus.USEREXIST))
                {
                    return StatusCode(StatusCodes.Status400BadRequest,
                       "User already exist");
                }

                // Send email comfirm
                /*var token = await _service.AuthenticationService.GenerateEmailConfirmationTokeAsync(userForRegistrationDto.Email ?? throw new Exception("Invalid Mail"));
                var confirmLink = _configuration["ApplicationUrl:Url"] + Url.Action(nameof(ComfirmEmail), new { token, email = userForRegistrationDto.Email });
                var message = new EmailMessage(new string[] { userForRegistrationDto.Email }, "Confirm email link", ConfirmEmailMessage.Message(userForRegistrationDto.Email, confirmLink)!);
                _service.EmailService.SendEmail(message);
*/
                return StatusCode(StatusCodes.Status201Created, "User created successfully");
            }
        }
        [HttpPost("RegisterSeller")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> RegisterSeller(SellerRegistInfo seller)
        {
            var userEmail = HttpContext.User.Claims.ElementAt(0).Value;
            var userCurrent = await _userManager.FindByEmailAsync(userEmail);
            if (userCurrent == null)
            {
                return Unauthorized();
            }
            var dto = new SellerRegistrationDTO
            {
                StoreName = seller.StoreName,
                Phone = seller.Phone,
                Address = seller.Address,
                ImageUrl = seller.ImageUrl,
                user = userCurrent,
                totalFollower = 0
            };
            var result = await _accountService.RegisterSeller(dto, userEmail);
            return StatusCode(StatusCodes.Status200OK, new LoginRespone
            {
                AccessToken = result.Token.AccessToken,
                RefreshToken = result.Token.RefreshToken,
                ValidTo = result.Token.ValidTo,
                Role = result.Token.Role,
            });
        }
        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> LoginUser([FromBody] SignInModel userLogin)
        {
            var result = await _accountService.LoginAsync(userLogin);
            switch ((int)result.status)
            {
                case (int)LoginStatus.USERNOTEXIST:
                    return StatusCode(StatusCodes.Status401Unauthorized, "User Not Exist");
                case (int)LoginStatus.INCORRECTPASSWORD:
                    return StatusCode(StatusCodes.Status401Unauthorized, "Incorreted Password");

                default:
                    return StatusCode(StatusCodes.Status200OK,
                        new LoginRespone
                        {
                            AccessToken = result.Token.AccessToken,
                            RefreshToken = result.Token.RefreshToken,
                            ValidTo = result.Token.ValidTo,
                            Role = result.Token.Role,
                        });
            }
        }
        [HttpGet("GetUserSeller")]
        [Authorize(Roles = "Seller")]
        public async Task<IActionResult> GetUserSeller()
        {
            if (HttpContext.User != null)
            {
                var userEmail = HttpContext.User.Claims.ElementAt(0).Value;
                var user = await _userManager.FindByEmailAsync(userEmail);

                var seller = await _sellerService.GetUserSerller(user.Id);
                if (seller == null)
                    return StatusCode(StatusCodes.Status400BadRequest, "Error getting seller");
                return Ok(seller);
            }
            else
                return Unauthorized();
        }
        [HttpPut("UpdateUserSeller")]
        [Authorize(Roles = "Seller")]
        public async Task<IActionResult> UpdateUserSeller(ChangeUserSeller seller)
        {
            if (HttpContext.User != null)
            {
                var userEmail = HttpContext.User.Claims.ElementAt(0).Value;
                var user = await _userManager.FindByEmailAsync(userEmail);

                var result = await _sellerService.UpdateUserSeller(seller, user.Id);
                return Ok(result);
            }
            else
            {
                return Unauthorized();
            }
        }
        [HttpGet("Seller/GetListOrder")]
        [Authorize(Roles = "Seller")]
        public async Task<IActionResult> GetListOrder([FromQuery] OrdersParameters ordersParameters)
        {
            if (HttpContext.User != null)
            {
                var userEmail = HttpContext.User.Claims.ElementAt(0).Value;
                var user = await _userManager.FindByEmailAsync(userEmail);

                var (total, result) = await _orderService.GetOrdersOfSeller(ordersParameters, user);
                var response = new
                {
                    TotalCount = total,
                    OrderList = result
                };
                return Ok(response);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet("Seller/GetListOrderByStatus{status}")]
        [Authorize(Roles = "Seller")]
        public async Task<IActionResult> GetListOrderByStatus(int status, [FromQuery] OrdersParameters ordersParameters)
        {
            if (HttpContext.User != null)
            {
                var userEmail = HttpContext.User.Claims.ElementAt(0).Value;
                var user = await _userManager.FindByEmailAsync(userEmail);

                var (total, result) = await _orderService.GetOrdersByStatusOfSeller(status, ordersParameters, user);
                var response = new
                {
                    TotalCount = total,
                    OrderList = result
                };
                return Ok(response);
            }
            else
            {
                return Unauthorized();
            }
        }
        [HttpPost("Customer/Shop/Follow")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> Follow(int shopid)
        {
            if (HttpContext.User != null)
            {
                var userEmail = HttpContext.User.Claims.ElementAt(0).Value;
                var user = await _userManager.FindByEmailAsync(userEmail);
                var accId = await _context.Accounts
                    .Where(a => a.UserID == user.TrainCode).Select(s => s.ID_NK).FirstOrDefaultAsync();
                var seller = await _unitOfWork.Sellers.GetById(shopid);
                var followExist = await _context.AccountSeller.FindAsync(accId, shopid);
                if(followExist == null)
                {
                    var follow = new AccountSeller
                    {
                        SellerID_NK = shopid,
                        AccountID_NK = accId,
                        CreatedAt = DateTime.Now,
                        DeletedAt = null
                    };

                    try
                    {
                        var res = await _context.Set<AccountSeller>().AddAsync(follow);
                        seller.TotalFollower = seller.TotalFollower + 1;
                        await _unitOfWork.Sellers.UpdateUofW(seller);
                        return Ok(res.Entity);
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(500, ex);
                    }
                }
                else
                {            
                    return StatusCode(StatusCodes.Status200OK, "Bạn đã theo dõi từ trước");
                }
            }
            else
            {
                return Unauthorized();
            }
        }
        [HttpDelete("Customer/Shop/Unfollow")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> UnFollow(int shopid)
        {
            var userEmail = HttpContext.User.Claims.ElementAt(0).Value;
            var user = await _userManager.FindByEmailAsync(userEmail);
            var accId = await _context.Accounts
                .Where(a => a.UserID == user.TrainCode).Select(s => s.ID_NK).FirstOrDefaultAsync();
            var follow = await _context.AccountSeller.FindAsync(accId, shopid);
            var seller = await _context.Sellers.FindAsync(shopid);
            var res = _context.Set<AccountSeller>().Remove(follow);
            await _context.SaveChangesAsync();
            if(res == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            seller.TotalFollower = seller.TotalFollower - 1;
            await _unitOfWork.Sellers.UpdateUofW(seller);
            return Ok(res.Entity);
        }
        /*--------------------------Dashboard----------------------*/
        [HttpGet("Seller/InfoStatus")]
        [Authorize(Roles = "Seller")]
        public async Task<IActionResult> GetInfoStatus()
        {
            var firstDayOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            // Lấy ngày cuối cùng của tháng hiện tại
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
            var userEmail = HttpContext.User.Claims.ElementAt(0).Value;
            var user = await _userManager.FindByEmailAsync(userEmail);
            var seller = await _context.Sellers
                .Where(s => s.ApplicationUserId == user.Id)
                .FirstOrDefaultAsync(); 
            var sellerID = seller.ID_NK;
            var totalpro = await _context.Products.CountAsync(p => p.SellerID_NK == sellerID);
            var listOrder = await _context.Order.Where(s => s.SellerID_NK == sellerID && (s.CreatedAt >= firstDayOfMonth && s.CreatedAt <= lastDayOfMonth)).ToListAsync();
            var totalOrder = listOrder.Count();
            decimal? interest = 0;
            foreach (var order in listOrder)
            {
                interest = order.TotalPrice + interest;
            }
            var totalFollow = seller.TotalFollower;
            return Ok(new { totalpro, totalOrder, interest, totalFollow });

        }
        [HttpGet("Seller/OrderDashboard")]
        [Authorize(Roles = "Seller")]
        public async Task<IActionResult> OrderDashboard()
        {
            var userEmail = HttpContext.User.Claims.ElementAt(0).Value;
            var user = await _userManager.FindByEmailAsync(userEmail);
            var seller = await _context.Sellers
                .Where(s => s.ApplicationUserId == user.Id)
                .FirstOrDefaultAsync();
            int currentYear = DateTime.Now.Year;
            // Lấy dữ liệu đơn hàng theo tháng từ cơ sở dữ liệu
            var ordersData = await _context.Order
                .Where(o => o.CreatedAt.Value.Year == currentYear && o.SellerID_NK==seller.ID_NK)
                .GroupBy(o => new { o.CreatedAt.Value.Year, o.CreatedAt.Value.Month })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    OrderCount = g.Count()
                })
                .ToListAsync();

            // Tạo danh sách đủ 12 tháng với OrderCount = 0
            var monthlyOrders = Enumerable.Range(1, 12)
                .Select(month => new MonthlyOrder
                {
                    Year = currentYear,
                    Month = month,
                    OrderCount=0
                })
                .ToList();

            // Kết hợp dữ liệu từ cơ sở dữ liệu với danh sách đủ 12 tháng
            foreach (var orderData in ordersData)
            {
                var monthOrder = monthlyOrders.FirstOrDefault(mo => mo.Month == orderData.Month);
                if (monthOrder != null)
                {
                    monthOrder.OrderCount = orderData.OrderCount;
                    //monthOrder.Orders = orderData.Orders;
                }
            }

            return Ok(monthlyOrders);
        }
        [HttpGet("Seller/OrderColumnGraph")]
        [Authorize(Roles = "Seller")]
        public async Task<IActionResult> OrderColumnGraph()
        {
            var userEmail = HttpContext.User.Claims.ElementAt(0).Value;
            var user = await _userManager.FindByEmailAsync(userEmail);
            var seller = await _context.Sellers
                .Where(s => s.ApplicationUserId == user.Id)
                .FirstOrDefaultAsync();
            var currentWeek = DateTime.Now.DayOfWeek;
            //var lasWeek = DateTime.Now.DayOfWeek(-1);
            var today = DateTime.Now;

            // Xác định ngày đầu và ngày cuối của tuần hiện tại
            var startOfCurrentWeek = today.AddDays(-(int)today.DayOfWeek + (int)DayOfWeek.Monday);
            var endOfCurrentWeek = startOfCurrentWeek.AddDays(6);

            // Xác định ngày đầu và ngày cuối của tuần trước
            var startOfLastWeek = startOfCurrentWeek.AddDays(-7);
            var endOfLastWeek = startOfLastWeek.AddDays(6);

            // Ví dụ: Truy vấn dữ liệu cho tuần hiện tại và tuần trước (tùy thuộc vào yêu cầu)
            var currentWeekOrders = await _context.Order
                .Where(o => o.CreatedAt >= startOfCurrentWeek && o.CreatedAt <= endOfCurrentWeek && o.SellerID_NK == seller.ID_NK)
                .ToListAsync();

            var lastWeekOrders = await _context.Order
                .Where(o => o.CreatedAt >= startOfLastWeek && o.CreatedAt <= endOfLastWeek && o.SellerID_NK == seller.ID_NK)
                .ToListAsync();

            // Tạo dữ liệu cho biểu đồ (ví dụ: số lượng đơn hàng theo ngày trong tuần)
            var currentWeekData = Enumerable.Range(0, 7).Select(dayOffset =>
            {
                var date = startOfCurrentWeek.AddDays(dayOffset);
                var count = currentWeekOrders.Count(o => o.CreatedAt.Value.Date == date.Date);
                return new { Date = date, Count = count };
            }).ToList();

            var lastWeekData = Enumerable.Range(0, 7).Select(dayOffset =>
            {
                var date = startOfLastWeek.AddDays(dayOffset);
                var count = lastWeekOrders.Count(o => o.CreatedAt.Value.Date == date.Date);
                return new { Date = date, Count = count };
            }).ToList();

            // Trả về dữ liệu cho view (hoặc API response)
            return Ok((new { CurrentWeekData = currentWeekData, LastWeekData = lastWeekData }));
        }
        [HttpGet("Seller/IncomeDashboard")]
        //[Authorize(Roles = "Seller")]
        public async Task<IActionResult> IncomeDashboard(int idseller)
        {
            //var userEmail = HttpContext.User.Claims.ElementAt(0).Value;
            //var user = await _userManager.FindByEmailAsync(userEmail);
            //var seller = await _context.Sellers
            //    .Where(s => s.ApplicationUserId == user.Id)
            //    .FirstOrDefaultAsync();

            var seller = await _context.Sellers
                .Where(s => s.ID_NK == idseller)
                .FirstOrDefaultAsync();
            int currentYear = DateTime.Now.Year;
            // Lấy dữ liệu đơn hàng theo tháng từ cơ sở dữ liệu
            var ordersData = await _context.Order
                .Where(order => order.CreatedAt.HasValue && order.CreatedAt.Value.Year == currentYear)
                .GroupBy(order => order.CreatedAt.Value.Month)
                .Select(group => new
                {
                    Month = group.Key,
                    TotalPrice = group.Sum(order => order.TotalPrice ?? 0)
                })
                .ToListAsync();

            // Tạo danh sách đủ 12 tháng với OrderCount = 0
            var monthlyOrders = Enumerable.Range(1, 12)
                .Select(month => new MonthlyOrder
                {
                    Year = currentYear,
                    Month = month,
                    Total = 0m
                })
                .ToList();

            // Kết hợp dữ liệu từ cơ sở dữ liệu với danh sách đủ 12 tháng
            foreach (var orderData in ordersData)
            {
                var monthOrder = monthlyOrders.FirstOrDefault(mo => mo.Month == orderData.Month);
                if (monthOrder != null)
                {
                    monthOrder.Total = orderData.TotalPrice;
                    //monthOrder.Orders = orderData.Orders;
                }
            }

            return Ok(monthlyOrders);
        }
    }

} 