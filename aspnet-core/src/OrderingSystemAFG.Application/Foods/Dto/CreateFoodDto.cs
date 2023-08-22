using Abp.AutoMapper;
using OrderingSystemAFG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Foods.Dto
{
    [AutoMapTo(typeof(Food))]
    public class CreateFoodDto
    {
        public string FoodName { get; set; }
        public double Price { get; set; }
        public byte[] Image { get; set; }
        public string ImageName { get; set; }
        public string ImageFileType { get; set; }
        public bool Availability { get; set; }
        public int TotalStock { get; set; }
        public int? TypeId { get; set; }
        public int? SizeId { get; set; }
        public int? CategoryId { get; set; }

    }
}
