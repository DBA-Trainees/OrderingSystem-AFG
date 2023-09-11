import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CustomerOrderDto, CustomerOrderDtoPagedResultDto, CustomerOrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

class PagedOrderDto extends PagedRequestDto
{
    keyword: string;
    IsActive: boolean | null;
}

@Component({
  selector: 'app-customer-checkout',
  templateUrl: './customer-checkout.component.html',
  styleUrls: ['./customer-checkout.component.css'],
  animations: [appModuleAnimation()],
})

export class CustomerCheckoutComponent extends PagedListingComponentBase<CustomerOrderDto> {
  
  checkoutItems: CustomerOrderDto[] = [];
  orderDto = new CustomerOrderDto();

  grandTotal: number = 0;

  constructor(
      injector: Injector,
      private _orderServiceProxy: CustomerOrderServiceProxy,
      private _checkoutModalService: BsModalService,
      private checkoutRouter: Router,
  )
  {
      super(injector);
  }
  
  
  protected list(request: PagedOrderDto, pageNumber: number, finishedCallback: Function): void {

      this._orderServiceProxy.getAllOrderWhereTheStatusNumberIsThree(
          request.keyword,
          request.IsActive,
          request.skipCount,
          request.maxResultCount
      )
      .pipe(
          finalize(() => {
            finishedCallback();
            this.GrandTotal();
          })
      )
      .subscribe((result: CustomerOrderDtoPagedResultDto) => {
          this.checkoutItems = result.items;
          this.showPaging(result, pageNumber);
      });


  }

  protected delete(entity: CustomerOrderDto): void {
    throw new Error('Method not implemented.');
  }

  UpdatedSubTotal(orderDto : CustomerOrderDto): number
  {
      let originalAmmount = orderDto.food?.price;
      let quantity = orderDto.totalQuantityOfOrder;
      let subTotal = 0;

      subTotal = originalAmmount * quantity;

      return subTotal;
  }

  GrandTotal(): number
  {
      this.grandTotal = this.checkoutItems.reduce((total, orderDto) => {
            return total + this.UpdatedSubTotal(orderDto)}, 0
      );   

      return this.grandTotal;

  }

  private PlacedTheOrder(referenceNumber?: string): void
  {
       // Use modal to see the confirmation of order
       //Change the status number to 4 
       //Then redirect to List of Purchased Order Component

       //To be continue    

  }


}
