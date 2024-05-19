using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class addIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ACCOUNT_SELLER_PRIORITY_ACCOUNTID",
                table: "ACCOUNT_SELLER_PRIORITY",
                column: "ACCOUNTID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ACCOUNT_SELLER_PRIORITY_ACCOUNTID",
                table: "ACCOUNT_SELLER_PRIORITY");
        }
    }
}
