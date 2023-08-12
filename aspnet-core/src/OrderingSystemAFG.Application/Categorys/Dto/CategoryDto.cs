using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystemAFG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Categorys.Dto
{

    [AutoMapFrom(typeof(Category))]
    [AutoMapTo(typeof(Category))]

    public class CategoryDto : EntityDto<int>
    {
        public string CategoryName { get; set; }

    }
}
