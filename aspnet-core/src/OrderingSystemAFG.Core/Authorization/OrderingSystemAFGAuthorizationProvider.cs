using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace OrderingSystemAFG.Authorization
{
    public class OrderingSystemAFGAuthorizationProvider : AuthorizationProvider
    {
        /*  (2)  */
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);

            #region Vendor View
                var vendorView = context.GetPermissionOrNull(PermissionNames.Pages_Users_Vendor) ?? context.CreatePermission(PermissionNames.Pages_Users_Vendor, L("Vendor Main Navigation"));

                vendorView.CreateChildPermission(PermissionNames.Pages_Vendor_Category, L("Category View"));
                vendorView.CreateChildPermission(PermissionNames.Pages_Vendor_Type, L("Food Type View")); 
            #endregion

            #region Admin View
                var adminView = context.GetPermissionOrNull(PermissionNames.Pages_User_Admin) ?? context.CreatePermission(PermissionNames.Pages_User_Admin, L("Admin Main Navigation"));
 
                adminView.CreateChildPermission(PermissionNames.Pages_Admin_Divisions, L("Division View"));
            #endregion

            #region Customer View

            #endregion


        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, OrderingSystemAFGConsts.LocalizationSourceName);
        }
    }
}
