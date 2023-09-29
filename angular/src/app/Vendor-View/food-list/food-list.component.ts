import { Component, Injector } from '@angular/core';

import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { FoodDto, FoodDtoPagedResultDto, FoodServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

import { CreateOrEditFoodComponent } from './create-or-edit-food/create-or-edit-food.component';

class PagedFoodsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}


@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
  animations: [appModuleAnimation()],
})


export class FoodListComponent extends PagedListingComponentBase<FoodDto> {
  
  foodItems: FoodDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;
  
  constructor(
      injector: Injector,
      private _foodServiceProxy: FoodServiceProxy,
      private _foodModalService: BsModalService,
  )
  {
      super(injector);
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }
  
  ShowCreateFood(): void
  {
      this.CreateFood();
  }
  
  ShowEditFood(id): void
  {
      this.EditFood(id);
  }
  
  protected list(request: PagedFoodsRequestDto, pageNumber: number, finishedCallback: Function): void {

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
    });


  }


  protected delete(foodSelectedItem: FoodDto): void {
    
    abp.message.confirm(this.l('DeleteMessage', foodSelectedItem.foodName), undefined,
      (condition: boolean) => {
        if (condition)
        {
            this._foodServiceProxy.delete(foodSelectedItem.id).subscribe(() => {
              abp.notify.success(this.l('SuccessfullyDeleted'));
              this.refresh();

            });
        }
      }
    );

  }


  private CreateFood(id?: number): void
  {
      let showCreateFoodComponent : BsModalRef

      if(!id)
      {
          showCreateFoodComponent = this._foodModalService.show(CreateOrEditFoodComponent, {
              class: 'modal-lg',
          });

          showCreateFoodComponent.content.onSave.subscribe(() => {
              this.refresh();
          })

      }

  }

  private EditFood(id?: number): void
  {
      let showEdiFoodComponent : BsModalRef

          showEdiFoodComponent = this._foodModalService.show(CreateOrEditFoodComponent, {
              class: 'modal-lg',
              initialState : {id : id},
          });

          showEdiFoodComponent.content.onSave.subscribe(() => {
              this.refresh();
          })

  }

  

}
