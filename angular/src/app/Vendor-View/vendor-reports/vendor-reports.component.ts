import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CustomerOrderDto, CustomerOrderDtoPagedResultDto, CustomerOrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';
import { finalize } from 'rxjs';

class PagedOrderDtoVendor extends PagedRequestDto
{
    keyword: string;
    IsActive: boolean | null;

}


@Component({
  selector: 'app-vendor-reports',
  templateUrl: './vendor-reports.component.html',
  styleUrls: ['./vendor-reports.component.css']
})


export class VendorReportsComponent extends PagedListingComponentBase<CustomerOrderDto>
{

  orderList: CustomerOrderDto[] = [];
  totalSales: number = 0; 


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

      this._orderServiceProxyVendor.getAllPaidOrders(
        request.keyword,
        request.IsActive,
        request.skipCount,
        request.maxResultCount,
      )
      .pipe(
          finalize(() => {
              finishedCallback();
              this.UpdatedTotalSales();

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

  UpdatedTotalSales(): number
  {
      this.totalSales = this.orderList.reduce((total, orderDto) => {
            return total + orderDto.grandTotal}, 0
      );   

      return this.totalSales;

  }



}
