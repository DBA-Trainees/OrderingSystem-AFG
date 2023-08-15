using Abp.AutoMapper;
using OrderingSystemAFG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Sizes.Dto
{
    [AutoMapTo(typeof(Size))]
    public class CreateSizeDto
    {
        public string SizeName { get; set; }
    }
}
