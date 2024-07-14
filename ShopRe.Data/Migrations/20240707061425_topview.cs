using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class topview : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.CreateTable(
                name: "TopPopProduct",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductID_NK = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TopPopProduct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TopPopProduct_Product_ProductID_NK",
                        column: x => x.ProductID_NK,
                        principalTable: "Product",
                        principalColumn: "ID_NK",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TopViewProduct",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductID_NK = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TopViewProduct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TopViewProduct_Product_ProductID_NK",
                        column: x => x.ProductID_NK,
                        principalTable: "Product",
                        principalColumn: "ID_NK",
                        onDelete: ReferentialAction.Cascade);
                });

            
            migrationBuilder.CreateIndex(
                name: "IX_TopPopProduct_ProductID_NK",
                table: "TopPopProduct",
                column: "ProductID_NK");

            migrationBuilder.CreateIndex(
                name: "IX_TopViewProduct_ProductID_NK",
                table: "TopViewProduct",
                column: "ProductID_NK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TopPopProduct");

            migrationBuilder.DropTable(
                name: "TopViewProduct");
        }
    }
}
