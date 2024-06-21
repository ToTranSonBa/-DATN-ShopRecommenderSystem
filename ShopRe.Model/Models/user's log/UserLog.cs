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
        _YES = 1,
        _NO = 0
    }
}
