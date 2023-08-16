using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystemAFG.Foods.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Foods
{
    public interface IFoodAppService : IAsyncCrudAppService<FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>
    {
        //Task<PagedResultDto<FoodDto>> GetAllAsync(PagedFoodResultRequestDto input);
        //Task<List<FoodDto>> GetAllTheListOfFood();
        //Task<PagedResultDto<FoodDto>> GetAllTheFoodItemWhereAvailabilityIsTrue(PagedFoodResultRequestDto input);
    }
}
