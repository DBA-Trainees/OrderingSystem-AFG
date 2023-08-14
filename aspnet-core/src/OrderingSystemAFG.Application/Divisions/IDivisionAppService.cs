using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystemAFG.Divisions.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Divisions
{
    public interface IDivisionAppService : IAsyncCrudAppService<DivisionDto, int, PagedDivisionResultRequestDto, CreateDivisionDto, DivisionDto>
    {
        Task<PagedResultDto<DivisionDto>> GetAllAsync(PagedDivisionResultRequestDto input);

        Task<List<DivisionDto>> GetAllTheListOfDivisionFromDTO();
    }
}
