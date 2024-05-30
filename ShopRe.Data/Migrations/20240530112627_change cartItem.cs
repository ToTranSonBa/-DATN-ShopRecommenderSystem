using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class changecartItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Order",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Order",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Order",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OptionValuesId",
                table: "CartItem",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SellerId",
                table: "CartItem",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SellerName",
                table: "CartItem",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "productImgs",
                table: "CartItem",
                type: "nvarchar(max)",
                nullable: true);

            /*migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ProductID_NK = table.Column<int>(type: "int", nullable: true),
                    OrderID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Order_OrderID",
                        column: x => x.OrderID,
                        principalTable: "Order",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_OrderItems_Product_ProductID_NK",
                        column: x => x.ProductID_NK,
                        principalTable: "Product",
                        principalColumn: "ID_NK");
                });*/

            migrationBuilder.CreateIndex(
                name: "IX_CartItem_OptionValuesId",
                table: "CartItem",
                column: "OptionValuesId");

           /* migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderID",
                table: "OrderItems",
                column: "OrderID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProductID_NK",
                table: "OrderItems",
                column: "ProductID_NK");*/

            migrationBuilder.AddForeignKey(
                name: "FK_CartItem_ProductOptionValues_OptionValuesId",
                table: "CartItem",
                column: "OptionValuesId",
                principalTable: "ProductOptionValues",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItem_ProductOptionValues_OptionValuesId",
                table: "CartItem");

           /* migrationBuilder.DropTable(
                name: "OrderItems");*/

            migrationBuilder.DropIndex(
                name: "IX_CartItem_OptionValuesId",
                table: "CartItem");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "OptionValuesId",
                table: "CartItem");

            migrationBuilder.DropColumn(
                name: "SellerId",
                table: "CartItem");

            migrationBuilder.DropColumn(
                name: "SellerName",
                table: "CartItem");

            migrationBuilder.DropColumn(
                name: "productImgs",
                table: "CartItem");
        }
    }
}
