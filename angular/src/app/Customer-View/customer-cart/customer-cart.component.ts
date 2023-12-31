import { Component, EventEmitter, Injector, Output } from '@angular/core';

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
import { CheckoutSummaryComponent } from '../customer-checkout/checkout-summary/checkout-summary.component';

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
  accumulatedOrders: number = 0;
  dateToday = new Date();

  @Output() onSave = new EventEmitter<any>();

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

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
      let finalUpdatedQuantityOfOrder = Math.round(updatedQuantityOfOrder);

      let currentStock = selectedOrder.food?.totalStock; 
      let updatedStock = currentStock + finalUpdatedQuantityOfOrder;
	
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
      let finalOldQuantityOfOrder = Math.round(oldQuantityOfOrder);

      let updatedQuantityOfOrder = updatedAmount / orignalAmount; 
      let finalUpdatedQuantityOfOrder = Math.round(updatedQuantityOfOrder);

      let currentStock = orderDtoParameter.food?.totalStock; 
      let orginalStock = currentStock + finalOldQuantityOfOrder;
      let updatedStock = orginalStock - finalUpdatedQuantityOfOrder; 
 
      orderDtoParameter.totalAmountTobePay = updatedAmount;
      orderDtoParameter.totalQuantityOfOrder = finalUpdatedQuantityOfOrder; 
      orderDtoParameter.food.totalStock = updatedStock;
      orderDtoParameter.grandTotal = this.UpdatedGrandTotal();
      orderDtoParameter.checkoutTotalAccumulatedOrders = this.AccumulatedQuantityOfOrders();

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

  AccumulatedQuantityOfOrders(): number
  {

        this.accumulatedOrders = this.orderItems.reduce((total, orderDto) => {
            return total + orderDto.totalQuantityOfOrder}, 0
        );   

        return this.accumulatedOrders;

  }


  ProceedToCheckout(referenceNumber: string): void
  {

        abp.message.confirm(
        
            this.l('ConfirmCheckoutMessage'),
            undefined,
            (result: boolean) => {
              if (result) {

                    
                    const finalOrderDto = new CustomerOrderDto();

                    finalOrderDto.listOfOrders = this.orderItems.map((order) => {
            
                        const orderDtoNew = new CustomerOrderDto();
            
                        orderDtoNew.id = order.id;
                        orderDtoNew.foodId = order.foodId;
                        orderDtoNew.sizeId = order.sizeId;
                        orderDtoNew.categoryId = order.categoryId;
                        orderDtoNew.checkoutStatusNumber = 3;
                        orderDtoNew.orderStatus = false;
                        orderDtoNew.notes = order.notes;
                        orderDtoNew.totalQuantityOfOrder = order.totalQuantityOfOrder;
                        orderDtoNew.totalAmountTobePay = order.totalAmountTobePay;
                        orderDtoNew.grandTotal = this.UpdatedGrandTotal();
                        orderDtoNew.dateAndTimeOrderIsPlaced = moment(this.dateToday);
                        orderDtoNew.checkoutTotalAccumulatedOrders = this.AccumulatedQuantityOfOrders();
                        //finalOrderDto.customerName = this.
                        //finalOrderDto.divisionId = selectedDivision
            
                        return orderDtoNew;
            
                    });
            
                    this._orderServiceProxy.updateStatusNumberIntoThree(finalOrderDto).subscribe((result) => {
                        
                        referenceNumber = result.referenceNumber;
                        this.notify.info(this.l("Ordered Succesfully"));
                        
                        this.onSave.emit(result);
                        this.CheckOut(referenceNumber); 
                        this.refresh();
            
            
                    });


  
              }
            }
        );



  }

  CheckOut(referenceNumber: string): void
  {
        this.ShowCheckOutSummary(referenceNumber);
  }

  private ShowCheckOutSummary(referenceNumber?: string)
  {
       let showCheckoutSummary: BsModalRef;

       showCheckoutSummary = this._orderModalService.show(CheckoutSummaryComponent, {
            class: "modal-lg",
            initialState: {referenceNumber: referenceNumber},
       });

  }

  UpdatedMaxQuantity(orderDto : CustomerOrderDto): number
  {

        let orignalAmount = orderDto.food?.price; 
        let oldAmmount = orderDto.totalAmountTobePay; 

        let oldQuantityOfOrder = oldAmmount / orignalAmount; 
        let finalOldQuantityOfOrder = Math.round(oldQuantityOfOrder);

        let currentStock = orderDto.food?.totalStock; 


        return currentStock + finalOldQuantityOfOrder;

  }
    
  
  
    
}
