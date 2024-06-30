using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopRe.Data.Migrations
{
    public partial class fix_follow : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Follows");

            

            migrationBuilder.CreateTable(
                name: "AccountSeller",
                columns: table => new
                {
                    AccountID_NK = table.Column<int>(type: "int", nullable: false),
                    SellerID_NK = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountSeller", x => new { x.AccountID_NK, x.SellerID_NK });
                    table.ForeignKey(
                        name: "FK_AccountSeller_Accounts_AccountID_NK",
                        column: x => x.AccountID_NK,
                        principalTable: "Accounts",
                        principalColumn: "ID_NK",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AccountSeller_Seller_SellerID_NK",
                        column: x => x.SellerID_NK,
                        principalTable: "Seller",
                        principalColumn: "ID_NK",
                        onDelete: ReferentialAction.Cascade);
                });

            

            migrationBuilder.CreateIndex(
                name: "IX_AccountSeller_SellerID_NK",
                table: "AccountSeller",
                column: "SellerID_NK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountSeller");

           

            migrationBuilder.CreateTable(
                name: "Follows",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SellerID_NK = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Follows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Follows_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Follows_Seller_SellerID_NK",
                        column: x => x.SellerID_NK,
                        principalTable: "Seller",
                        principalColumn: "ID_NK");
                });

            

            migrationBuilder.CreateIndex(
                name: "IX_Follows_SellerID_NK",
                table: "Follows",
                column: "SellerID_NK");

            migrationBuilder.CreateIndex(
                name: "IX_Follows_UserId",
                table: "Follows",
                column: "UserId");
        }
    }
}
