import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CustomerOrderDto, CustomerOrderDtoPagedResultDto, CustomerOrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { VendorEditOrderComponent } from './vendor-edit-order/vendor-edit-order.component';

class PagedVendorOrderDto extends PagedRequestDto
{
    keyword: string;
    IsActive: boolean | null;
}


@Component({
  selector: 'app-vendor-order-list',
  templateUrl: './vendor-order-list.component.html',
  styleUrls: ['./vendor-order-list.component.css'],
  animations: [appModuleAnimation()],
})

export class VendorOrderListComponent extends PagedListingComponentBase<CustomerOrderDto>
{

  orderList: CustomerOrderDto[] = [];
  orderDtoVendor = new CustomerOrderDto();

  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;

  @Output() onSave = new EventEmitter<any>();

  constructor(
      injector: Injector,
      private _orderServiceProxyVendor: CustomerOrderServiceProxy,
      private _vendorOrderListModalService: BsModalService,
      //private vendorOrderListRouter: Router,
  )
  {
      super(injector);
  }


  protected list(request: PagedVendorOrderDto, pageNumber: number, finishedCallback: Function): void {

      this._orderServiceProxyVendor.getAllOrderWhereTheStatusNumberIsThree(
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

  protected delete(selectedOrder: CustomerOrderDto): void {

        abp.message.confirm(this.l('DeleteMessage', selectedOrder.food?.foodName), undefined,
            (condition: boolean) => {
                if (condition)
                {

                    selectedOrder.checkoutStatusNumber = 4;
                    selectedOrder.orderStatus = true; 


                    this._orderServiceProxyVendor.update(selectedOrder).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.refresh();

                    });

                }
            }
        );

        /* Tasukete */ 

  }

}
