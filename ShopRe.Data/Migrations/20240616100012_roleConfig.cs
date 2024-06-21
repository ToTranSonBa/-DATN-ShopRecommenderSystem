using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class roleConfig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RefreshToken",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RefreshTokenExpiry",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "SelCates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CateLv0 = table.Column<int>(type: "int", nullable: false),
                    CateLv1 = table.Column<int>(type: "int", nullable: false),
                    CateLv2 = table.Column<int>(type: "int", nullable: false),
                    CateLv3 = table.Column<int>(type: "int", nullable: false),
                    CateLv4 = table.Column<int>(type: "int", nullable: false),
                    CateLv5 = table.Column<int>(type: "int", nullable: false),
                    SellerID_NK = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SelCates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SelCates_Seller_SellerID_NK",
                        column: x => x.SellerID_NK,
                        principalTable: "Seller",
                        principalColumn: "ID_NK");
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_SelCates_SellerID_NK",
                table: "SelCates",
                column: "SellerID_NK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SelCates");

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

            migrationBuilder.DropColumn(
                name: "RefreshToken",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RefreshTokenExpiry",
                table: "AspNetUsers");
        }
    }
}
