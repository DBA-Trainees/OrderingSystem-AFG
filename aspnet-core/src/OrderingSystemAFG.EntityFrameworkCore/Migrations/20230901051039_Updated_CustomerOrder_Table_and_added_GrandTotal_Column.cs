using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderingSystemAFG.Migrations
{
    /// <inheritdoc />
    public partial class Updated_CustomerOrder_Table_and_added_GrandTotal_Column : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "GrandTotal",
                table: "CustomersOrders",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GrandTotal",
                table: "CustomersOrders");
        }
    }
}
