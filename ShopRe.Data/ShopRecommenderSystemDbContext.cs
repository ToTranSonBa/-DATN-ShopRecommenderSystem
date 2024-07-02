using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ShopRe.Data.ConfigurationRole;
using ShopRe.Model.Models;
using ShopRe.Model.Models.user_s_log;
using System.Numerics;
using System.Reflection.Metadata;

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
        public DbSet<CommentImages> CommentImages { get; set; }
        public DbSet<AccountSeller> AccountSeller { get; set; }
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
            _ = modelBuilder.Entity<CommentImages>(s =>
            {
                s.HasOne<DetailComment>(e => e.DetailComment)
                .WithMany(p => p.Images)
                .HasForeignKey(e => e.DetailCommentID)
                ;
            });
            //modelBuilder.Entity<ApplicationUser>()
            //    .HasOne(e => e.Account)
            //        .WithOne(e => e.User)
            //    .HasForeignKey<Account>(e => e.UserID)
            //    .IsRequired(false);

            modelBuilder.Entity<ApplicationUser>().Property(p => p.TrainCode)
            .UseIdentityColumn()
            .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Throw);

            modelBuilder.Entity<ApplicationUser>()
                .HasOne(e => e.Account)
                .WithOne(e => e.User)
                .HasPrincipalKey<ApplicationUser>(e => e.TrainCode)
                .IsRequired(false);

            //modelBuilder.Entity<Post>()
            //    .HasOne(p => p.Blog)
            //    .WithMany(b => b.Posts)
            //    .HasForeignKey(p => p.BlogUrl)
            //    .HasPrincipalKey(b => b.Url);
            modelBuilder.Entity<Account>()
            .HasMany(e => e.Sellers)
            .WithMany(e => e.Accounts)
            .UsingEntity<AccountSeller>();

            modelBuilder.Entity<CartItem>()
                .HasOne(e => e.optionValues2)
                .WithMany()
                .HasForeignKey(e => e.OptionValuesId2)
                .IsRequired(false);
            modelBuilder.Entity<OrderItems>()
                .HasOne(e => e.optionValues2)
                .WithMany()
                .HasForeignKey(e => e.OptionValuesId2)
                .IsRequired(false);


            //modelBuilder.Entity<ApplicationUser>().Property(u => u.TrainCode).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Throw);
            modelBuilder.ApplyConfiguration(new RoleConfig());

        }

    }
}
