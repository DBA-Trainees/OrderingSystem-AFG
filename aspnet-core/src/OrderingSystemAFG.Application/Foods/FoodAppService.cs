using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystemAFG.Entities;
using OrderingSystemAFG.Foods.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Foods
{
    public class FoodAppService : AsyncCrudAppService<Food, FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>, IFoodAppService
    {
        private readonly IRepository<Food, int> _foodIRepository;

        public FoodAppService(IRepository<Food, int> repository) : base(repository)
        {
            _foodIRepository = repository;
        }

        public override async Task<PagedResultDto<FoodDto>> GetAllAsync(PagedFoodResultRequestDto input)
        {
            var foodItems = await _foodIRepository.GetAll()
                .Include(items => items.Type)
                .Include(items => items.Size)
                .OrderByDescending(items => items.Id)
                .Select(items => ObjectMapper.Map<FoodDto>(items))
                .ToListAsync();

            return new PagedResultDto<FoodDto>(foodItems.Count(), foodItems);

        }

        public async Task<List<FoodDto>> GetAllTheListOfFood()
        {
            var foodList = await _foodIRepository.GetAllListAsync();

            return ObjectMapper.Map<List<FoodDto>>(foodList);
        }

        public async Task<PagedResultDto<FoodDto>> GetAllTheFoodItemWhereAvailabilityIsTrue(PagedFoodResultRequestDto input)
        {
            var availableFoodItems = await _foodIRepository.GetAll()
                .Include(items => items.Type)
                .Include (items => items.Size)
                .OrderByDescending(items => items.Id)
                //.Where(select => select.Availability)
                .Select(items => ObjectMapper.Map<FoodDto>(items))
                .ToListAsync();

            return new PagedResultDto<FoodDto>(availableFoodItems.Count(), availableFoodItems);
        }

        public async Task<FoodDto> GetAllFoodIncludingCategory(EntityDto<int> input)
        {
            var foodItems = await _foodIRepository.GetAll()
                .Where(items => items.Id == input.Id)
                .Select(items => ObjectMapper.Map<FoodDto>(items))
                .FirstOrDefaultAsync();

            return foodItems; 

        }


    }
}
