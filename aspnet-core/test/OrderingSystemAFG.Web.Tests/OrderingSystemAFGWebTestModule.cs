using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OrderingSystemAFG.EntityFrameworkCore;
using OrderingSystemAFG.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace OrderingSystemAFG.Web.Tests
{
    [DependsOn(
        typeof(OrderingSystemAFGWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class OrderingSystemAFGWebTestModule : AbpModule
    {
        public OrderingSystemAFGWebTestModule(OrderingSystemAFGEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(OrderingSystemAFGWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(OrderingSystemAFGWebMvcModule).Assembly);
        }
    }
}