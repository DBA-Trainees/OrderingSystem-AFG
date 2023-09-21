import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CustomerOrderDto, CustomerOrderDtoPagedResultDto, CustomerOrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';

class PagedOrderDtoVendor extends PagedRequestDto
{
    keyword: string;
    IsActive: boolean | null;

}


@Component({
  selector: 'app-vendor-order-history',
  templateUrl: './vendor-order-history.component.html',
  styleUrls: ['./vendor-order-history.component.css'],
  animations: [appModuleAnimation()],
})


export class VendorOrderHistoryComponent extends PagedListingComponentBase<CustomerOrderDto>
{

  orderList: CustomerOrderDto[] = [];
  orderDtoCustomer = new CustomerOrderDto();

  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
      injector: Injector,
      private _orderServiceProxyVendor: CustomerOrderServiceProxy,
  )
  {
      super(injector);
  }

  protected list(request: PagedOrderDtoVendor, pageNumber: number, finishedCallback: Function): void {
    
      this._orderServiceProxyVendor.getAllPreviousOrderVendor(
        request.keyword,
        request.IsActive,
        request.skipCount,
        request.maxResultCount,
    )
    .pipe(
        finalize(() => {
            finishedCallback();
        })
    )
    .subscribe((result: CustomerOrderDtoPagedResultDto) => {
        this.orderList = result.items;
        this.showPaging(result, pageNumber);
    });


  }

  protected delete(entity: CustomerOrderDto): void {
    //throw new Error('Method not implemented.');
  }
  

}
