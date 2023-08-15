using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystemAFG.FoodTypes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.FoodTypes
{
    public interface IFoodTypeAppService : IAsyncCrudAppService<FoodTypeDto, int, PagedFoodTypeResultRequestDto, CreateFoodTypeDto, FoodTypeDto>
    {
        Task<PagedResultDto<FoodTypeDto>> GetAllAsync(PagedFoodTypeResultRequestDto input);

        Task<List<FoodTypeDto>> GetAllTheListOfFoodTyoeFromDTO();
    }
}
