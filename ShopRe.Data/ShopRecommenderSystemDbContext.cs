using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShopRe.Model.Models;
using System;

namespace ShopRe.Data
{
    public class ShopRecommenderSystemDbContext : IdentityDbContext<ApplicationUser>
    {
        public ShopRecommenderSystemDbContext(DbContextOptions<ShopRecommenderSystemDbContext> options) : base(options) { }


        #region DbSet
        public DbSet<Product>? Products { get; set; }
        public DbSet<Order>? Order { get; set; }
        public DbSet<Category>? Category { get; set; }
        public DbSet<Account>? Accounts { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<DetailComment> DetailComments { get; set; }
        public DbSet<Seller> Sellers { get; set; }
        public DbSet<ProductOption> ProductOptions { get; set; }
        public DbSet<CartItem>? CartItem { get; set; }
        public DbSet<ShoppingSession> ShoppingSessions { get; set; }
        #endregion

    }
}
