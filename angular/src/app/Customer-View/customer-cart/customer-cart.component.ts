import { Component, Injector } from '@angular/core';

import { CustomerMenuComponent } from '../customer-menu/customer-menu.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CategoryDto, CustomerDto, CustomerOrderDto, CustomerOrderDtoPagedResultDto, CustomerOrderServiceProxy, DivisionDto, FoodDto, SizeDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CustomerEditOrderComponent } from './customer-edit-order/customer-edit-order.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Router } from '@angular/router';

class PagedOrderDto extends PagedRequestDto
{
    keyword: string;
    IsActive: boolean | null;
}

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css'],
  animations: [appModuleAnimation()],
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
    private customerCartRouter: Router,
  )
  {
      super(injector);
  }

  ShowEditOrderForm(id)
  {
      this.EditCustomerOrder(id);
  }

  ShowCustomerMenu()
  {
    this.customerCartRouter.navigate(["./app/customer-menu"]); 
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

  private EditCustomerOrder(id?: number): void
  {
      let showCustomerEditCompoment: BsModalRef;

      showCustomerEditCompoment = this._orderModalService.show(CustomerEditOrderComponent, {
        class: 'modal-lg',
        initialState : {id : id}, 
      });

      showCustomerEditCompoment.content.onSave.subscribe(() => {
          this.refresh();
      });


  }

  UpdateQuantity(orderDtoParameter: CustomerOrderDto): void
  {
      orderDtoParameter.totalAmountTobePay = this.UpdatedTotalAmmountToPay(orderDtoParameter);

      if(orderDtoParameter.totalQuantityOfOrder <= 0)
      {
          abp.message.error(this.l('CannotBeLessThanZeroMessage'));
      }
      else
      {
          if(orderDtoParameter.totalQuantityOfOrder <= orderDtoParameter.food.totalStock)
          {
              this._orderServiceProxy.update(orderDtoParameter).subscribe(() => {
                this.notify.success(this.l('UpdatedSuccessfully'));
              });
    
          }
          else
          {
            abp.message.error(this.l('OverQuantityMessage', orderDtoParameter.food?.totalStock));
          }

      }

      
  }

  UpdatedTotalAmmountToPay(orderDto : CustomerOrderDto): number
  {
      let originalAmmount = orderDto.food?.price;

      return originalAmmount * orderDto.totalQuantityOfOrder;
  }
    
}
