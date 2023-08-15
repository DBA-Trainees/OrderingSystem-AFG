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

                    // #region Admin
                    { path: 'users', component: UsersComponent, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent,  canActivate: [AppRouteGuard] },
                    { path: 'division', component: DivisionComponent, canActivate: [AppRouteGuard] },
                    
                    // #endregion

                    // #region Vendor
                    { path: 'category', component: CategoryComponent, canActivate: [AppRouteGuard] },
                    { path: 'food-type', component: FoodTypeComponent, canActivate: [AppRouteGuard] },
                    // #endregion

                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
