using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using OrderingSystemAFG.Configuration.Dto;

namespace OrderingSystemAFG.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : OrderingSystemAFGAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
