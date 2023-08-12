using System.Threading.Tasks;
using Abp.Application.Services;
using OrderingSystemAFG.Authorization.Accounts.Dto;

namespace OrderingSystemAFG.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
