import { Component, Injector } from '@angular/core';
import { VendorReportDetailsComponent } from '@app/Vendor-View/vendor-reports/vendor-report-details/vendor-report-details.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CustomerOrderDto, CustomerOrderDtoPagedResultDto, CustomerOrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CustomerReportDetailsComponent } from './customer-report-details/customer-report-details.component';

class PagedOrderDtoCustomer extends PagedRequestDto
{
    keyword: string;
    IsActive: boolean | null;

}

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css'],
  animations: [appModuleAnimation()],
})

export class CustomerReportComponent extends PagedListingComponentBase<CustomerOrderDto> 
{

  orderList: CustomerOrderDto[] = [];
  orderDtoCustomer = new CustomerOrderDto();

  totalSpendingAmount: number = 0; 

  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
      injector: Injector,
      private _orderServiceProxyCustomer: CustomerOrderServiceProxy,
      private _orderModalServiceCustomer: BsModalService,
  )
  {
      super(injector);
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }


  protected list(request: PagedOrderDtoCustomer, pageNumber: number, finishedCallback: Function): void {
    
    this._orderServiceProxyCustomer.getAllPaidOrders(
        request.keyword,
        request.IsActive,
        request.skipCount,
        request.maxResultCount,
    )
    .pipe(
        finalize(() => {
            finishedCallback();
            this.UpdatedTotalSpending();
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

  UpdatedTotalSpending(): number
  {
      this.totalSpendingAmount = this.orderList.reduce((total, orderDto) => {
            return total + orderDto.grandTotal}, 0
      );   

      return this.totalSpendingAmount;


  }

  View(referenceNumber: string): void
  {

      this.ViewSelected(referenceNumber);

  }


  private ViewSelected(referenceNumber?: string): void
  {
      let showReportDetailsComponents: BsModalRef;

      showReportDetailsComponents = this._orderModalServiceCustomer.show(CustomerReportDetailsComponent, {
          class: 'modal-lg',
          initialState: {referenceNumber: referenceNumber},

      });

  } 



}

