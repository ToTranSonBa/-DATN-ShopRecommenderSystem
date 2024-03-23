using Microsoft.EntityFrameworkCore;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data
{
    public class ShopRecommenderSystemDbContext:DbContext
    {
        public ShopRecommenderSystemDbContext(DbContextOptions<ShopRecommenderSystemDbContext> options) : base(options) { }


        #region DbSet
        public DbSet<Product>? Products { get; set; }
        public DbSet<Order>? Order { get; set; }
        public DbSet<Category>? Category { get; set; }
        public DbSet<Account>? Accounts { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<DetailComment> DetailComments { get; set; }
        public DbSet<Ownership> Ownerships { get; set; }
        public DbSet<Seller> Sellers { get; set; }
        public DbSet<ProductOption> ProductOptions { get; set; }
        #endregion 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasMany(x => x.Sellers)
                .WithMany(x => x.Products)
                .UsingEntity<Ownership>();

            //Defines the actual relationships for the middle table
            modelBuilder.Entity<Ownership>()
                .HasOne(x => x.Seller)
                .WithOne()
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Ownership>()
                .HasOne(x => x.Product)
                .WithOne()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
