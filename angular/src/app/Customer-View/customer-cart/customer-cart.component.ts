import { Component, Injector } from '@angular/core';

import { CustomerMenuComponent } from '../customer-menu/customer-menu.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CategoryDto, CustomerDto, CustomerOrderDto, CustomerOrderDtoPagedResultDto, CustomerOrderServiceProxy, DivisionDto, FoodDto, SizeDto } from '@shared/service-proxies/service-proxies';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

class PagedOrderDto extends PagedRequestDto
{
    keyword: string;
    IsActive: boolean | null;
}



@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})

export class CustomerCartComponent extends PagedListingComponentBase<CustomerDto>
{

  orderItems: CustomerOrderDto[] = [];
  orderDto = new CustomerOrderDto();
  categoryDto = new CategoryDto();
  divisionDto = new DivisionDto();
  sizeDto = new SizeDto();
  foodDto = new FoodDto();

  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _orderServiceProxy: CustomerOrderServiceProxy,
    private _orderModalService: BsModalService,
  )
  {
      super(injector);
  }

  ShowEditOrderForm(id)
  {
      //
  }

  protected list(request: PagedOrderDto, pageNumber: number, finishedCallback: Function): void {
    
      this._orderServiceProxy.getAll(
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
          this.orderItems = result.items;
          this.showPaging(result, pageNumber);
      });


  }

  protected delete(selectedOrder: CustomerOrderDto): void {

    abp.message.confirm(
      
        this.l('DeleteMessage', selectedOrder.food?.foodName),
        undefined,
        (result: boolean) => {
          if (result) {
            this._orderServiceProxy.delete(selectedOrder.id).subscribe(() => {
              abp.notify.success(this.l('SuccessfullyDeleted'));
              this.refresh();
            });
          }
        }
    );
  }

  

    
}
