using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystemAFG.Divisions.Dto;
using OrderingSystemAFG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Divisions
{
    public class DivisionAppService : AsyncCrudAppService<Division, DivisionDto, int, PagedDivisionResultRequestDto, CreateDivisionDto, DivisionDto>, IDivisionAppService
    {
        private readonly IRepository<Division, int> _divisionIRepository;

        public DivisionAppService(IRepository<Division, int> repository) : base(repository)
        {
            _divisionIRepository = repository;
        }

        public override async Task<PagedResultDto<DivisionDto>> GetAllAsync(PagedDivisionResultRequestDto input)
        {
            var divisionItems = await _divisionIRepository.GetAll()
                .OrderByDescending(items => items.Id)
                .Select(items => ObjectMapper.Map<DivisionDto>(items))
                .ToListAsync();

            return new PagedResultDto<DivisionDto>(divisionItems.Count(), divisionItems);

        }

        public async Task<List<DivisionDto>> GetAllTheListOfDivisionFromDTO()
        {
            var divisionList = await _divisionIRepository.GetAllListAsync();

            return ObjectMapper.Map<List<DivisionDto>>(divisionList);

        }



    }
}
