using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Entities
{
    public class Size : FullAuditedEntity<int>
    {
        /* List Columns */
        public string SizeName { get; set; }

        public double SizeValue { get; set; } 

    }
}
