using System.Threading.Tasks;
using OrderingSystemAFG.Configuration.Dto;

namespace OrderingSystemAFG.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
