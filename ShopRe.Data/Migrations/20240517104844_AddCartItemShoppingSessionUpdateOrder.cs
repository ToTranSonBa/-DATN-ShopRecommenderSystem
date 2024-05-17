using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class AddCartItemShoppingSessionUpdateOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Accounts_AccountID_NK",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_Product_ProductID_NK",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_Order_AccountID_NK",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_Order_ProductID_NK",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "AccountID_NK",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "ProductID_NK",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "ProductOptionPurchased",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "SellerID",
                table: "Order");

            migrationBuilder.AlterColumn<int>(
                name: "ID_SK",
                table: "Order",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Order",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPrice",
                table: "Order",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ShoppingSessions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingSessions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ShoppingSessions_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CartItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SessionID = table.Column<int>(type: "int", nullable: true),
                    ProductID_NK = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CartItem_Product_ProductID_NK",
                        column: x => x.ProductID_NK,
                        principalTable: "Product",
                        principalColumn: "ID_NK");
                    table.ForeignKey(
                        name: "FK_CartItem_ShoppingSessions_SessionID",
                        column: x => x.SessionID,
                        principalTable: "ShoppingSessions",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Order_ApplicationUserId",
                table: "Order",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItem_ProductID_NK",
                table: "CartItem",
                column: "ProductID_NK");

            migrationBuilder.CreateIndex(
                name: "IX_CartItem_SessionID",
                table: "CartItem",
                column: "SessionID");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingSessions_UserId",
                table: "ShoppingSessions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_AspNetUsers_ApplicationUserId",
                table: "Order",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_AspNetUsers_ApplicationUserId",
                table: "Order");

            migrationBuilder.DropTable(
                name: "CartItem");

            migrationBuilder.DropTable(
                name: "ShoppingSessions");

            migrationBuilder.DropIndex(
                name: "IX_Order_ApplicationUserId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "Order");

            migrationBuilder.AlterColumn<int>(
                name: "ID_SK",
                table: "Order",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AccountID_NK",
                table: "Order",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductID_NK",
                table: "Order",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ProductOptionPurchased",
                table: "Order",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SellerID",
                table: "Order",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Order_AccountID_NK",
                table: "Order",
                column: "AccountID_NK");

            migrationBuilder.CreateIndex(
                name: "IX_Order_ProductID_NK",
                table: "Order",
                column: "ProductID_NK");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Accounts_AccountID_NK",
                table: "Order",
                column: "AccountID_NK",
                principalTable: "Accounts",
                principalColumn: "ID_NK",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Product_ProductID_NK",
                table: "Order",
                column: "ProductID_NK",
                principalTable: "Product",
                principalColumn: "ID_NK",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
