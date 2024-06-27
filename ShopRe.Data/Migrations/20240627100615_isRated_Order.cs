using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class isRated_Order : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          

            migrationBuilder.AddColumn<bool>(
                name: "IsRated",
                table: "Order",
                type: "bit",
                nullable: true);

        
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        

            migrationBuilder.DropColumn(
                name: "IsRated",
                table: "Order");


        }
    }
}
