import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryDto, CategoryServiceProxy, CustomerOrderDto, CustomerOrderServiceProxy, DivisionDto, DivisionServiceProxy, FoodDto, FoodServiceProxy, FoodTypeDto, FoodTypeServiceProxy, SizeDto, SizeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer-edit-order',
  templateUrl: './customer-edit-order.component.html',
  styleUrls: ['./customer-edit-order.component.css']
})

export class CustomerEditOrderComponent extends AppComponentBase implements OnInit
{

  orderDto: CustomerOrderDto = new CustomerOrderDto();
  foodDto: FoodDto = new FoodDto();
  id: number = 0;
  saving = false;
  notify: any;
  categoryItems: CategoryDto[] = [];
  sizeItems: SizeDto[] = [];
  divisionItems: DivisionDto[] = [];
  foodItems: FoodDto[] = [];
  typeItems: FoodTypeDto[] = [];

  selectedFood: number = null;
  selectedSize: number = null;
  selectedCategory: number = null;
  selectedDivision: number = null;

  @Output() onSave = new EventEmitter<any>();

  constructor(
      private injector: Injector,
      private _orderServiceProxy: CustomerOrderServiceProxy,
      private _divisionServiceProxy: DivisionServiceProxy,
      private _categoryServiceProxy: CategoryServiceProxy,
      private _sizeServiceProxy: SizeServiceProxy,
      private _foodServiceProxy: FoodServiceProxy,
      public _orderModal: BsModalRef,
  )
  {
      super(injector);
  }

  ngOnInit(): void {

      if(this.id)
      {
          this._orderServiceProxy.get(this.id).subscribe((request: CustomerOrderDto) => {
                this.orderDto = request;
                this.selectedDivision = this.orderDto.divisionId;
                this.selectedCategory = this.orderDto.categoryId;
                this.selectedSize = this.orderDto.sizeId;
                this.selectedFood = this.orderDto.foodId;
                //this.orderDto.totalAmountTobePay = this.orderDto.totalQuantityOfOrder * this.orderDto.food.price; //

          });   

      }

      this._divisionServiceProxy.getAllTheListOfDivisionFromDTO().subscribe((request) => {
                this.divisionItems = request;
      });

      this._categoryServiceProxy.getAllTheListOfCategoryFromDTO().subscribe((request) => {
                this.categoryItems = request;
      });
      
      this._sizeServiceProxy.getAllTheListOfSizeFromDTO().subscribe((request) => {
                this.sizeItems = request;
      });

      this._foodServiceProxy.getAllTheListOfFood().subscribe((request) => {
                this.foodItems = request;
      });

  }

  save(): void
  {
        this.saving = true;
        this.orderDto.divisionId = this.selectedDivision;
        this.orderDto.sizeId = this.selectedSize;
        this.orderDto.categoryId = this.selectedCategory;
        this.orderDto.foodId = this.selectedFood;
        //this.orderDto.totalAmountTobePay = this.orderDto.totalQuantityOfOrder * this.foodDto.price; //

        if(this.id != 0)
        {
            this._orderServiceProxy.update(this.orderDto).subscribe(() => {
                  this.notify.info(this.l('UpdatedSuccessfully'));
                  this._orderModal.hide();
                  this.onSave.emit();
            }, () => {
                  //update price using service proxy here
                  this.saving = false;
            });

        }
        else
        {
            this._orderServiceProxy.create(this.orderDto).subscribe(() => {
                this.notify.info(this.l('CreatedSuccessfully'));
                this._orderModal.hide();
                this.onSave.emit();
            }, () => {
                this.saving = false;
            });

        }

  }



}
