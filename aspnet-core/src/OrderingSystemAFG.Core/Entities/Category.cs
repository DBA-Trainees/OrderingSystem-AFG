using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Entities
{
    public class Category : FullAuditedEntity<int>
    {
        /* List Columns */
        public string CategoryName { get; set; }

    }
}
