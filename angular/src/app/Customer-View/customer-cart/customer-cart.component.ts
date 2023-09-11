import { Component, Injector } from '@angular/core';

import { CustomerMenuComponent } from '../customer-menu/customer-menu.component';
import { CustomerCheckoutComponent  } from '../customer-checkout/customer-checkout.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CategoryDto, CustomerDto, CustomerOrderDto, CustomerOrderDtoPagedResultDto, CustomerOrderServiceProxy, DivisionDto, FoodDto, FoodServiceProxy, SizeDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CustomerEditOrderComponent } from './customer-edit-order/customer-edit-order.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Router } from '@angular/router';
import * as moment from 'moment';

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

  grandTotal: number = 0; 
  dateToday = new Date();

  constructor(
    injector: Injector,
    private _orderServiceProxy: CustomerOrderServiceProxy,
    private _foodServiceProxy: FoodServiceProxy, 
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
              this.UpdatedGrandTotal();
          })
      )
      .subscribe((result: CustomerOrderDtoPagedResultDto) => {
          this.orderItems = result.items;
          this.showPaging(result, pageNumber);
      });


  }

  protected delete(selectedOrder: CustomerOrderDto): void {


      let orignalAmount = selectedOrder.food?.price; 
      let currentAmount = this.UpdatedTotalAmmountToPay(selectedOrder); 
      
      let updatedQuantityOfOrder = currentAmount / orignalAmount; 

      let currentStock = selectedOrder.food?.totalStock; 
      let updatedStock = currentStock + updatedQuantityOfOrder;
	
      //selectedOrder.food.totalStock = updatedStock;
      //selectedOrder.orderStatus = false;


      abp.message.confirm(
        
          this.l('DeleteMessage', selectedOrder.food?.foodName),
          undefined,
          (result: boolean) => {
            if (result) {

                selectedOrder.food.totalStock = updatedStock;
                selectedOrder.orderStatus = false;
                selectedOrder.checkoutStatusNumber = 2; 

                this._orderServiceProxy.update(selectedOrder).subscribe(() => {
                    this.refresh();
                });

                abp.notify.success(this.l('SuccessfullyDeleted'));
                
                /*
                this._orderServiceProxy.delete(selectedOrder.id).subscribe(() => {
                    abp.notify.success(this.l('SuccessfullyDeleted'));
                    this.refresh();
                });
                */    

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
      let orignalAmount = orderDtoParameter.food?.price; 
      let oldAmmount = orderDtoParameter.totalAmountTobePay; 
      let updatedAmount = this.UpdatedTotalAmmountToPay(orderDtoParameter); 

      let inputedQuantityOfOrder = orderDtoParameter.totalQuantityOfOrder; 
      let oldQuantityOfOrder = oldAmmount / orignalAmount; 
      let updatedQuantityOfOrder = updatedAmount / orignalAmount; 

      let currentStock = orderDtoParameter.food?.totalStock; 
      let orginalStock = currentStock + oldQuantityOfOrder;
      let updatedStock = orginalStock - updatedQuantityOfOrder; 
 
      orderDtoParameter.totalAmountTobePay = updatedAmount;
      orderDtoParameter.totalQuantityOfOrder = updatedQuantityOfOrder; 
      orderDtoParameter.food.totalStock = updatedStock;
      orderDtoParameter.grandTotal = this.UpdatedGrandTotal();

      if(inputedQuantityOfOrder <= 0)
      {
          abp.message.error(this.l('CannotBeLessThanZeroMessage'));
          this.refresh();
      }
      else
      {

          if(inputedQuantityOfOrder <= orginalStock)
          {

              this._orderServiceProxy.update(orderDtoParameter).subscribe(() => {
                this.notify.success(this.l('UpdatedSuccessfully'));
              }); 

              //abp.message.error(this.l('ForDebugMessageOnly', orginalStock, currentStock, updatedStock)); 
    
          }
          else
          {
              abp.message.error(this.l('OverQuantityMessage', orginalStock)); 
              this.refresh();
          }

      }

      
  }

  UpdatedTotalAmmountToPay(orderDto : CustomerOrderDto): number
  {
      let originalAmmount = orderDto.food?.price;

      return originalAmmount * orderDto.totalQuantityOfOrder;
  }

  
  UpdatedGrandTotal(): number
  {
        /* Return the accumulated Sub Total into a Grand total  */

        this.grandTotal = this.orderItems.reduce((total, orderDto) => {
            return total + this.UpdatedTotalAmmountToPay(orderDto)}, 0
        );   

        return this.grandTotal;

  }

  ProceedToCheckout(referenceNumber: string): void
  {

        const finalOrderDto = new CustomerOrderDto();

        finalOrderDto.listOfOrders = this.orderItems.map((order) => {

            const orderDtoNew = new CustomerOrderDto();

            orderDtoNew.id = order.id;
            orderDtoNew.foodId = order.foodId;
            orderDtoNew.sizeId = order.sizeId;
            orderDtoNew.categoryId = order.categoryId;
            orderDtoNew.checkoutStatusNumber = 3;
            orderDtoNew.orderStatus = true;
            orderDtoNew.totalQuantityOfOrder = order.totalQuantityOfOrder;
            orderDtoNew.totalAmountTobePay = order.totalAmountTobePay;
            orderDtoNew.grandTotal = this.UpdatedGrandTotal();
            orderDtoNew.dateAndTimeOrderIsPlaced = moment(this.dateToday);
            
            //finalOrderDto.customerName = this.
            //finalOrderDto.divisionId = selectedDivision

            return orderDtoNew;

        });

        this._orderServiceProxy.updateStatusNumberIntoThree(finalOrderDto).subscribe((result) => {
            
            referenceNumber = result.referenceNumber;
            this.notify.info(this.l("Ordered Succesfully"));
            
            //pass the reference number to checkout page this.orderNow(orderNumber); but for, use router
            
            this.customerCartRouter.navigate(["./app/customer-checkout"]); 

        });


  }
  
  
    
}
