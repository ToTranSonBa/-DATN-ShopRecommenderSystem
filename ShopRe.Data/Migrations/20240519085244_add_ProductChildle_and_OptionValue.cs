using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class add_ProductChildle_and_OptionValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "ProductOptions");

            migrationBuilder.DropColumn(
                name: "Position",
                table: "ProductOptions");

            migrationBuilder.DropColumn(
                name: "ShowPreviewImage",
                table: "ProductOptions");

            migrationBuilder.DropColumn(
                name: "Values",
                table: "ProductOptions");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "ProductOptions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ProductOptionValues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductOptionID = table.Column<int>(type: "int", nullable: false)
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
                    Id_sk = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    thumbnail_url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<int>(type: "int", nullable: false),
                    optionValuesId = table.Column<int>(type: "int", nullable: true),
                    ProductID_NK = table.Column<int>(type: "int", nullable: true)
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductChildle");

            migrationBuilder.DropTable(
                name: "ProductOptionValues");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "ProductOptions",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "ProductOptions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Position",
                table: "ProductOptions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ShowPreviewImage",
                table: "ProductOptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Values",
                table: "ProductOptions",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
