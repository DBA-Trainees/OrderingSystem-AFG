using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderingSystemAFG.Migrations
{
    /// <inheritdoc />
    public partial class Updated_the_Food_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Foods",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Foods_CategoryId",
                table: "Foods",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Foods_Categories_CategoryId",
                table: "Foods",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Foods_Categories_CategoryId",
                table: "Foods");

            migrationBuilder.DropIndex(
                name: "IX_Foods_CategoryId",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Foods");
        }
    }
}
