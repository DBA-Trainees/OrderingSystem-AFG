using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using OrderingSystemAFG.Authorization.Roles;
using OrderingSystemAFG.Authorization.Users;
using OrderingSystemAFG.MultiTenancy;

namespace OrderingSystemAFG.EntityFrameworkCore
{
    public class OrderingSystemAFGDbContext : AbpZeroDbContext<Tenant, Role, User, OrderingSystemAFGDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public OrderingSystemAFGDbContext(DbContextOptions<OrderingSystemAFGDbContext> options)
            : base(options)
        {
        }
    }
}
