using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderingSystemAFG.Migrations
{
    /// <inheritdoc />
    public partial class Updated_CustomerOrder_Table_Added_CheckoutTotalAccumulatedOrders_Column : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CheckoutTotalAccumulatedOrders",
                table: "CustomersOrders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CheckoutTotalAccumulatedOrders",
                table: "CustomersOrders");
        }
    }
}
