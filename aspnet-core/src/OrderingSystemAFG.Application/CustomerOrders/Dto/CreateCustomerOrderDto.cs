using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystemAFG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.CustomerOrders.Dto
{
    [AutoMapTo(typeof(CustomerOrder))]
    public class CreateCustomerOrderDto : EntityDto<int>
    {
        public int? FoodId { get; set; }
        public string CustomerName { get; set; }
        public int? DivisionId { get; set; }
        public int? CategoryId { get; set; }
        public string Notes { get; set; }
        public int? SizeId { get; set; }
        public int TotalQuantityOfOrder { get; set; }
        public bool OrderStatus { get; set; }
        public DateTime? DateAndTimeOrderIsPlaced { get; set; }
        public DateTime? DateAndTimeOrderIsRecieved { get; set; }

        public double TotalAmountTobePay { get; set; }
        public double GrandTotal { get; set; }

        public int CheckoutTotalAccumulatedOrders { get; set; }

        public int? CheckoutStatusNumber { get; set; }

        public Guid? ReferenceNumber { get; set; }

        public List<CustomerOrderDto> ListOfOrders { get; set; } //

    }
}
