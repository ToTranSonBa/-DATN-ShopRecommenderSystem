using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class fixorder : Migration
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
               name: "OrderItems",
               columns: table => new
               {
                   Id = table.Column<int>(type: "int", nullable: false)
                       .Annotation("SqlServer:Identity", "1, 1"),
                   Quantity = table.Column<int>(type: "int", nullable: true),
                   Price = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                   ProductId = table.Column<int>(type: "int", nullable: true),
                   OrderId = table.Column<int>(type: "int", nullable: true),
               },
               constraints: table =>
               {
                   table.PrimaryKey("PK_OrderItems", x => x.Id);
                   table.ForeignKey(
                       name: "FK_OderItem_Product_ProductID",
                       column: x => x.ProductId,
                       principalTable: "Product",
                       principalColumn: "ID_NK");
                   table.ForeignKey(
                       name: "FK_OrderItem_Order_OrderId",
                       column: x=> x.OrderId,
                       principalTable: "Order",
                       principalColumn:"ID");
               });
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
                name: "FK_OderItem_Product_ProductID",
                table: "OrderItem");

            migrationBuilder.DropForeignKey(
                name: "FK_OderItem_Product_ProductID",
                table: "OrderItem");

            
            migrationBuilder.DropForeignKey(
                name: "FK_Order_AspNetUsers_ApplicationUserId",
                table: "Order");

            migrationBuilder.DropTable(
                name: "OrderItem");
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
