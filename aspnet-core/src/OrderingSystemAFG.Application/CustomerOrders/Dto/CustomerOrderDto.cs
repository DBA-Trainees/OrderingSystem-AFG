using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystemAFG.Categorys.Dto;
using OrderingSystemAFG.Divisions.Dto;
using OrderingSystemAFG.Entities;
using OrderingSystemAFG.Foods.Dto;
using OrderingSystemAFG.Sizes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.CustomerOrders.Dto
{
    [AutoMapFrom(typeof(CustomerOrder))]
    [AutoMapTo(typeof(CustomerOrder))]

    public class CustomerOrderDto : EntityDto<int>
    {
        public int? FoodId { get; set; }
        public FoodDto Food { get; set; }
        public string CustomerName { get; set; }
        public int? DivisionId { get; set; }
        public DivisionDto Division { get; set; }
        public int? CategoryId { get; set; }
        public CategoryDto Category { get; set; }
        public string Notes { get; set; }
        public int? SizeId { get; set; }
        public SizeDto Size { get; set; }
        public int TotalQuantityOfOrder { get; set; }
        public bool OrderStatus { get; set; }
        public DateTime? DateAndTimeOrderIsPlaced { get; set; }
        public DateTime? DateAndTimeOrderIsRecieved { get; set; }

        public double TotalAmountTobePay { get; set; }
        public double GrandTotal { get; set; }

    }
}
