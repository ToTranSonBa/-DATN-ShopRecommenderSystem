using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class detail_commetn_addAccount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.AddColumn<int>(
                name: "AccountCommentId",
                table: "DetailComments",
                type: "int",
                nullable: true);

            

            migrationBuilder.CreateIndex(
                name: "IX_DetailComments_AccountCommentId",
                table: "DetailComments",
                column: "AccountCommentId");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailComments_Accounts_AccountCommentId",
                table: "DetailComments",
                column: "AccountCommentId",
                principalTable: "Accounts",
                principalColumn: "ID_NK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetailComments_Accounts_AccountCommentId",
                table: "DetailComments");

            migrationBuilder.DropIndex(
                name: "IX_DetailComments_AccountCommentId",
                table: "DetailComments");

            

            migrationBuilder.DropColumn(
                name: "AccountCommentId",
                table: "DetailComments");

            
        }
    }
}
