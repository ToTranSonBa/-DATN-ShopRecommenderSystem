using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class constraint_accountapplicationuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Accounts");

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "Accounts",
                type: "int",
                nullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_AspNetUsers_TrainCode",
                table: "AspNetUsers",
                column: "TrainCode");

           

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_UserID",
                table: "Accounts",
                column: "UserID",
                unique: true,
                filter: "[UserID] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_AspNetUsers_UserID",
                table: "Accounts",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "TrainCode");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_AspNetUsers_UserID",
                table: "Accounts");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_AspNetUsers_TrainCode",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_UserID",
                table: "Accounts");

           

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Accounts");
        }
    }
}
