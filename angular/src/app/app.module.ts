import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';


// #region (1) Import the component here
import { CategoryComponent } from './Vendor-View/category/category.component';
import { CategoryServiceProxy, CustomerOrderServiceProxy, CustomerServiceProxy, DivisionServiceProxy, FoodServiceProxy, FoodTypeServiceProxy, SizeServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCategoryComponent } from './Vendor-View/category/create-or-edit-category/create-or-edit-category.component';
import { DivisionComponent } from './Admin-View/division/division.component';
import { CreateOrEditDivisionComponent } from './Admin-View/division/create-or-edit-division/create-or-edit-division.component';
import { FoodTypeComponent } from './Vendor-View/food-type/food-type.component';
import { CreateOrEditFoodtypeComponent } from './Vendor-View/food-type/create-or-edit-foodtype/create-or-edit-foodtype.component';
import { FoodSizeComponent } from './Vendor-View/food-size/food-size.component';
import { CreateOrEditFoodsizeComponent } from './Vendor-View/food-size/create-or-edit-foodsize/create-or-edit-foodsize.component';
import { CustomerWithDivisionComponent } from './customer-with-division/customer-with-division.component';
import { CreateOrEditCustomerwithdivisionComponent } from './customer-with-division/create-or-edit-customerwithdivision/create-or-edit-customerwithdivision.component';
import { FoodListComponent } from './Vendor-View/food-list/food-list.component';
import { CreateOrEditFoodComponent } from './Vendor-View/food-list/create-or-edit-food/create-or-edit-food.component';
import { CustomerMenuComponent } from './Customer-View/customer-menu/customer-menu.component';
import { AddToCartComponent } from './Customer-View/customer-menu/add-to-cart/add-to-cart.component';
import { CustomerCartComponent } from './Customer-View/customer-cart/customer-cart.component';
import { CustomerEditOrderComponent } from './Customer-View/customer-cart/customer-edit-order/customer-edit-order.component';
import { CustomerCheckoutComponent } from './Customer-View/customer-checkout/customer-checkout.component';
import { CheckoutSummaryComponent } from './Customer-View/customer-checkout/checkout-summary/checkout-summary.component';
import { OrderHistoryComponent } from './Customer-View/order-history/order-history.component';
import { VendorOrderListComponent } from './Vendor-View/vendor-order-list/vendor-order-list.component';
import { VendorEditOrderComponent } from './Vendor-View/vendor-order-list/vendor-edit-order/vendor-edit-order.component';
import { VendorOrderHistoryComponent } from './Vendor-View/vendor-order-history/vendor-order-history.component';
import { CustomerReportComponent } from './Customer-View/customer-report/customer-report.component';
import { VendorReportsComponent } from './Vendor-View/vendor-reports/vendor-reports.component';
import { VendorReportDetailsComponent } from './Vendor-View/vendor-reports/vendor-report-details/vendor-report-details.component';
import { CustomerReportDetailsComponent } from './Customer-View/customer-report/customer-report-details/customer-report-details.component';


// #endregion

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        // tenants
        TenantsComponent,
        CreateTenantDialogComponent,
        EditTenantDialogComponent,
        // roles
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent,

        // #region (2) Declare the components here
        CategoryComponent,
        CreateOrEditCategoryComponent,
        DivisionComponent,
        CreateOrEditDivisionComponent,
        FoodTypeComponent,
        CreateOrEditFoodtypeComponent,
        FoodSizeComponent,
        CreateOrEditFoodsizeComponent,
        CustomerWithDivisionComponent,
        CreateOrEditCustomerwithdivisionComponent,
        FoodListComponent,
        CreateOrEditFoodComponent,
        CustomerMenuComponent,
        AddToCartComponent,
        CustomerCartComponent,
        CustomerEditOrderComponent,
        CustomerCheckoutComponent,
        CheckoutSummaryComponent,
        OrderHistoryComponent,
        VendorOrderListComponent,
        VendorEditOrderComponent,
        VendorOrderHistoryComponent,
        CustomerReportComponent,
        VendorReportsComponent,
        VendorReportDetailsComponent,
        CustomerReportDetailsComponent,


        // #endregion
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
    ],
    providers: [
        // #region (3) Declare the serviceproxy here
        CategoryServiceProxy,
        DivisionServiceProxy,
        FoodTypeServiceProxy,
        SizeServiceProxy,
        CustomerServiceProxy,
        FoodServiceProxy,
        CustomerOrderServiceProxy,
        
        // #endregion

    ]
})
export class AppModule {}
