using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class mapSellerPriority : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ACCOUNT_SELLER_PRIORITY",
                columns: table => new
                {
                    ACCOUNTID = table.Column<int>(type: "int", nullable: false),
                    SELLERID = table.Column<int>(type: "int", nullable: false),
                    IDX = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ACCOUNT_SELLER_PRIORITY");
        }
    }
}
