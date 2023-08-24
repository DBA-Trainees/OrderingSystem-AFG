import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryDto, CategoryServiceProxy, CustomerOrderDto, CustomerOrderServiceProxy, DivisionDto, DivisionServiceProxy, FoodDto, FoodServiceProxy, FoodTypeDto, SizeDto, SizeServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent extends AppComponentBase implements OnInit {

  foodItems: FoodDto[] = [];
  categoryItems: CategoryDto[] = [];
  typeItems: FoodTypeDto[] = [];
  divisionItems: DivisionDto[] = [];
  sizeItems: SizeDto[] = [];
  foodDto: FoodDto = new FoodDto();
  foodDtoNew = new FoodDto();
  orderDto: CustomerOrderDto = new CustomerOrderDto();
  saving: boolean;
  id: number = 0;
  dateToday = new Date();
  totalQuantityOfOrder: number = 1;
  selectedCategory: number = null;
  selectedDivision: number = null;
  selectedSize: number = null;
  orderQty: number = 1;

  @Output() onSave = new EventEmitter<any>();

  constructor(
      injector: Injector,
      public orderModal: BsModalRef,
      private _orderServiceProxy: CustomerOrderServiceProxy,
      private _foodServiceProxy: FoodServiceProxy,
      private _divisionServiceProxy: DivisionServiceProxy,
      private _categoryServiceProxy: CategoryServiceProxy,
      private _sizeServiceProxy: SizeServiceProxy,
      private orderRouter: Router,

  ){
      super(injector);
  }


  ngOnInit(): void {
    
    if(this.id != 0)
    {
        this._foodServiceProxy.getSelectedFoodIncludingCategoryAndSize(this.id).subscribe((request) => {
                this.foodDto = request;
        });
    }

    this._categoryServiceProxy.getAllTheListOfCategoryFromDTO().subscribe((request) => {
        this.categoryItems = request;
    });

    this._sizeServiceProxy.getAllTheListOfSizeFromDTO().subscribe((request) => {
        this.sizeItems = request;
    });


  }

  save(foodDto: FoodDto): void
  {
      this.saving = true;
      const orderDtoNew = new CustomerOrderDto();

      orderDtoNew.foodId = foodDto.id;
      orderDtoNew.categoryId = this.selectedCategory;
      orderDtoNew.sizeId = this.selectedSize;
      orderDtoNew.orderStatus = true;
      orderDtoNew.totalAmountTobePay = this.orderDto.totalQuantityOfOrder * foodDto.price;
      orderDtoNew.totalQuantityOfOrder = this.orderDto.totalQuantityOfOrder;
      orderDtoNew.dateAndTimeOrderIsPlaced = moment(this.dateToday);

      this.foodDto.totalStock = foodDto.totalStock - this.orderDto.totalQuantityOfOrder;


      this._orderServiceProxy.putOrdersToCart(orderDtoNew).subscribe((request) => {
            this.notify.info(this.l('Added to Cart')); 
            this.orderModal.hide(); 
            this.onSave.emit(request); 

            this.orderRouter.navigate(["./app/customer-cart"]); 


      }, () => {
            this.saving = false; 
      });

      this._foodServiceProxy.update(foodDto).subscribe((request) => {
            this.orderModal.hide();
            this.onSave.emit();
      });
     

  }

  


}
