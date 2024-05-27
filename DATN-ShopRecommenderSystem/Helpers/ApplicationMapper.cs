using AutoMapper;
using ShopRe.Common.DTOs;
using ShopRe.Model;
using ShopRe.Model.Models;

namespace DATN_ShopRecommenderSystem.Helpers
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<Brand, BrandDTO>().ReverseMap();
            CreateMap<Seller, SellerDTO>().ReverseMap();
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<Images, ImageDTO>().ReverseMap();
            CreateMap<ProductChild, ProductChildDTO>().ReverseMap();
        }
    }
}
