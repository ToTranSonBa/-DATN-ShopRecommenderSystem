using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class changeattributenameoftables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Update_at",
                table: "DetailComments");

            migrationBuilder.RenameColumn(
                name: "Update_at",
                table: "ProductOptions",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "Delete_at",
                table: "ProductOptions",
                newName: "DeletedAt");

            migrationBuilder.RenameColumn(
                name: "Create_at",
                table: "ProductOptions",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "Update_at",
                table: "Product",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "Delete_at",
                table: "Product",
                newName: "DeletedAt");

            migrationBuilder.RenameColumn(
                name: "Create_at",
                table: "Product",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "Delete_at",
                table: "DetailComments",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedTime",
                table: "DetailComments",
                newName: "DeletedAt");

            migrationBuilder.RenameColumn(
                name: "Created",
                table: "DetailComments",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "Update_at",
                table: "Brands",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "Delete_at",
                table: "Brands",
                newName: "DeletedAt");

            migrationBuilder.RenameColumn(
                name: "Create_at",
                table: "Brands",
                newName: "CreatedAt");

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "Seller",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "Seller");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "ProductOptions",
                newName: "Update_at");

            migrationBuilder.RenameColumn(
                name: "DeletedAt",
                table: "ProductOptions",
                newName: "Delete_at");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "ProductOptions",
                newName: "Create_at");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Product",
                newName: "Update_at");

            migrationBuilder.RenameColumn(
                name: "DeletedAt",
                table: "Product",
                newName: "Delete_at");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Product",
                newName: "Create_at");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "DetailComments",
                newName: "Delete_at");

            migrationBuilder.RenameColumn(
                name: "DeletedAt",
                table: "DetailComments",
                newName: "CreatedTime");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "DetailComments",
                newName: "Created");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Brands",
                newName: "Update_at");

            migrationBuilder.RenameColumn(
                name: "DeletedAt",
                table: "Brands",
                newName: "Delete_at");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Brands",
                newName: "Create_at");

            migrationBuilder.AddColumn<DateTime>(
                name: "Update_at",
                table: "DetailComments",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
