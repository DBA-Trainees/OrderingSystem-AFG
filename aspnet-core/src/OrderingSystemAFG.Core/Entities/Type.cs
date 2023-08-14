using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Entities
{
    public class Type : FullAuditedEntity<int>
    {
        /* List Columns */

        public int FoodTypeName { get; set; }

    }
}
