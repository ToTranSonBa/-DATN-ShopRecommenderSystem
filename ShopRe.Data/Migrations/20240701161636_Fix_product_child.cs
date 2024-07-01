using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class Fix_product_child : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "ProductOptionValues",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OptionValuesID1",
                table: "ProductChild",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OptionValuesID2",
                table: "ProductChild",
                type: "int",
                nullable: true);

            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "ProductOptionValues");

            migrationBuilder.DropColumn(
                name: "OptionValuesID1",
                table: "ProductChild");

            migrationBuilder.DropColumn(
                name: "OptionValuesID2",
                table: "ProductChild");

           
        }
    }
}
