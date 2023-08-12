using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OrderingSystemAFG.Authorization;

namespace OrderingSystemAFG
{
    [DependsOn(
        typeof(OrderingSystemAFGCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class OrderingSystemAFGApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<OrderingSystemAFGAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(OrderingSystemAFGApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
