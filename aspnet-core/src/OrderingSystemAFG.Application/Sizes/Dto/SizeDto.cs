using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystemAFG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Sizes.Dto
{
    [AutoMapFrom(typeof(Size))]
    [AutoMapTo(typeof(Size))]

    public class SizeDto : EntityDto<int>
    {
        public string SizeName { get; set; }

    }
}
