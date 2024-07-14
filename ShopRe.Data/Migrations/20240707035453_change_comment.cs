using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class change_comment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "CreditRating",
                table: "DetailComments",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCredited",
                table: "DetailComments",
                type: "bit",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.DropColumn(
                name: "CreditRating",
                table: "DetailComments");

            migrationBuilder.DropColumn(
                name: "IsCredited",
                table: "DetailComments");

            
        }
    }
}
