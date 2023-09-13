import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from '@shared/app-component-base';
import {
    Router,
    RouterEvent,
    NavigationEnd,
    PRIMARY_OUTLET
} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MenuItem} from '@shared/layout/menu-item';

@Component({
    selector: 'sidebar-menu',
    templateUrl: './sidebar-menu.component.html'
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
    menuItems: MenuItem[];
    menuItemsMap: { [key: number]: MenuItem } = {};
    activatedMenuItems: MenuItem[] = [];
    routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
    homeRoute = '/app/about';

    constructor(injector: Injector, private router: Router) {
        super(injector);
        this.router.events.subscribe(this.routerEvents);
    }

    ngOnInit(): void {
        this.menuItems = this.getMenuItems();
        this.patchMenuItems(this.menuItems);
        this.routerEvents
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event) => {
                const currentUrl = event.url !== '/' ? event.url : this.homeRoute;
                const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root
                    .children[PRIMARY_OUTLET];
                if (primaryUrlSegmentGroup) {
                    this.activateMenuItems('/' + primaryUrlSegmentGroup.toString());
                }
            });
    }

    // #region (5) Navigation Provider 
    getMenuItems(): MenuItem[] {
        return [

            //new MenuItem(this.l('HomePage'), '/app/home', 'fas fa-home'),
            //new MenuItem(this.l('Tenants'), '/app/tenants', 'fas fa-building', 'Pages.Tenants'),
            //new MenuItem(this.l('About'), '/app/about', 'fas fa-info-circle'),
            
             // #region Admin Menu
             new MenuItem(this.l("AdminNav"), '', 'fas fa-user-tie', 'Pages.User.Admin', [     
                new MenuItem(this.l('Division'), '/app/division', 'fas fa-sitemap', 'Pages.Admin.Divisions'),   
                new MenuItem(this.l('Roles'), '/app/roles','fas fa-theater-masks', 'Pages.User.Admin'),
                new MenuItem(this.l('Users'), '/app/users', 'fas fa-users', 'Pages.User.Admin'),
                new MenuItem(this.l('Customer'), '/app/customer-with-division', 'fas fa-restroom', 'Pages.User.Admin'),
            ]),
            // #endregion

            // #region Vendor Menu 
            new MenuItem(this.l("VendorNav"), '', 'fas fa-store', 'Pages.User.Vendor', [
                new MenuItem(this.l('Category'), '/app/category', 'fa fa-list', 'Pages.Vendor.Category'),
                new MenuItem(this.l('FoodType'), '/app/food-type', 'fas fa-utensils', 'Pages.Vendor.Type'),
                new MenuItem(this.l('FoodSize'), '/app/food-size', 'fas fa-ruler', 'Pages.Vendor.Size'),
                new MenuItem(this.l('FoodList'), '/app/food-list', 'fas fa-pizza-slice', 'Pages.Vendor.Food.List'),
                new MenuItem(this.l('Order List'), '/app/vendor-order-list', 'fas fa-clipboard-list', 'Pages.Vendor.Order.List'),
            ]),
            // #endregion

            // #region Customer View
            new MenuItem(this.l("CustomerNav"), '', 'fas fa-user-friends', 'Pages.User.Customer', [
                new MenuItem(this.l('Food Menu'), '/app/customer-menu', 'fas fa-burger', 'Pages.Customers.Menu' ),
                new MenuItem(this.l('Add to Cart'), '/app/customer-cart', 'fas fa-cart-shopping', 'Pages.Customers.Cart'),
                new MenuItem(this.l('Checkout Status'), '/app/customer-checkout', 'fas fa-tags', 'Pages.Customers.Checkout'),
                new MenuItem(this.l('Order History'), '/app/order-history', 'fas fa-clock-rotate-left', 'Pages.Customers.Order.History'),
                
            ]),
            // #endregion


        ];
    }
    // #endregion

    patchMenuItems(items: MenuItem[], parentId?: number): void {
        items.forEach((item: MenuItem, index: number) => {
            item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;
            if (parentId) {
                item.parentId = parentId;
            }
            if (parentId || item.children) {
                this.menuItemsMap[item.id] = item;
            }
            if (item.children) {
                this.patchMenuItems(item.children, item.id);
            }
        });
    }

    activateMenuItems(url: string): void {
        this.deactivateMenuItems(this.menuItems);
        this.activatedMenuItems = [];
        const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
        foundedItems.forEach((item) => {
            this.activateMenuItem(item);
        });
    }

    deactivateMenuItems(items: MenuItem[]): void {
        items.forEach((item: MenuItem) => {
            item.isActive = false;
            item.isCollapsed = true;
            if (item.children) {
                this.deactivateMenuItems(item.children);
            }
        });
    }

    findMenuItemsByUrl(
        url: string,
        items: MenuItem[],
        foundedItems: MenuItem[] = []
    ): MenuItem[] {
        items.forEach((item: MenuItem) => {
            if (item.route === url) {
                foundedItems.push(item);
            } else if (item.children) {
                this.findMenuItemsByUrl(url, item.children, foundedItems);
            }
        });
        return foundedItems;
    }

    activateMenuItem(item: MenuItem): void {
        item.isActive = true;
        if (item.children) {
            item.isCollapsed = false;
        }
        this.activatedMenuItems.push(item);
        if (item.parentId) {
            this.activateMenuItem(this.menuItemsMap[item.parentId]);
        }
    }

    isMenuItemVisible(item: MenuItem): boolean {
        if (!item.permissionName) {
            return true;
        }
        return this.permission.isGranted(item.permissionName);
    }
}
