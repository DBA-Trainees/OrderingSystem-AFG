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

        Task<PagedResultDto<CustomerOrderDto>> GetAllOrdersForVendor(PagedCustomerOrderResultRequestDto input);

        Task<CustomerOrderDto> PutOrdersToCart(CustomerOrderDto input);

        Task<CustomerOrderDto> UpdateStatusNumberIntoThree(CustomerOrderDto input);

        Task<PagedResultDto<CustomerOrderDto>> GetAllOrdersInCart(PagedCustomerOrderResultRequestDto input);

        Task<PagedResultDto<CustomerOrderDto>> GetAllOrdersInCheckout(PagedCustomerOrderResultRequestDto input);

        Task<PagedResultDto<CustomerOrderDto>> GetAllPaidOrders(PagedCustomerOrderResultRequestDto input);

        List<CustomerOrderDto> GetPreviousOrderByReferenceNumber(Guid referenceNumber);

    }
}
