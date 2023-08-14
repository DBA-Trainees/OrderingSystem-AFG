using Abp.AutoMapper;
using OrderingSystemAFG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Divisions.Dto
{
    [AutoMapTo(typeof(Division))]

    public class CreateDivisionDto
    {
        public string DivisionName { get; set; }

    }
}
