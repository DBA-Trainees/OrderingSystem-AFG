using Microsoft.Extensions.Configuration;
using Castle.MicroKernel.Registration;
using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OrderingSystemAFG.Configuration;
using OrderingSystemAFG.EntityFrameworkCore;
using OrderingSystemAFG.Migrator.DependencyInjection;

namespace OrderingSystemAFG.Migrator
{
    [DependsOn(typeof(OrderingSystemAFGEntityFrameworkModule))]
    public class OrderingSystemAFGMigratorModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public OrderingSystemAFGMigratorModule(OrderingSystemAFGEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

            _appConfiguration = AppConfigurations.Get(
                typeof(OrderingSystemAFGMigratorModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                OrderingSystemAFGConsts.ConnectionStringName
            );

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
            Configuration.ReplaceService(
                typeof(IEventBus), 
                () => IocManager.IocContainer.Register(
                    Component.For<IEventBus>().Instance(NullEventBus.Instance)
                )
            );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(OrderingSystemAFGMigratorModule).GetAssembly());
            ServiceCollectionRegistrar.Register(IocManager);
        }
    }
}
