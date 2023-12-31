import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';

// #region (4) Declare the Component here first before adding into path
import { CategoryComponent } from './Vendor-View/category/category.component';
import { DivisionComponent } from './Admin-View/division/division.component';
import { FoodTypeComponent } from './Vendor-View/food-type/food-type.component';
import { FoodSizeComponent } from './Vendor-View/food-size/food-size.component';
import { CustomerWithDivisionComponent } from './customer-with-division/customer-with-division.component';
import { FoodListComponent } from './Vendor-View/food-list/food-list.component';
import { CustomerMenuComponent } from './Customer-View/customer-menu/customer-menu.component';
import { CustomerCartComponent } from './Customer-View/customer-cart/customer-cart.component';
import { CustomerCheckoutComponent } from './Customer-View/customer-checkout/customer-checkout.component';
import { OrderHistoryComponent } from './Customer-View/order-history/order-history.component';
import { VendorOrderListComponent } from './Vendor-View/vendor-order-list/vendor-order-list.component';
import { VendorOrderHistoryComponent } from './Vendor-View/vendor-order-history/vendor-order-history.component';
import { CustomerReportComponent } from './Customer-View/customer-report/customer-report.component';
import { VendorReportsComponent } from './Vendor-View/vendor-reports/vendor-reports.component';
// #endregion

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [

                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, canActivate: [AppRouteGuard] },
                    { path: 'customer-with-division', component: CustomerWithDivisionComponent, data: { permission: 'Pages.User.Admin'}, canActivate: [AppRouteGuard] },

                    // #region Admin
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.User.Admin'}, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.User.Admin'}, canActivate: [AppRouteGuard] },
                    { path: 'division', component: DivisionComponent, data: { permission: 'Pages.User.Admin'}, canActivate: [AppRouteGuard] },
                    
                    // #endregion

                    // #region Vendor
                    { path: 'category', component: CategoryComponent, data: { permission: 'Pages.User.Vendor'}, canActivate: [AppRouteGuard] },
                    { path: 'food-type', component: FoodTypeComponent, data: { permission: 'Pages.User.Vendor'}, canActivate: [AppRouteGuard] },
                    { path: 'food-size', component: FoodSizeComponent, data: { permission: 'Pages.User.Vendor'}, canActivate: [AppRouteGuard] },
                    { path: 'food-list', component: FoodListComponent, data: { permission: 'Pages.User.Vendor'}, canActivate: [AppRouteGuard] },
                    { path: 'vendor-order-list', component: VendorOrderListComponent, data: { permission: 'Pages.User.Vendor'}, canActivate: [AppRouteGuard] },
                    { path: 'vendor-order-history', component: VendorOrderHistoryComponent, data: { permission: 'Pages.User.Vendor'}, canActivate: [AppRouteGuard] },
                    { path: 'vendor-reports', component: VendorReportsComponent, data: { permission: 'Pages.User.Vendor'}, canActivate: [AppRouteGuard] },
                    
                    // #endregion

                    // #region Customer
                    { path: 'customer-menu', component: CustomerMenuComponent, data: { permission: 'Pages.User.Customer'}, canActivate: [AppRouteGuard] },
                    { path: 'customer-cart', component: CustomerCartComponent, data: { permission: 'Pages.User.Customer'}, canActivate: [AppRouteGuard] },
                    { path: 'customer-checkout', component: CustomerCheckoutComponent, data: { permission: 'Pages.User.Customer'}, canActivate: [AppRouteGuard] },
                    { path: 'order-history', component: OrderHistoryComponent, data: { permission: 'Pages.User.Customer'}, canActivate: [AppRouteGuard] },
                    { path: 'customer-report', component: CustomerReportComponent, data: { permission: 'Pages.User.Customer'}, canActivate: [AppRouteGuard] },
                    
                    // #endregion 

                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
