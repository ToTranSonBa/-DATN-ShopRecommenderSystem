using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class addselcates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateIndex(
                name: "IX_SelCates_SellerID_NK",
                table: "SelCates",
                column: "SellerID_NK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SelCates");
        }
    }
}
