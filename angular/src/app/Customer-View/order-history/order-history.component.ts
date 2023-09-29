import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CustomerOrderDto, CustomerOrderDtoPagedResultDto, CustomerOrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';

class PagedCustomerOrderDto extends PagedRequestDto
{
    keyword: string;
    IsActive: boolean | null;

}


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  animations: [appModuleAnimation()],
})


export class OrderHistoryComponent extends PagedListingComponentBase<CustomerOrderDto>
{

  orderList: CustomerOrderDto[] = [];
  orderDtoCustomer = new CustomerOrderDto();

  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
      injector: Injector,
      private _orderServiceProxyCustomer: CustomerOrderServiceProxy,
  )
  {
      super(injector);
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  protected list(request: PagedCustomerOrderDto, pageNumber: number, finishedCallback: Function): void {

      this._orderServiceProxyCustomer.getAllConfirmedOrdersCustomer(
          request.keyword,
          request.IsActive,
          request.skipCount,
          request.maxResultCount
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
    //throw
  }

  


}
