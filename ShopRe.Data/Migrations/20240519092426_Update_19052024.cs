using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class Update_19052024 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "ProductChildle");

            migrationBuilder.DropTable(
                name: "ProductOptionValues");

            migrationBuilder.RenameColumn(
                name: "ID_SK",
                table: "ProductOptions",
                newName: "Price");

            migrationBuilder.AddColumn<int>(
                name: "Image",
                table: "ProductOptions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "ProductOptions");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "ProductOptions",
                newName: "ID_SK");

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductID_NK = table.Column<int>(type: "int", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Images_Product_ProductID_NK",
                        column: x => x.ProductID_NK,
                        principalTable: "Product",
                        principalColumn: "ID_NK");
                });

            migrationBuilder.CreateTable(
                name: "ProductOptionValues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductOptionID = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductOptionValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductOptionValues_ProductOptions_ProductOptionID",
                        column: x => x.ProductOptionID,
                        principalTable: "ProductOptions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductChildle",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    optionValuesId = table.Column<int>(type: "int", nullable: true),
                    ProductID_NK = table.Column<int>(type: "int", nullable: true),
                    Id_sk = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<int>(type: "int", nullable: false),
                    thumbnail_url = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductChildle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductChildle_Product_ProductID_NK",
                        column: x => x.ProductID_NK,
                        principalTable: "Product",
                        principalColumn: "ID_NK");
                    table.ForeignKey(
                        name: "FK_ProductChildle_ProductOptionValues_optionValuesId",
                        column: x => x.optionValuesId,
                        principalTable: "ProductOptionValues",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_ProductID_NK",
                table: "Images",
                column: "ProductID_NK");

            migrationBuilder.CreateIndex(
                name: "IX_ProductChildle_optionValuesId",
                table: "ProductChildle",
                column: "optionValuesId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductChildle_ProductID_NK",
                table: "ProductChildle",
                column: "ProductID_NK");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOptionValues_ProductOptionID",
                table: "ProductOptionValues",
                column: "ProductOptionID");
        }
    }
}
