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

        #endregion


        #region Vendor
        public const string Pages_Users_Vendor = "Pages.User.Vendor";
            public const string Pages_Vendor_Category = "Pages.Vendor.Category";

        #endregion


        #region Customers


        #endregion

    }
}
