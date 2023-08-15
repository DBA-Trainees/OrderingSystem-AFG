using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystemAFG.Sizes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Sizes
{
    public interface ISizeAppService : IAsyncCrudAppService<SizeDto, int, PagedSizeResultRequestDto, CreateSizeDto, SizeDto>
    {
        Task<PagedResultDto<SizeDto>> GetAllAsync(PagedSizeResultRequestDto input);

        Task<List<SizeDto>> GetAllTheListOfSizeFromDTO();
    }
}
