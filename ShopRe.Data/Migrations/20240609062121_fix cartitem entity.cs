using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class fixcartitementity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            /*migrationBuilder.DropPrimaryKey(
                name: "PK_SelCates",
                table: "SelCates");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "SelCates");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "SelCates",
                newName: "Id");

            migrationBuilder.AlterColumn<int>(
                name: "SellerID_NK",
                table: "SelCates",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");*/

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "OrderItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SellerID_NK",
                table: "Order",
                type: "int",
                nullable: true);

            /*migrationBuilder.AddPrimaryKey(
                name: "PK_SelCates",
                table: "SelCates",
                column: "Id");*/

            /*migrationBuilder.CreateIndex(
                name: "IX_SelCates_SellerID_NK",
                table: "SelCates",
                column: "SellerID_NK");*/

            migrationBuilder.CreateIndex(
                name: "IX_Order_SellerID_NK",
                table: "Order",
                column: "SellerID_NK");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Seller_SellerID_NK",
                table: "Order",
                column: "SellerID_NK",
                principalTable: "Seller",
                principalColumn: "ID_NK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Seller_SellerID_NK",
                table: "Order");

            /*migrationBuilder.DropPrimaryKey(
                name: "PK_SelCates",
                table: "SelCates");

            migrationBuilder.DropIndex(
                name: "IX_SelCates_SellerID_NK",
                table: "SelCates");*/

            migrationBuilder.DropIndex(
                name: "IX_Order_SellerID_NK",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "SellerID_NK",
                table: "Order");

            /*migrationBuilder.RenameColumn(
                name: "Id",
                table: "SelCates",
                newName: "ID");

            migrationBuilder.AlterColumn<int>(
                name: "SellerID_NK",
                table: "SelCates",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "SelCates",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SelCates",
                table: "SelCates",
                column: "Id");*/
        }
    }
}
