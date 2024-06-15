﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ShopRe.Model.Models;
using ShopRe.Model.Models.user_s_log;

namespace ShopRe.Data
{
    public class ShopRecommenderSystemDbContext : IdentityDbContext<ApplicationUser>
    {
        public ShopRecommenderSystemDbContext(DbContextOptions<ShopRecommenderSystemDbContext> options) : base(options) { }


        #region DbSet
        public DbSet<Product>? Products { get; set; }
        public DbSet<Order>? Order { get; set; }
        public DbSet<OrderItems>? OrderItems { get; set; }
        public DbSet<Category>? Category { get; set; }
        public DbSet<Account>? Accounts { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<DetailComment> DetailComments { get; set; }
        public DbSet<Seller> Sellers { get; set; }
        public DbSet<ProductOption> ProductOptions { get; set; }
        public DbSet<CartItem>? CartItem { get; set; }
        public DbSet<ShoppingSession> ShoppingSessions { get; set; }
        public DbSet<SelCates> SelCates { get; set; }
        public DbSet<UserLog> UserLog { get; set; }
        public DbSet<SellerPriority> SellerPriority { get; set; }
        public DbSet<ProductOptionValues> ProductOptionValues { get; set; }
        public DbSet<ProductChild> ProductChild { get; set; }
        public DbSet<Images> Images { get; set; }
        public DbSet<ShippingAddress> ShippingAddresses { get; set; }
        public DbSet<ShopRecommendDaily> shopRecommendDailies { get; set; }
        public DbSet<ProductRecommendDaily> productRecommendDailies { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            _ = modelBuilder.Entity<SellerPriority>(s =>
            {
                s.ToTable("ACCOUNT_SELLER_PRIORITY");
                s.HasNoKey();
                s.Property(o => o.AccID).HasColumnName("ACCOUNTID");
                s.Property(o => o.SellerID).HasColumnName("SELLERID");
                s.Property(o => o.Idx).HasColumnName("IDX");
                s.HasIndex(s => s.AccID);
            });
            _ = modelBuilder.Entity<ProductOption>(s =>
            {
                s.HasKey(e => new { e.ID, e.ProductID });
                s.HasOne<Product>(e => e.Product)
                .WithMany(p => p.productOptions)
                .HasForeignKey(e => e.ProductID)
                ;
            });
            modelBuilder.Entity<ApplicationUser>().Property(u => u.TrainCode).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

        }

    }
}