using Abp.Domain.Entities.Auditing;
using OrderingSystemAFG.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.Entities
{
    public class Division : FullAuditedEntity<int>
    {
        /* List Columns */
        public string DivisionName { get; set; } 

    }
}
