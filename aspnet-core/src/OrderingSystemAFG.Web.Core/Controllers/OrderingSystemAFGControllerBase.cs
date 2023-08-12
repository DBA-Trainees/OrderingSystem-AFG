using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace OrderingSystemAFG.Controllers
{
    public abstract class OrderingSystemAFGControllerBase: AbpController
    {
        protected OrderingSystemAFGControllerBase()
        {
            LocalizationSourceName = OrderingSystemAFGConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
