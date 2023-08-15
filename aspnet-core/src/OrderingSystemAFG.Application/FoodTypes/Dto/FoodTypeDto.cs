using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.FoodTypes.Dto
{
    [AutoMapFrom(typeof(Type))]
    [AutoMapTo(typeof(Type))]

    public class FoodTypeDto : EntityDto<int>
    {
        public string FoodTypeName { get; set; }
    }
}
