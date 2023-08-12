using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace OrderingSystemAFG.EntityFrameworkCore
{
    public static class OrderingSystemAFGDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<OrderingSystemAFGDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<OrderingSystemAFGDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
