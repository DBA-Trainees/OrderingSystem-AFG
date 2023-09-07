using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Entities
{
    public class CustomerOrder : FullAuditedEntity<int>
    {
        /* List Columns */

        public int? FoodId { get; set; } 
        public Food Food { get; set; } 
        public string CustomerName { get; set; } 
        public int? DivisionId { get; set; } 
        public Division Division { get; set; } 
        public int? CategoryId { get; set; } 
        public Category Category { get; set; } 
        public string Notes { get; set; } 
        public int? SizeId { get; set; } 
        public Size Size { get; set; } 
        public int TotalQuantityOfOrder { get; set; } 
        public bool OrderStatus { get; set; } 
        public DateTime? DateAndTimeOrderIsPlaced { get; set; } 
        public DateTime? DateAndTimeOrderIsRecieved { get; set; } 

        public double TotalAmountTobePay { get; set; } 
        public double GrandTotal { get; set; } 

        public int? CheckoutStatusNumber { get; set; }

    }
}
