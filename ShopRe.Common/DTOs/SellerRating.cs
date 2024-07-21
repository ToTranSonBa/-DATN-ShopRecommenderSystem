using System.Text.Json.Serialization;

namespace ShopRe.Common.DTOs
{
    public class SellerRating
    {
        [JsonPropertyName("seller_id")]
        public int SellerId { get; set; }

        [JsonPropertyName("rating")]
        public double Rating { get; set; }
    }
}
