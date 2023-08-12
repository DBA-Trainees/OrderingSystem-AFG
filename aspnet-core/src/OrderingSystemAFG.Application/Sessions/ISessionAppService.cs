using System.Threading.Tasks;
using Abp.Application.Services;
using OrderingSystemAFG.Sessions.Dto;

namespace OrderingSystemAFG.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
