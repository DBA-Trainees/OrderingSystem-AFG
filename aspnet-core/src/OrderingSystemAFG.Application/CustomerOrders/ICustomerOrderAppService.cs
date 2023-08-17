using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystemAFG.CustomerOrders.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.CustomerOrders
{
    public interface ICustomerOrderAppService : IAsyncCrudAppService<CustomerOrderDto, int, PagedCustomerOrderResultRequestDto, CreateCustomerOrderDto, CustomerOrderDto>
    {
        Task<PagedResultDto<CustomerOrderDto>> GetAllAsync(PagedCustomerOrderResultRequestDto input);
        Task<PagedResultDto<CustomerOrderDto>> GetAllTheListOfOrderIncludingFoodThenCategoryThenSizeThenDivision(PagedCustomerOrderResultRequestDto input);

        Task<CustomerOrderDto> PutOrdersToCart(CustomerOrderDto input);
    }
}
