using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class changeorderitem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OptionValuesId",
                table: "OrderItems",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OptionValuesId",
                table: "OrderItems",
                column: "OptionValuesId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_ProductOptionValues_OptionValuesId",
                table: "OrderItems",
                column: "OptionValuesId",
                principalTable: "ProductOptionValues",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_ProductOptionValues_OptionValuesId",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_OptionValuesId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "OptionValuesId",
                table: "OrderItems");
        }
    }
}
