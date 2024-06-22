using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class change_Product : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "ProductOptions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "ProductOptions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Product",
                type: "bit",
                nullable: false,
                defaultValue: false);

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ProductOptions");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "ProductOptions");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Product");

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
        }
    }
}
