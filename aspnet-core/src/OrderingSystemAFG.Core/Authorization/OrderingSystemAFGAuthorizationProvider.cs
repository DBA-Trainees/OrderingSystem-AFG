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

            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
            

            #region Vendor View
            var vendorView = context.GetPermissionOrNull(PermissionNames.Pages_Users_Vendor) ?? context.CreatePermission(PermissionNames.Pages_Users_Vendor, L("Vendor Main Navigation"));

                vendorView.CreateChildPermission(PermissionNames.Pages_Vendor_Category, L("Category View"));
                vendorView.CreateChildPermission(PermissionNames.Pages_Vendor_Type, L("Food Type View"));
                vendorView.CreateChildPermission(PermissionNames.Pages_Vendor_Size, L("Food Size View"));
                vendorView.CreateChildPermission(PermissionNames.Pages_Vendor_Food_List, L("Food List View"));
                vendorView.CreateChildPermission(PermissionNames.Pages_Vendor_Order_List, L("Vendor Order List View"));
            #endregion

            #region Admin View
            var adminView = context.GetPermissionOrNull(PermissionNames.Pages_User_Admin) ?? context.CreatePermission(PermissionNames.Pages_User_Admin, L("Admin Main Navigation"));
 
                adminView.CreateChildPermission(PermissionNames.Pages_Admin_Divisions, L("Division View"));
                context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
                context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            #endregion

            #region Customer View
                var customerView = context.GetPermissionOrNull(PermissionNames.Pages_User_Customer) ?? context.CreatePermission(PermissionNames.Pages_User_Customer, L("Customer Main View"));
                
                customerView.CreateChildPermission(PermissionNames.Pages_Customers_Menu, L("Customer Menu View"));
                customerView.CreateChildPermission(PermissionNames.Pages_Customers_Cart, L("Customer Cart View"));
                customerView.CreateChildPermission(PermissionNames.Pages_Customers_Checkout, L("Customer Checkout View"));
                customerView.CreateChildPermission(PermissionNames.Pages_Customers_Order_History, L("Customer Order History View")); 
            #endregion


        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, OrderingSystemAFGConsts.LocalizationSourceName);
        }
    }
}
