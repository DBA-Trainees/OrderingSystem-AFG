using Abp.Application.Services;
using OrderingSystemAFG.Customers.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Customers
{
    public interface ICustomerAppService : IAsyncCrudAppService<CustomerDto, int, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>
    {
            
    }
}
