import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryDto, CategoryServiceProxy, CustomerOrderDto, CustomerOrderServiceProxy, DivisionDto, DivisionServiceProxy, FoodDto, FoodServiceProxy, FoodTypeDto, SizeDto, SizeServiceProxy } from '@shared/service-proxies/service-proxies';
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
  orderDto: CustomerOrderDto = new CustomerOrderDto();
  saving: boolean;
  id: number = 0;
  dateToday = new Date();
  totalQuantityOfOrder: number = 1;
  selectedCategory: number = null;
  selectedDivision: number = null;
  selectedSize: number = null;

  @Output() onSave = new EventEmitter<any>();

  constructor(
      injector: Injector,
      public orderModal: BsModalRef,
      private _orderServiceProxy: CustomerOrderServiceProxy,
      private _foodServiceProxy: FoodServiceProxy,
      private _divisionServiceProxy: DivisionServiceProxy,
      private _categoryServiceProxy: CategoryServiceProxy,
      private _sizeServiceProxy: SizeServiceProxy,

  ){
      super(injector);
  }


  ngOnInit(): void {
    
    if(this.id)
    {
        this._orderServiceProxy.get(this.id).subscribe((request: CustomerOrderDto) => {
            this.orderDto = request;
            this.selectedCategory = this.orderDto.categoryId;
            this.selectedSize = this.orderDto.sizeId;
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


  }

  save(): void
  {
      this.saving = true;
      this.orderDto.divisionId = this.selectedDivision;
      this.orderDto.categoryId = this.selectedCategory;
      this.orderDto.sizeId = this.selectedSize;

      if (this.id != 0)
      {
          this._orderServiceProxy.update(this.orderDto).subscribe(() => {
              this.notify.info(this.l('UpdatedSuccessfully'));
              this.orderModal.hide();
              this.onSave.emit();
          }, () => {
              this.saving = false;
          });
      }
      else
      {
          this._orderServiceProxy.create(this.orderDto).subscribe(() => {
              this.notify.info(this.l('CreatedSuccessfully'));
              this.orderModal.hide();
              this.onSave.emit();
          }, () => {
              this.saving = false;
          });
      }

  }


}
