using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class addRecommendDaily : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SelCates");

            migrationBuilder.AddColumn<int>(
                name: "ProductID_NK",
                table: "UserLog",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "productRecommendDailies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductID_NK = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productRecommendDailies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_productRecommendDailies_Product_ProductID_NK",
                        column: x => x.ProductID_NK,
                        principalTable: "Product",
                        principalColumn: "ID_NK");
                });

            migrationBuilder.CreateTable(
                name: "shopRecommendDailies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SellerID_NK = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_shopRecommendDailies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_shopRecommendDailies_Seller_SellerID_NK",
                        column: x => x.SellerID_NK,
                        principalTable: "Seller",
                        principalColumn: "ID_NK");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserLog_ProductID_NK",
                table: "UserLog",
                column: "ProductID_NK");

            migrationBuilder.CreateIndex(
                name: "IX_productRecommendDailies_ProductID_NK",
                table: "productRecommendDailies",
                column: "ProductID_NK");

            migrationBuilder.CreateIndex(
                name: "IX_shopRecommendDailies_SellerID_NK",
                table: "shopRecommendDailies",
                column: "SellerID_NK");

            migrationBuilder.AddForeignKey(
                name: "FK_UserLog_Product_ProductID_NK",
                table: "UserLog",
                column: "ProductID_NK",
                principalTable: "Product",
                principalColumn: "ID_NK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLog_Product_ProductID_NK",
                table: "UserLog");

            migrationBuilder.DropTable(
                name: "productRecommendDailies");

            migrationBuilder.DropTable(
                name: "shopRecommendDailies");

            migrationBuilder.DropIndex(
                name: "IX_UserLog_ProductID_NK",
                table: "UserLog");

            migrationBuilder.DropColumn(
                name: "ProductID_NK",
                table: "UserLog");

            migrationBuilder.CreateTable(
                name: "SelCates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SellerID_NK = table.Column<int>(type: "int", nullable: true),
                    CateLv0 = table.Column<int>(type: "int", nullable: false),
                    CateLv1 = table.Column<int>(type: "int", nullable: false),
                    CateLv2 = table.Column<int>(type: "int", nullable: false),
                    CateLv3 = table.Column<int>(type: "int", nullable: false),
                    CateLv4 = table.Column<int>(type: "int", nullable: false),
                    CateLv5 = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SelCates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SelCates_Seller_SellerID_NK",
                        column: x => x.SellerID_NK,
                        principalTable: "Seller",
                        principalColumn: "ID_NK");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SelCates_SellerID_NK",
                table: "SelCates",
                column: "SellerID_NK");
        }
    }
}
