namespace OrderingSystemAFG.Authorization
{
    /*  (1) */
    public static class PermissionNames
    {

        #region Default
            public const string Pages_Tenants = "Pages.Tenants";
            public const string Pages_Users = "Pages.Users";
            public const string Pages_Users_Activation = "Pages.Users.Activation";
            public const string Pages_Roles = "Pages.Roles";
        #endregion

        #region Admin
            public const string Pages_User_Admin = "Pages.User.Admin"; 
            public const string Pages_Admin_Divisions = "Pages.Admin.Divisions";
            public const string Pages_Admin_Users = "Pages.Admin.Users";
            public const string Pages_Admin_Roles = "Pages.Admin.Roles";
        #endregion


        #region Vendor
            public const string Pages_Users_Vendor = "Pages.User.Vendor";
            public const string Pages_Vendor_Category = "Pages.Vendor.Category";
            public const string Pages_Vendor_Type = "Pages.Vendor.Type";
            public const string Pages_Vendor_Size = "Pages.Vendor.Size";
            public const string Pages_Vendor_Food_List = "Pages.Vendor.Food.List";
            public const string Pages_Vendor_Order_List = "Pages.Vendor.Order.List";
            public const string Pages_Vendor_Order_History = "Pages.Vendor.Order.History"; 
            public const string Pages_Vendor_Reports = "Pages.Vendor.Reports"; 
        #endregion


        #region Customers
            public const string Pages_User_Customer = "Pages.User.Customer";
            public const string Pages_Customers_Menu = "Pages.Customers.Menu";
            public const string Pages_Customers_Cart = "Pages.Customers.Cart";
            public const string Pages_Customers_Checkout = "Pages.Customers.Checkout";
            public const string Pages_Customers_Order_History = "Pages.Customers.Order.History"; 
            public const string Pages_Customers_Order_Report = "Pages.Customers.Order.Report"; 
        #endregion

    }
}
