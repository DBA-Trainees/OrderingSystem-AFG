using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.FoodTypes.Dto
{
    [AutoMapTo(typeof(Type))]

    public class CreateFoodTypeDto
    {
        public string FoodTypeName { get; set; }
    }
}
