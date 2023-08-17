import { Component, EventEmitter, Injector, Output } from '@angular/core';

import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CustomerOrderDto, CustomerOrderServiceProxy, FoodDto, FoodDtoPagedResultDto, FoodServiceProxy } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

import { CustomerCartComponent } from '../customer-cart/customer-cart.component';
import { Router } from '@angular/router';

class PagedOrderRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}



@Component({
  selector: 'app-customer-menu',
  templateUrl: './customer-menu.component.html',
  styleUrls: ['./customer-menu.component.css'],
  animations: [appModuleAnimation()],
})

export class CustomerMenuComponent extends PagedListingComponentBase<CustomerOrderDto>
{
  

  foodItems: FoodDto[] = [];
  orderDto = new CustomerOrderDto();
  foodDto = new FoodDto();
  saving = false;
  id: number = 0;

  totalQuantityOfOrder: number = 1;
  dateToday = new Date();
  selectedCategory: number = null;
  selectedDivision: number = null;
  selectedSize: number = null;
  selectedFood: number = null;

  @Output() onSave = new EventEmitter<any>();

  constructor(
      injector: Injector,
      private _orderServiceProxy: CustomerOrderServiceProxy,
      private _foodServiceProxy: FoodServiceProxy, 
      private _orderModalService: BsModalService,
      private orderRouter: Router,
  )
  {
      super(injector);
  }


  protected list(request: PagedOrderRequestDto, pageNumber: number, finishedCallback: Function): void {
    
      this._foodServiceProxy.getAllTheFoodItemWhereAvailabilityIsTrue(
          request.keyword,
          request.isActive,
          request.skipCount,
          request.maxResultCount
      )
      .pipe(
          finalize(() => {
              finishedCallback();
          })
      )
      .subscribe((result: FoodDtoPagedResultDto) => {
          this.foodItems = result.items;
          this.showPaging(result, pageNumber);
      })

  }
  
  protected delete(entity: CustomerOrderDto): void {
    throw new Error('Method not implemented.');
  }

  AddToCart(selectedItem: FoodDto): void
  {
      this.orderDto.foodId = selectedItem.id;
      this.orderDto.dateAndTimeOrderIsPlaced = moment(this.dateToday);
      this.orderDto.totalAmountTobePay = this.orderDto.food?.price * this.totalQuantityOfOrder;
      this.orderDto.sizeId = this.selectedSize;
      this.orderDto.totalAmountTobePay = selectedItem.price * this.totalQuantityOfOrder;
      this.orderDto.divisionId = this.selectedDivision;
      this.orderDto.totalQuantityOfOrder = this.totalQuantityOfOrder;
      this.orderDto.orderStatus = false;

      this._orderServiceProxy.putOrdersToCart(this.orderDto).subscribe((request) => {
          this.notify.info(this.l('Added to Cart'));
          this.onSave.emit(request);

          this.orderRouter.navigate(["./app/customer-cart"]);
      });
      

  }



}
