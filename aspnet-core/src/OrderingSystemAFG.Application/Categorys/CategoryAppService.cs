using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystemAFG.Categorys.Dto;
using OrderingSystemAFG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Categorys
{
    public class CategoryAppService : AsyncCrudAppService<Category, CategoryDto, int, PagedCategoryResultRequestDto, CreateCategoryDto, CategoryDto>, ICategoryAppService
    {
        private readonly IRepository<Category, int> _categoryIRepository;

        public CategoryAppService(IRepository<Category, int> repository) : base(repository)
        {
            _categoryIRepository = repository;
        }

        public override async Task<PagedResultDto<CategoryDto>> GetAllAsync(PagedCategoryResultRequestDto input)
        {
            var categoryItems = await _categoryIRepository.GetAll()
                .OrderByDescending(items => items.Id)
                .Select(items => ObjectMapper.Map<CategoryDto>(items))
                .ToListAsync();

            return new PagedResultDto<CategoryDto>(categoryItems.Count(), categoryItems);
        }

        public async Task<List<CategoryDto>> GetAllTheListOfCategoryFromDTO()
        {
            var categoryList = await _categoryIRepository.GetAllListAsync();

            return ObjectMapper.Map<List<CategoryDto>>(categoryList);
        }


    }
}
