using Abp.Application.Services;
using OrderingSystemAFG.MultiTenancy.Dto;

namespace OrderingSystemAFG.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

