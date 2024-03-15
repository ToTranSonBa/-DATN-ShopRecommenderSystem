﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ShopRe.Data;

#nullable disable

namespace ShopRe.Data.Migrations
{
    [DbContext(typeof(ShopRecommenderSystemContext))]
    [Migration("20240315135029_ShopRe")]
    partial class ShopRe
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.28")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("CategoryProduct", b =>
                {
                    b.Property<Guid>("CategoriesID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("ProductsID_NK")
                        .HasColumnType("int");

                    b.HasKey("CategoriesID", "ProductsID_NK");

                    b.HasIndex("ProductsID_NK");

                    b.ToTable("CategoryProduct");
                });

            modelBuilder.Entity("ShopRe.Data.Account", b =>
                {
                    b.Property<int>("ID_NK")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID_NK"), 1L, 1);

                    b.Property<string>("Avatar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("CustomerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("JoinedTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("TotalReview")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID_NK");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("ShopRe.Data.Brand", b =>
                {
                    b.Property<int>("ID_NK")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID_NK"), 1L, 1);

                    b.Property<DateTime?>("Create_at")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("Delete_at")
                        .HasColumnType("datetime2");

                    b.Property<string>("ID_SK")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Slug")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Update_at")
                        .HasColumnType("datetime2");

                    b.HasKey("ID_NK");

                    b.ToTable("Brands");
                });

            modelBuilder.Entity("ShopRe.Data.Category", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("ShopRe.Data.DetailComment", b =>
                {
                    b.Property<int>("ID_NK")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID_NK"), 1L, 1);

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Created")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("Delete_at")
                        .HasColumnType("datetime2");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("Is_True")
                        .HasColumnType("bit");

                    b.Property<int?>("OrderID_NK")
                        .HasColumnType("int");

                    b.Property<Guid?>("OwnershipID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("Rating")
                        .HasColumnType("int");

                    b.Property<string>("TimelineContent")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Update_at")
                        .HasColumnType("datetime2");

                    b.HasKey("ID_NK");

                    b.HasIndex("OrderID_NK");

                    b.HasIndex("OwnershipID");

                    b.ToTable("DetailComments");
                });

            modelBuilder.Entity("ShopRe.Data.Order", b =>
                {
                    b.Property<int>("ID_NK")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID_NK"), 1L, 1);

                    b.Property<int?>("AccountID_NK")
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("OwnershipID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ProductOptionPurchased")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("ID_NK");

                    b.HasIndex("AccountID_NK");

                    b.HasIndex("OwnershipID");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("ShopRe.Data.Ownership", b =>
                {
                    b.Property<Guid>("ID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("AllTimeQuantitySold")
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ID_NK")
                        .HasColumnType("int");

                    b.Property<decimal?>("ListPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("MaxSaleQuantity")
                        .HasColumnType("int");

                    b.Property<int?>("MinSaleQuantity")
                        .HasColumnType("int");

                    b.Property<decimal?>("OriginalPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal?>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.Property<double?>("RatingAverage")
                        .HasColumnType("float");

                    b.Property<int?>("RatingCount")
                        .HasColumnType("int");

                    b.Property<int>("SellerId")
                        .HasColumnType("int");

                    b.Property<string>("ShortDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("ID_NK")
                        .IsUnique();

                    b.ToTable("Ownerships");
                });

            modelBuilder.Entity("ShopRe.Data.Product", b =>
                {
                    b.Property<int>("ID_NK")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID_NK"), 1L, 1);

                    b.Property<int?>("BrandID_NK")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Create_at")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("Delete_at")
                        .HasColumnType("datetime2");

                    b.Property<string>("ID_SK")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ProductOptionID_NK")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Update_at")
                        .HasColumnType("datetime2");

                    b.HasKey("ID_NK");

                    b.HasIndex("BrandID_NK");

                    b.HasIndex("ProductOptionID_NK");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("ShopRe.Data.ProductOption", b =>
                {
                    b.Property<int>("ID_NK")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID_NK"), 1L, 1);

                    b.Property<string>("Code")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Create_at")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("Delete_at")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Position")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("ShowPreviewImage")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("Update_at")
                        .HasColumnType("datetime2");

                    b.Property<string>("Values")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID_NK");

                    b.ToTable("ProductOptions");
                });

            modelBuilder.Entity("ShopRe.Data.Seller", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double?>("AvgRatingPoint")
                        .HasColumnType("float");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsFollowed")
                        .HasColumnType("bit");

                    b.Property<bool>("IsOfficial")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ReviewCount")
                        .HasColumnType("int");

                    b.Property<int?>("StoreLevel")
                        .HasColumnType("int");

                    b.Property<int?>("TotalFollower")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.ToTable("Seller");
                });

            modelBuilder.Entity("CategoryProduct", b =>
                {
                    b.HasOne("ShopRe.Data.Category", null)
                        .WithMany()
                        .HasForeignKey("CategoriesID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ShopRe.Data.Product", null)
                        .WithMany()
                        .HasForeignKey("ProductsID_NK")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ShopRe.Data.DetailComment", b =>
                {
                    b.HasOne("ShopRe.Data.Order", "Order")
                        .WithMany()
                        .HasForeignKey("OrderID_NK");

                    b.HasOne("ShopRe.Data.Ownership", "Ownership")
                        .WithMany()
                        .HasForeignKey("OwnershipID");

                    b.Navigation("Order");

                    b.Navigation("Ownership");
                });

            modelBuilder.Entity("ShopRe.Data.Order", b =>
                {
                    b.HasOne("ShopRe.Data.Account", "Account")
                        .WithMany()
                        .HasForeignKey("AccountID_NK");

                    b.HasOne("ShopRe.Data.Ownership", "Ownership")
                        .WithMany()
                        .HasForeignKey("OwnershipID");

                    b.Navigation("Account");

                    b.Navigation("Ownership");
                });

            modelBuilder.Entity("ShopRe.Data.Ownership", b =>
                {
                    b.HasOne("ShopRe.Data.Seller", "Seller")
                        .WithOne()
                        .HasForeignKey("ShopRe.Data.Ownership", "ID")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("ShopRe.Data.Product", "Product")
                        .WithOne()
                        .HasForeignKey("ShopRe.Data.Ownership", "ID_NK")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("Seller");
                });

            modelBuilder.Entity("ShopRe.Data.Product", b =>
                {
                    b.HasOne("ShopRe.Data.Brand", "Brand")
                        .WithMany()
                        .HasForeignKey("BrandID_NK");

                    b.HasOne("ShopRe.Data.ProductOption", "ProductOption")
                        .WithMany()
                        .HasForeignKey("ProductOptionID_NK")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Brand");

                    b.Navigation("ProductOption");
                });
#pragma warning restore 612, 618
        }
    }
}
