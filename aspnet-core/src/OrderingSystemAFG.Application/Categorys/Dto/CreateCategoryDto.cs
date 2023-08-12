using Abp.AutoMapper;
using OrderingSystemAFG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Categorys.Dto
{

    [AutoMapTo(typeof(Category))]

    public class CreateCategoryDto
    {
        public string CategoryName { get; set; }
    }
}
