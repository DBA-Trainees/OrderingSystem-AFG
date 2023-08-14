using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystemAFG.Entities;
using OrderingSystemAFG.FoodTypes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.FoodTypes
{
    public class FoodTypeAppService : AsyncCrudAppService<Entities.Type, FoodTypeDto, int, PagedFoodTypeResultRequestDto, CreateFoodTypeDto, FoodTypeDto>, IFoodTypeAppService
    {
        private readonly IRepository<Entities.Type, int> _foodTypeIRepository;

        public FoodTypeAppService(IRepository<Entities.Type, int> repository) : base(repository)
        {
            _foodTypeIRepository = repository;
        }

        public override async Task<PagedResultDto<FoodTypeDto>> GetAllAsync(PagedFoodTypeResultRequestDto input)
        {
            var foodTypeItems = await _foodTypeIRepository.GetAll()
                .OrderByDescending(items => items.Id)
                .Select(items => ObjectMapper.Map<FoodTypeDto>(items))
                .ToListAsync();

            return new PagedResultDto<FoodTypeDto>(foodTypeItems.Count(), foodTypeItems);
        }

        public async Task<List<FoodTypeDto>> GetAllTheListOfFoodTyoeFromDTO()
        {
            var foodTypeList = await _foodTypeIRepository.GetAllListAsync();

            return ObjectMapper.Map<List<FoodTypeDto>>(foodTypeList);
        }

    }
}
