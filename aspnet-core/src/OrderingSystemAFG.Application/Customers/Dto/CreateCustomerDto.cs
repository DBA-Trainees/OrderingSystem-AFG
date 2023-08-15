using Abp.AutoMapper;
using OrderingSystemAFG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Customers.Dto
{
    [AutoMapTo(typeof(Customer))]

    public class CreateCustomerDto
    {
        public string CustomerName { get; set; }

        public int? DivisionId { get; set; } 

    }
}
