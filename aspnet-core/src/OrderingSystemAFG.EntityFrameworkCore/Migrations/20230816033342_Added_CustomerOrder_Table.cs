using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderingSystemAFG.Migrations
{
    /// <inheritdoc />
    public partial class Added_CustomerOrder_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomersOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FoodId = table.Column<int>(type: "int", nullable: true),
                    CustomerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DivisionId = table.Column<int>(type: "int", nullable: true),
                    CategoryId = table.Column<int>(type: "int", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SizeId = table.Column<int>(type: "int", nullable: true),
                    TotalQuantityOfOrder = table.Column<int>(type: "int", nullable: false),
                    OrderStatus = table.Column<bool>(type: "bit", nullable: false),
                    DateAndTimeOrderIsPlaced = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateAndTimeOrderIsRecieved = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomersOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomersOrders_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CustomersOrders_Divisions_DivisionId",
                        column: x => x.DivisionId,
                        principalTable: "Divisions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CustomersOrders_Foods_FoodId",
                        column: x => x.FoodId,
                        principalTable: "Foods",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CustomersOrders_Sizes_SizeId",
                        column: x => x.SizeId,
                        principalTable: "Sizes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomersOrders_CategoryId",
                table: "CustomersOrders",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomersOrders_DivisionId",
                table: "CustomersOrders",
                column: "DivisionId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomersOrders_FoodId",
                table: "CustomersOrders",
                column: "FoodId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomersOrders_SizeId",
                table: "CustomersOrders",
                column: "SizeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomersOrders");
        }
    }
}
