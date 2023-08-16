﻿namespace OrderingSystemAFG.Authorization
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
        #endregion


        #region Customers


        #endregion

    }
}
