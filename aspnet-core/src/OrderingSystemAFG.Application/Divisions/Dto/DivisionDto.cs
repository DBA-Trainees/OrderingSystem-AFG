using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystemAFG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Divisions.Dto
{
    [AutoMapFrom(typeof(Division))]
    [AutoMapTo(typeof(Division))]
    public class DivisionDto : EntityDto<int>
    {
        public string DivisionName { get; set; }
    }
}
