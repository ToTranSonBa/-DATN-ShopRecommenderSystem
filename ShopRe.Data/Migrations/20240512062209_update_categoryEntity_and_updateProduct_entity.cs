using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class update_categoryEntity_and_updateProduct_entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Category_LV4_NK",
                table: "Product",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Category_LV5_NK",
                table: "Product",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Category_LV6_NK",
                table: "Product",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ParentId3",
                table: "Category",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ParentId4",
                table: "Category",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ParentId5",
                table: "Category",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category_LV4_NK",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "Category_LV5_NK",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "Category_LV6_NK",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "ParentId3",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "ParentId4",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "ParentId5",
                table: "Category");
        }
    }
}
