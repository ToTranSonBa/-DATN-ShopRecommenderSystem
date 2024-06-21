using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class changeseller : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "042a5190-ae3f-4aef-82d8-4b924fbc2841");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "200faaba-799a-4b60-890c-989be16bc452");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "771f0ed6-56cf-4740-9688-979281fa03da");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "974a42bb-e5d2-453e-a2ce-b77c96015ed2");

            migrationBuilder.AddColumn<int>(
                name: "ApplicationUserId",
                table: "Seller",
                type: "int",
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "ApplicationUserId",
                table: "Seller");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId1",
                table: "Seller");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "042a5190-ae3f-4aef-82d8-4b924fbc2841", "c9d6a37a-d663-4afe-b66b-2422ea8f4437", "Administrator", "ADMINISTRATOR" },
                    { "200faaba-799a-4b60-890c-989be16bc452", "86c92505-30db-45ff-a0a4-f5a72a0797b0", "Customer", "CUSTOMER" },
                    { "771f0ed6-56cf-4740-9688-979281fa03da", "67927242-0b1d-4740-8426-93da3eeace64", "Seller", "SELLER" },
                    { "974a42bb-e5d2-453e-a2ce-b77c96015ed2", "49584d5d-e1aa-4df2-a792-8ed34cac4a63", "Shipper", "SHIPPER" }
                });
        }
    }
}
