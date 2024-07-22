using ShopRe.Model.Models;
using System.Dynamic;
using System.Reflection;

namespace ShopRe.Common.FunctionCommon
{
    public static class FunctionCommon
    {
        public static List<object> ConvertToProductCard(List<object> documents)
        {
            var products = new List<object>();
            foreach (dynamic document in documents)
            {
                var seller = new Seller
                {
                    ID_NK = document.ContainsKey("SellerID_NK") && document["SellerID_NK"] != null ? Convert.ToInt32(document["SellerID_NK"]) : 0,
                    Name = document.ContainsKey("SellerName") && document["SellerName"] != null ? document["SellerName"].ToString() : "",
                    IsOfficial = document.ContainsKey("IsOfficial") && document["IsOfficial"] != null ? Convert.ToBoolean(document["IsOfficial"]) : false,
                    StoreLevel = document.ContainsKey("StoreLevel") && document["StoreLevel"] != null ? document["StoreLevel"].ToString() : "",
                    AvgRatingPoint = document.ContainsKey("AvgRatingPoint") && document["AvgRatingPoint"] != null ? Convert.ToDouble(document["AvgRatingPoint"]) : 0,
                    TotalFollower = document.ContainsKey("TotalFollower") && document["TotalFollower"] != null ? Convert.ToInt32(document["TotalFollower"]) : 0,
                    ReviewCount = document.ContainsKey("ReviewCount") && document["ReviewCount"] != null ? Convert.ToInt32(document["ReviewCount"]) : 0,
                    ImageUrl = document.ContainsKey("ImageUrl") && document["ImageUrl"] != null ? document["ImageUrl"].ToString() : "",

                };
                var product = new
                {
                    ID_NK = document.ContainsKey("ID_NK") && document["ID_NK"] != null ? Convert.ToInt32(document["ID_NK"]) : 0,
                    ID_SK = document.ContainsKey("ID_SK") && document["ID_SK"] != null ? Convert.ToInt32(document["ID_SK"]) : (int?)null,
                    Name = document.ContainsKey("Name") && document["Name"] != null ? document["Name"].ToString() : "",
                    Description = document.ContainsKey("Description") && document["Description"] != null ? document["Description"].ToString() : "",
                    ShortDescription = document.ContainsKey("ShortDescription") && document["ShortDescription"] != null ? document["ShortDescription"].ToString() : "",
                    Image = document.ContainsKey("Image") && document["Image"] != null ? document["Image"].ToString() : "",
                    Price = document.ContainsKey("Price") && document["Price"] != null ? Convert.ToDecimal(document["Price"]) : 0,
                    ListPrice = document.ContainsKey("ListPrice") && document["ListPrice"] != null ? Convert.ToDecimal(document["ListPrice"]) : (decimal?)null,
                    OriginalPrice = document.ContainsKey("OriginalPrice") && document["OriginalPrice"] != null ? Convert.ToDecimal(document["OriginalPrice"]) : (decimal?)null,
                    RatingAverage = document.ContainsKey("RatingAverage") && document["RatingAverage"] != null ? Convert.ToDouble(document["RatingAverage"]) : (double?)null,
                    RatingCount = document.ContainsKey("RatingCount") && document["RatingCount"] != null ? Convert.ToInt32(document["RatingCount"]) : (int?)null,
                    MaxSaleQuantity = document.ContainsKey("MaxSaleQuantity") && document["MaxSaleQuantity"] != null ? Convert.ToInt32(document["MaxSaleQuantity"]) : (int?)null,
                    MinSaleQuantity = document.ContainsKey("MinSaleQuantity") && document["MinSaleQuantity"] != null ? Convert.ToInt32(document["MinSaleQuantity"]) : (int?)null,
                    Quantity = document.ContainsKey("Quantity") && document["Quantity"] != null ? Convert.ToInt32(document["Quantity"]) : 0,
                    AllTimeQuantitySold = document.ContainsKey("AllTimeQuantitySold") && document["AllTimeQuantitySold"] != null ? Convert.ToInt32(document["AllTimeQuantitySold"]) : (int?)null,
                    ShortUrl = document.ContainsKey("ShortUrl") && document["ShortUrl"] != null ? document["ShortUrl"].ToString() : "",
                    SellerID_NK = document.ContainsKey("SellerID_NK") && document["SellerID_NK"] != null ? Convert.ToInt32(document["SellerID_NK"]) : 0,
                    Seller = seller,
                    BrandID_NK = document.ContainsKey("BrandID_NK") && document["BrandID_NK"] != null ? Convert.ToInt32(document["BrandID_NK"]) : 0,
                    Category_LV0_NK = document.ContainsKey("Category_LV0_NK") && document["Category_LV0_NK"] != null ? Convert.ToInt32(document["Category_LV0_NK"]) : 0,
                    CreatedAt = document.ContainsKey("CreatedAt") && document["CreatedAt"] != null ? DateTime.Parse(document["CreatedAt"].ToString()) : DateTime.MinValue,
                    UpdatedAt = document.ContainsKey("UpdatedAt") && document["UpdatedAt"] != null ? DateTime.Parse(document["UpdatedAt"].ToString()) : (DateTime?)null,
                    DeletedAt = document.ContainsKey("DeletedAt") && document["DeletedAt"] != null ? DateTime.Parse(document["DeletedAt"].ToString()) : (DateTime?)null,
                    Category_LV1_NK = document.ContainsKey("Category_LV1_NK") && document["Category_LV1_NK"] != null ? Convert.ToInt32(document["Category_LV1_NK"]) : 0,
                    Category_LV2_NK = document.ContainsKey("Category_LV2_NK") && document["Category_LV2_NK"] != null ? Convert.ToInt32(document["Category_LV2_NK"]) : 0,
                    Category_LV3_NK = document.ContainsKey("Category_LV3_NK") && document["Category_LV3_NK"] != null ? Convert.ToInt32(document["Category_LV3_NK"]) : 0,
                    Category_LV4_NK = document.ContainsKey("Category_LV4_NK") && document["Category_LV4_NK"] != null ? Convert.ToInt32(document["Category_LV4_NK"]) : 0,
                    Category_LV5_NK = document.ContainsKey("Category_LV5_NK") && document["Category_LV5_NK"] != null ? Convert.ToInt32(document["Category_LV5_NK"]) : 0,
                    Category_LV6_NK = document.ContainsKey("Category_LV6_NK") && document["Category_LV6_NK"] != null ? Convert.ToInt32(document["Category_LV6_NK"]) : 0,
                    IsDeleted = document.ContainsKey("IsDeleted") && document["IsDeleted"] != null ? Convert.ToBoolean(document["IsDeleted"]) : false,

                };
                products.Add(product);
            }
            return products.ToList();
        }
        public static List<Product> ConvertToProduct(List<object> documents)
        {
            var products = new List<Product>();
            foreach (dynamic document in documents)
            {
                var seller = new Seller
                {
                    ID_NK = document.ContainsKey("SellerID_NK") && document["SellerID_NK"] != null ? Convert.ToInt32(document["SellerID_NK"]) : 0,
                    Name = document.ContainsKey("SellerName") && document["SellerName"] != null ? document["SellerName"].ToString() : "",
                    IsOfficial = document.ContainsKey("IsOfficial") && document["IsOfficial"] != null ? Convert.ToBoolean(document["IsOfficial"]) : false,
                    StoreLevel = document.ContainsKey("StoreLevel") && document["StoreLevel"] != null ? document["StoreLevel"].ToString() : "",
                    AvgRatingPoint = document.ContainsKey("AvgRatingPoint") && document["AvgRatingPoint"] != null ? Convert.ToDouble(document["AvgRatingPoint"]) : 0,
                    TotalFollower = document.ContainsKey("TotalFollower") && document["TotalFollower"] != null ? Convert.ToInt32(document["TotalFollower"]) : 0,
                    ReviewCount = document.ContainsKey("ReviewCount") && document["ReviewCount"] != null ? Convert.ToInt32(document["ReviewCount"]) : 0,
                    ImageUrl = document.ContainsKey("ImageUrl") && document["ImageUrl"] != null ? document["ImageUrl"].ToString() : "",

                };

                var product = new Product
                {
                    ID_NK = document.ContainsKey("ID_NK") ? Convert.ToInt32(document["ID_NK"]) : 0,
                    ID_SK = document.ContainsKey("ID_SK") ? Convert.ToInt32(document["ID_SK"]) : 0,
                    Name = document.ContainsKey("Name") ? document["Name"].ToString() : "",
                    Description = document.ContainsKey("Description") ? document["Description"].ToString() : "",
                    ShortDescription = document.ContainsKey("ShortDescription") ? document["ShortDescription"].ToString() : "",
                    Image = document.ContainsKey("Image") ? document["Image"].ToString() : "",
                    Price = document.ContainsKey("Price") ? Convert.ToDecimal(document["Price"]) : 0,
                    ListPrice = document.ContainsKey("ListPrice") ? Convert.ToDecimal(document["ListPrice"]) : 0,
                    OriginalPrice = document.ContainsKey("OriginalPrice") ? Convert.ToDecimal(document["OriginalPrice"]) : 0,
                    RatingAverage = document.ContainsKey("RatingAverage") ? Convert.ToDouble(document["RatingAverage"]) : 0,
                    RatingCount = document.ContainsKey("RatingCount") ? Convert.ToInt32(document["RatingCount"]) : 0,
                    MaxSaleQuantity = document.ContainsKey("MaxSaleQuantity") ? Convert.ToInt32(document["MaxSaleQuantity"]) : 0,
                    MinSaleQuantity = document.ContainsKey("MinSaleQuantity") ? Convert.ToInt32(document["MinSaleQuantity"]) : 0,
                    Quantity = document.ContainsKey("Quantity") ? Convert.ToInt32(document["Quantity"]) : 0,
                    AllTimeQuantitySold = document.ContainsKey("AllTimeQuantitySold") ? Convert.ToInt32(document["AllTimeQuantitySold"]) : 0,
                    ShortUrl = document.ContainsKey("ShortUrl") ? document["ShortUrl"].ToString() : "",
                    SellerID_NK = document.ContainsKey("SellerID_NK") ? Convert.ToInt32(document["SellerID_NK"]) : 0,
                    BrandID_NK = document.ContainsKey("BrandID_NK") ? Convert.ToInt32(document["BrandID_NK"]) : 0,
                    Category_LV0_NK = document.ContainsKey("Category_LV0_NK") ? Convert.ToInt32(document["Category_LV0_NK"]) : 0,
                    CreatedAt = DateTime.Parse(document.ContainsKey("CreatedAt") ? document["CreatedAt"].ToString() : ""),
                    Seller = seller
                };
                products.Add(product);
            }
            return products.ToList();
        }
        public static dynamic ConvertToDynamic(object obj)
        {
            IDictionary<string, object> expando = new ExpandoObject();

            foreach (PropertyInfo property in obj.GetType().GetProperties())
            {
                expando[property.Name] = property.GetValue(obj);
            }

            return expando as ExpandoObject;
        }
        public static List<dynamic> ConvertToDynamicList(List<Product> products)
        {
            List<dynamic> dynamicList = new List<dynamic>();

            foreach (var product in products)
            {
                dynamic dynamicProduct = ConvertToDynamic(product);
                dynamicList.Add(dynamicProduct);
            }

            return dynamicList;
        }
    }
}
