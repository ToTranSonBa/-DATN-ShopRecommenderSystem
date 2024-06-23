using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class change_detailComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            

            migrationBuilder.CreateIndex(
                name: "IX_DetailComments_AccountID",
                table: "DetailComments",
                column: "AccountID");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailComments_Accounts_AccountID",
                table: "DetailComments",
                column: "AccountID",
                principalTable: "Accounts",
                principalColumn: "ID_NK",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetailComments_Accounts_AccountID",
                table: "DetailComments");

            migrationBuilder.DropIndex(
                name: "IX_DetailComments_AccountID",
                table: "DetailComments");

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
    }
}
