using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class ShopRe : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    ID_NK = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Avatar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JoinedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TotalReview = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.ID_NK);
                });

            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    ID_NK = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ID_SK = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Slug = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Create_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Update_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Delete_at = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.ID_NK);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ProductOptions",
                columns: table => new
                {
                    ID_NK = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Position = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShowPreviewImage = table.Column<bool>(type: "bit", nullable: true),
                    Values = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Create_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Update_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Delete_at = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductOptions", x => x.ID_NK);
                });

            migrationBuilder.CreateTable(
                name: "Seller",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsOfficial = table.Column<bool>(type: "bit", nullable: false),
                    IsFollowed = table.Column<bool>(type: "bit", nullable: false),
                    StoreLevel = table.Column<int>(type: "int", nullable: true),
                    AvgRatingPoint = table.Column<double>(type: "float", nullable: true),
                    TotalFollower = table.Column<int>(type: "int", nullable: true),
                    ReviewCount = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seller", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    ID_NK = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ID_SK = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Create_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Update_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Delete_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProductOptionID_NK = table.Column<int>(type: "int", nullable: false),
                    BrandID_NK = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.ID_NK);
                    table.ForeignKey(
                        name: "FK_Product_Brands_BrandID_NK",
                        column: x => x.BrandID_NK,
                        principalTable: "Brands",
                        principalColumn: "ID_NK");
                    table.ForeignKey(
                        name: "FK_Product_ProductOptions_ProductOptionID_NK",
                        column: x => x.ProductOptionID_NK,
                        principalTable: "ProductOptions",
                        principalColumn: "ID_NK",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CategoryProduct",
                columns: table => new
                {
                    CategoriesID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductsID_NK = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryProduct", x => new { x.CategoriesID, x.ProductsID_NK });
                    table.ForeignKey(
                        name: "FK_CategoryProduct_Category_CategoriesID",
                        column: x => x.CategoriesID,
                        principalTable: "Category",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryProduct_Product_ProductsID_NK",
                        column: x => x.ProductsID_NK,
                        principalTable: "Product",
                        principalColumn: "ID_NK",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ownerships",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ShortDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ListPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    OriginalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    RatingAverage = table.Column<double>(type: "float", nullable: true),
                    RatingCount = table.Column<int>(type: "int", nullable: true),
                    MaxSaleQuantity = table.Column<int>(type: "int", nullable: true),
                    MinSaleQuantity = table.Column<int>(type: "int", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: true),
                    AllTimeQuantitySold = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SellerId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ID_NK = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ownerships", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Ownerships_Product_ID_NK",
                        column: x => x.ID_NK,
                        principalTable: "Product",
                        principalColumn: "ID_NK");
                    table.ForeignKey(
                        name: "FK_Ownerships_Seller_ID",
                        column: x => x.ID,
                        principalTable: "Seller",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    ID_NK = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductOptionPurchased = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AccountID_NK = table.Column<int>(type: "int", nullable: true),
                    OwnershipID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.ID_NK);
                    table.ForeignKey(
                        name: "FK_Order_Accounts_AccountID_NK",
                        column: x => x.AccountID_NK,
                        principalTable: "Accounts",
                        principalColumn: "ID_NK");
                    table.ForeignKey(
                        name: "FK_Order_Ownerships_OwnershipID",
                        column: x => x.OwnershipID,
                        principalTable: "Ownerships",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "DetailComments",
                columns: table => new
                {
                    ID_NK = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Is_True = table.Column<bool>(type: "bit", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Rating = table.Column<int>(type: "int", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TimelineContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Delete_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Update_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OrderID_NK = table.Column<int>(type: "int", nullable: true),
                    OwnershipID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailComments", x => x.ID_NK);
                    table.ForeignKey(
                        name: "FK_DetailComments_Order_OrderID_NK",
                        column: x => x.OrderID_NK,
                        principalTable: "Order",
                        principalColumn: "ID_NK");
                    table.ForeignKey(
                        name: "FK_DetailComments_Ownerships_OwnershipID",
                        column: x => x.OwnershipID,
                        principalTable: "Ownerships",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryProduct_ProductsID_NK",
                table: "CategoryProduct",
                column: "ProductsID_NK");

            migrationBuilder.CreateIndex(
                name: "IX_DetailComments_OrderID_NK",
                table: "DetailComments",
                column: "OrderID_NK");

            migrationBuilder.CreateIndex(
                name: "IX_DetailComments_OwnershipID",
                table: "DetailComments",
                column: "OwnershipID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_AccountID_NK",
                table: "Order",
                column: "AccountID_NK");

            migrationBuilder.CreateIndex(
                name: "IX_Order_OwnershipID",
                table: "Order",
                column: "OwnershipID");

            migrationBuilder.CreateIndex(
                name: "IX_Ownerships_ID_NK",
                table: "Ownerships",
                column: "ID_NK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_BrandID_NK",
                table: "Product",
                column: "BrandID_NK");

            migrationBuilder.CreateIndex(
                name: "IX_Product_ProductOptionID_NK",
                table: "Product",
                column: "ProductOptionID_NK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryProduct");

            migrationBuilder.DropTable(
                name: "DetailComments");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Ownerships");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Seller");

            migrationBuilder.DropTable(
                name: "Brands");

            migrationBuilder.DropTable(
                name: "ProductOptions");
        }
    }
}
