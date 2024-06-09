namespace ShopRe.Model.Models.user_s_log
{
    public class UserLog
    {
        public Guid Id { get; set; }
        public DateTime DateTime { get; init; } = DateTime.Now;
        public string? Detail { get; set; }
        public LogRate LogRate { get; set; }
        public int? SellerId { get; set; }
        public Seller? Seller { get; set; }
        public Product? Product { get; set; }
        public ApplicationUser? User { get; set; }
    }

    public enum LogRate
    {
        _1MIN = 1,
        _5MIN = 2,
        _15MIN = 3,
        _LONGER_15_MIN = 4,
        ADCART = 5
    }
}
