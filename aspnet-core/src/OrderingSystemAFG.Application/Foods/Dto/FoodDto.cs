using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystemAFG.Entities;
using OrderingSystemAFG.FoodTypes.Dto;
using OrderingSystemAFG.Sizes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Foods.Dto
{
    [AutoMapFrom(typeof(Food))]
    [AutoMapTo(typeof(Food))] 

    public class FoodDto : EntityDto<int>
    {
        public string FoodName { get; set; }
        public double Price { get; set; }
        public byte[] Image { get; set; }
        public string ImageName { get; set; }
        public string ImageFileType { get; set; }
        public bool Availability { get; set; }
        public int TotalStock { get; set; }
        public int? TypeId { get; set; } 
        public FoodTypeDto Type { get; set; }
        public int? SizeId { get; set; }
        public SizeDto Size { get; set; }

    }
}
