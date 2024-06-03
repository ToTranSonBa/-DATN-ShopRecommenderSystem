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
            CreateMap<ProductOption, ProductOptionDTO>().ReverseMap();
            CreateMap<ProductOptionValues, ProductOptionValuesDTO>().ReverseMap();
            CreateMap<Brand, BrandDTO>().ReverseMap();
            CreateMap<Seller, SellerDTO>().ReverseMap();
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<Images, ImageDTO>().ReverseMap();
            CreateMap<ProductChild, ProductChildDTO>().ReverseMap();
            CreateMap<DetailComment, CommentDTO>().ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<OrderItems, OrderItemsDTO>().ReverseMap();
            CreateMap<Account, AccountDTO>().ReverseMap();
            CreateMap<ApplicationUser, UserDTO>().ReverseMap();
            CreateMap<ApplicationUser, AccountDTO>().ReverseMap();
        }
    }
}
