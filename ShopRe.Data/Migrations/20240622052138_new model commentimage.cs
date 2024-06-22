using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class newmodelcommentimage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Seller_AspNetUsers_ApplicationUserId1",
                table: "Seller");

            migrationBuilder.DropIndex(
                name: "IX_Seller_ApplicationUserId1",
                table: "Seller");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5e3bfe99-119c-4d25-893d-69523e1d6414");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "60c2f6d0-fbae-487f-a6b7-8ea9415e8a27");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f1b9946f-1728-4c9d-b4f8-f60ee20f4f9d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fc2d6903-5835-4bc4-aed7-3c10925eca89");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId1",
                table: "Seller");

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "Seller",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "CommentImages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DetailCommentID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommentImages_DetailComments_DetailCommentID",
                        column: x => x.DetailCommentID,
                        principalTable: "DetailComments",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "06152ee5-2f91-4ea7-a94e-01033227abc5", "04994691-53dd-4663-9d2c-71632ba8c35c", "Customer", "CUSTOMER" },
                    { "7fb07894-fde3-4e33-bb97-f3aeebc56b16", "12c154af-7cbe-4c0c-8502-d99631cbb52d", "Seller", "SELLER" },
                    { "90f8ebd7-99e6-43b7-92fc-857ccd8607de", "fb565396-b35c-44b9-9f27-ffbe2a029acf", "Administrator", "ADMINISTRATOR" },
                    { "ef4e1f69-586e-4940-acd5-fd4a191a143e", "ca0ae26f-fa81-4922-a1ea-3d656d8e1137", "Shipper", "SHIPPER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Seller_ApplicationUserId",
                table: "Seller",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentImages_DetailCommentID",
                table: "CommentImages",
                column: "DetailCommentID");

            migrationBuilder.AddForeignKey(
                name: "FK_Seller_AspNetUsers_ApplicationUserId",
                table: "Seller",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Seller_AspNetUsers_ApplicationUserId",
                table: "Seller");

            migrationBuilder.DropTable(
                name: "CommentImages");

            migrationBuilder.DropIndex(
                name: "IX_Seller_ApplicationUserId",
                table: "Seller");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "06152ee5-2f91-4ea7-a94e-01033227abc5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7fb07894-fde3-4e33-bb97-f3aeebc56b16");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "90f8ebd7-99e6-43b7-92fc-857ccd8607de");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ef4e1f69-586e-4940-acd5-fd4a191a143e");

            migrationBuilder.AlterColumn<int>(
                name: "ApplicationUserId",
                table: "Seller",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId1",
                table: "Seller",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5e3bfe99-119c-4d25-893d-69523e1d6414", "16183f30-e874-4564-a1cb-e25d354d7c33", "Administrator", "ADMINISTRATOR" },
                    { "60c2f6d0-fbae-487f-a6b7-8ea9415e8a27", "abbccaac-634e-4607-ab7b-452f91b4d061", "Seller", "SELLER" },
                    { "f1b9946f-1728-4c9d-b4f8-f60ee20f4f9d", "ba18e6e2-c479-4a56-bbc2-6a8468927a3e", "Shipper", "SHIPPER" },
                    { "fc2d6903-5835-4bc4-aed7-3c10925eca89", "29227095-fd7d-40af-ab4a-3218dbed555c", "Customer", "CUSTOMER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Seller_ApplicationUserId1",
                table: "Seller",
                column: "ApplicationUserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Seller_AspNetUsers_ApplicationUserId1",
                table: "Seller",
                column: "ApplicationUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
