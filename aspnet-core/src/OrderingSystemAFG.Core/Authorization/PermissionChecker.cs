using Abp.Authorization;
using OrderingSystemAFG.Authorization.Roles;
using OrderingSystemAFG.Authorization.Users;

namespace OrderingSystemAFG.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
