using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderingSystemAFG.Migrations
{
    /// <inheritdoc />
    public partial class Updated_the_CustomerOrder_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "TotalAmountTobePay",
                table: "CustomersOrders",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalAmountTobePay",
                table: "CustomersOrders");
        }
    }
}
