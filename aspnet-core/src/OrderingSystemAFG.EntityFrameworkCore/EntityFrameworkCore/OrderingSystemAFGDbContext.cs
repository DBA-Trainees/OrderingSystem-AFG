using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using OrderingSystemAFG.Authorization.Roles;
using OrderingSystemAFG.Authorization.Users;
using OrderingSystemAFG.MultiTenancy;
using OrderingSystemAFG.Entities;

namespace OrderingSystemAFG.EntityFrameworkCore
{
    public class OrderingSystemAFGDbContext : AbpZeroDbContext<Tenant, Role, User, OrderingSystemAFGDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public OrderingSystemAFGDbContext(DbContextOptions<OrderingSystemAFGDbContext> options)
            : base(options)
        {
        }

        /* List of Tables  */
        public DbSet<Category> Categories { get; set; }
        public DbSet<Division> Divisions { get; set; }
        public DbSet<Type> Types { get; set; } 
        public DbSet<Size> Sizes { get; set; }
        public DbSet<Customer> Customers { get; set; }


    }
}
