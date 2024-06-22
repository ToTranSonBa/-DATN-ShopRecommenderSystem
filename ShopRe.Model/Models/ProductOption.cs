namespace ShopRe.Model.Models
{
    public class ProductOption
    {
        public int ID { get; set; }
        public int ProductID { get; set; }
        public bool IsDeleted { get; set; }
        public int Quantity { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public Product? Product { get; set; }
    }
}
