using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystemAFG.CustomerOrders.Dto;
using OrderingSystemAFG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.CustomerOrders
{
    public class CustomerOrderAppService : AsyncCrudAppService<CustomerOrder, CustomerOrderDto, int, PagedCustomerOrderResultRequestDto, CreateCustomerOrderDto, CustomerOrderDto>, ICustomerOrderAppService
    {
        private readonly IRepository<CustomerOrder, int> _customerIOrderRepository;

        public CustomerOrderAppService(IRepository<CustomerOrder, int> repository) : base(repository)
        {
            _customerIOrderRepository = repository;
        }

        public override async Task<PagedResultDto<CustomerOrderDto>> GetAllAsync(PagedCustomerOrderResultRequestDto input)
        {
            var orderItems = await _customerIOrderRepository.GetAll()
                .Include(items => items.Food)
                .Include(items => items.Category)
                .Include(items => items.Size)
                .Include(items => items.Division)
                .OrderByDescending(items => items.Id)
                .Select(items => ObjectMapper.Map<CustomerOrderDto>(items))
                .ToListAsync();

            return new PagedResultDto<CustomerOrderDto>(orderItems.Count(), orderItems);

        }

        public async Task<PagedResultDto<CustomerOrderDto>> GetAllTheListOfOrderIncludingFoodThenCategoryThenSizeThenDivision(PagedCustomerOrderResultRequestDto input)
        {
            var orderList = await _customerIOrderRepository.GetAll()
                .Include(items => items.Food)
                .Include(items => items.Category)
                .Include(items => items.Size)
                .Include(items => items.Division)
                .OrderByDescending(items => items.Id)
                .Select(items => ObjectMapper.Map<CustomerOrderDto>(items))
                .ToListAsync();

            return new PagedResultDto<CustomerOrderDto>(orderList.Count(), orderList); 
        }

    }
}
