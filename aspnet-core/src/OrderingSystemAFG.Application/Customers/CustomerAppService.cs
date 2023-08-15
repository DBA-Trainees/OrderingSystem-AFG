using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystemAFG.Customers.Dto;
using OrderingSystemAFG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Customers
{
    public class CustomerAppService : AsyncCrudAppService<Customer, CustomerDto, int, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>, ICustomerAppService
    {

        private readonly IRepository<Customer, int> _customerIRepository;

        public CustomerAppService(IRepository<Customer, int> repository) : base(repository)
        {
            _customerIRepository = repository;
        }

        public override async Task<PagedResultDto<CustomerDto>> GetAllAsync(PagedCustomerResultRequestDto input)
        {
            var customerAndDivisionItems = await _customerIRepository.GetAll()
                .Include(items => items.Division)
                .OrderByDescending(items => items.Id)
                .Select(items => ObjectMapper.Map<CustomerDto>(items))
                .ToListAsync();

            return new PagedResultDto<CustomerDto>(customerAndDivisionItems.Count(), customerAndDivisionItems);
        }

        public async Task<PagedResultDto<CustomerDto>> GetAllTheListOfCustomersIncludingDivisions(PagedCustomerResultRequestDto input)
        {
            var customerAndDivisionList = await _customerIRepository.GetAll()
                .Include(items => items.Division)
                .OrderByDescending(items => items.Id)
                .Select(items => ObjectMapper.Map<CustomerDto>(items))
                .ToListAsync();

            return new PagedResultDto<CustomerDto>(customerAndDivisionList.Count(), customerAndDivisionList);

        }

    }
}
