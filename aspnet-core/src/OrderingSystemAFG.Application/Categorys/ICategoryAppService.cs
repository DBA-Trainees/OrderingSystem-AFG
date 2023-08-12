using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystemAFG.Categorys.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Categorys
{

    public interface ICategoryAppService : IAsyncCrudAppService<CategoryDto, int, PagedCategoryResultRequestDto, CreateCategoryDto, CategoryDto>
    {
        Task<PagedResultDto<CategoryDto>> GetAllAsync(PagedCategoryResultRequestDto input);

        Task<List<CategoryDto>> GetAllTheListOfCategoryFromDTO();

    }
}
