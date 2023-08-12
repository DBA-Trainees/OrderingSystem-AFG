using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OrderingSystemAFG.Configuration;

namespace OrderingSystemAFG.Web.Host.Startup
{
    [DependsOn(
       typeof(OrderingSystemAFGWebCoreModule))]
    public class OrderingSystemAFGWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public OrderingSystemAFGWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(OrderingSystemAFGWebHostModule).GetAssembly());
        }
    }
}
