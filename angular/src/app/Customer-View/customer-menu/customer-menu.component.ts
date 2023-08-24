import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';

import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CustomerOrderDto, CustomerOrderServiceProxy, FoodDto, FoodDtoPagedResultDto, FoodServiceProxy, SizeDto } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

import { CustomerCartComponent } from '../customer-cart/customer-cart.component';
import { Router } from '@angular/router';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';

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
  sizeItems: SizeDto[] = [];
  orderDto = new CustomerOrderDto();
  foodDto = new FoodDto();
  saving = false;
  id: number = 0;

  QuantityOfOrder: number = 1;
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
      this.orderDto.totalAmountTobePay = selectedItem.price * this.QuantityOfOrder;
      this.orderDto.sizeId = this.selectedSize; 
      this.orderDto.divisionId = this.selectedDivision;
      this.orderDto.totalQuantityOfOrder = this.QuantityOfOrder;
      this.orderDto.orderStatus = true;

      selectedItem.totalStock = selectedItem.totalStock - this.QuantityOfOrder; 

      this._orderServiceProxy.putOrdersToCart(this.orderDto).subscribe((request) => {
          this.notify.info(this.l('Added to Cart'));
          this.onSave.emit(request);

          this.orderRouter.navigate(["./app/customer-cart"]);
      });

      this._foodServiceProxy.update(selectedItem).subscribe(() => {

      }); 
      

  }

  ShowMoreDetails(id): void
  {
        this.ShowAddToCartComponent(id);
  }


  private ShowAddToCartComponent(id?: number): void
  {
        let showAddToCartComponent: BsModalRef;

        showAddToCartComponent = this._orderModalService.show(AddToCartComponent, {
            class: 'modal-lg',
            initialState: {id: id},
        });

        showAddToCartComponent.content.onSave.subscribe(() => {
            this.refresh();
        });

  }

  


}
