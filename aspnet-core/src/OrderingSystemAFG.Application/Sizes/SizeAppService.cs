using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystemAFG.Entities;
using OrderingSystemAFG.Sizes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Sizes
{

    public class SizeAppService : AsyncCrudAppService<Entities.Size, SizeDto, int, PagedSizeResultRequestDto, CreateSizeDto, SizeDto>, ISizeAppService
    {
        private readonly IRepository<Entities.Size, int> _sizeIRepository;

        public SizeAppService(IRepository<Entities.Size, int> repositorySize) : base(repositorySize)
        {
            _sizeIRepository = repositorySize;
        }

        public override async Task<PagedResultDto<SizeDto>> GetAllAsync(PagedSizeResultRequestDto input)
        {
            var sizeItems = await _sizeIRepository.GetAll()
                .OrderByDescending(items => items.Id)
                .Select(items => ObjectMapper.Map<SizeDto>(items))
                .ToListAsync();

            return new PagedResultDto<SizeDto>(sizeItems.Count(), sizeItems);
        }

        public async Task<List<SizeDto>> GetAllTheListOfSizeFromDTO()
        {
            var sizeList = await _sizeIRepository.GetAllListAsync();

            return ObjectMapper.Map<List<SizeDto>>(sizeList);

        }


    }
}
