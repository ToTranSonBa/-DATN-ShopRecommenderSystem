using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class change_product_Sellerid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2fcb258d-f589-469e-859d-8144a0a9220a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "439f2071-b9c3-4eae-b3d9-356eab746ccc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8efa6942-db55-4be0-8515-8a196526088c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d98c83ca-fd00-4010-b9c8-756a62b2603a");

            migrationBuilder.AlterColumn<int>(
                name: "SellerID_NK",
                table: "Product",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1717dc86-f4d6-40c2-a966-0eb4241447fd", "55c39e70-db0a-4be3-9387-3e5b63b5312a", "Administrator", "ADMINISTRATOR" },
                    { "253cba31-38d7-4f17-80df-d132db25f3c8", "fd74b83a-1b4c-497c-8e1f-84b675bcf8b1", "Seller", "SELLER" },
                    { "409d0358-5b00-43c5-ab40-d3175ad36f2a", "4e053209-def4-4cec-8807-5e50e7b94ada", "Shipper", "SHIPPER" },
                    { "96e09d8f-0121-4963-add1-3bf5a8eb119b", "56e10d6e-c6ec-411b-bbb3-d879a7b224ff", "Customer", "CUSTOMER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1717dc86-f4d6-40c2-a966-0eb4241447fd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "253cba31-38d7-4f17-80df-d132db25f3c8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "409d0358-5b00-43c5-ab40-d3175ad36f2a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "96e09d8f-0121-4963-add1-3bf5a8eb119b");

            migrationBuilder.AlterColumn<int>(
                name: "SellerID_NK",
                table: "Product",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2fcb258d-f589-469e-859d-8144a0a9220a", "67d69c22-ba21-41dd-856d-d58822d5b1c0", "Seller", "SELLER" },
                    { "439f2071-b9c3-4eae-b3d9-356eab746ccc", "e3e19aff-b642-4294-90c4-7852cb973e55", "Shipper", "SHIPPER" },
                    { "8efa6942-db55-4be0-8515-8a196526088c", "2fb21553-c815-48da-80cf-1546d43b1bf6", "Customer", "CUSTOMER" },
                    { "d98c83ca-fd00-4010-b9c8-756a62b2603a", "c0465da4-9698-4b56-9273-a0ee4a06c640", "Administrator", "ADMINISTRATOR" }
                });
        }
    }
}
