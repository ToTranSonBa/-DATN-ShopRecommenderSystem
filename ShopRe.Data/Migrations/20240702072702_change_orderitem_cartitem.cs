using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class change_orderitem_cartitem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {


            migrationBuilder.AddColumn<int>(
                name: "OptionValuesId2",
                table: "OrderItems",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OptionValuesId2",
                table: "CartItem",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OptionValuesId2",
                table: "OrderItems",
                column: "OptionValuesId2");

            migrationBuilder.CreateIndex(
                name: "IX_CartItem_OptionValuesId2",
                table: "CartItem",
                column: "OptionValuesId2");

            migrationBuilder.AddForeignKey(
                name: "FK_CartItem_ProductOptionValues_OptionValuesId2",
                table: "CartItem",
                column: "OptionValuesId2",
                principalTable: "ProductOptionValues",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_ProductOptionValues_OptionValuesId2",
                table: "OrderItems",
                column: "OptionValuesId2",
                principalTable: "ProductOptionValues",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItem_ProductOptionValues_OptionValuesId2",
                table: "CartItem");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_ProductOptionValues_OptionValuesId2",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_OptionValuesId2",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_CartItem_OptionValuesId2",
                table: "CartItem");

            

            migrationBuilder.DropColumn(
                name: "OptionValuesId2",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "OptionValuesId2",
                table: "CartItem");

            
        }
    }
}
