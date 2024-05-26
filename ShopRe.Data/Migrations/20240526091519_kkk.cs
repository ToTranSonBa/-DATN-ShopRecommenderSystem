using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class kkk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLog_Seller_SellerId",
                table: "UserLog");


            migrationBuilder.AlterColumn<int>(
                name: "SellerId",
                table: "UserLog",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_UserLog_Seller_SellerId",
                table: "UserLog",
                column: "SellerId",
                principalTable: "Seller",
                principalColumn: "ID_NK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLog_Seller_SellerId",
                table: "UserLog");

            migrationBuilder.AlterColumn<int>(
                name: "SellerId",
                table: "UserLog",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "temp",
                table: "Order",
                type: "int",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLog_Seller_SellerId",
                table: "UserLog",
                column: "SellerId",
                principalTable: "Seller",
                principalColumn: "ID_NK",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
