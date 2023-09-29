import { Component, Injector } from '@angular/core';

import { CreateOrEditFoodtypeComponent } from './create-or-edit-foodtype/create-or-edit-foodtype.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { FoodTypeDto, FoodTypeDtoPagedResultDto, FoodTypeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

class PagedFoodTypeDto extends PagedRequestDto
{
    keyword: string;
    IsActive: boolean | null;
}

@Component({
  selector: 'app-food-type',
  templateUrl: './food-type.component.html',
  styleUrls: ['./food-type.component.css'],
  animations: [appModuleAnimation()],
})


export class FoodTypeComponent extends PagedListingComponentBase<FoodTypeDto>{
  

  typeItems: FoodTypeDto[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  isActive: boolean | null;
  keyword: "";
  request: FoodTypeDtoPagedResultDto;
  advancedFiltersVisible = false;
  
  constructor(
    private injector: Injector,
    private _foodTypeServiceProxy: FoodTypeServiceProxy,
    private _foodTypeModalService: BsModalService,
  )
  {
    super(injector);
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }
  
  
  ShowCreateFoodType(): void
  {
    this.CreateFoodType();
  }
  
  ShowEditFoodType(id): void
  {
    this.EditFoodType(id);
  }
  
  
  protected list(request: PagedFoodTypeDto, pageNumber: number, finishedCallback: Function): void {
    
    this._foodTypeServiceProxy.getAll(
      request.keyword,
      request.IsActive,
      request.skipCount,
      request.maxResultCount,
    )
    .pipe(
        finalize(() => {
          finishedCallback();
        })
    )
    .subscribe((result: FoodTypeDtoPagedResultDto) => {
      this.typeItems = result.items;
      this.showPaging(result, pageNumber);

    });

  }


  protected delete(foodTypeSelectedItem: FoodTypeDto): void {
    
    abp.message.confirm(this.l('DeleteMessage', foodTypeSelectedItem.foodTypeName), undefined,
      (condition: boolean) => {
        if (condition)
        {
            this._foodTypeServiceProxy.delete(foodTypeSelectedItem.id).subscribe(() => {
              abp.notify.success(this.l('SuccessfullyDeleted'));
              this.refresh();

            });
        }
      }
    );
  }

  private CreateFoodType(id?: number): void
  {
      let showCreateFoodTypeComponent : BsModalRef

      if(!id)
      {
        showCreateFoodTypeComponent = this._foodTypeModalService.show(CreateOrEditFoodtypeComponent,
          {
              class: 'modal-lg',
          });
  
          showCreateFoodTypeComponent.content.onSave.subscribe(() => {
            this.refresh();
          })
      }
  }

  private EditFoodType(id?: number): void
  {
      let showEditFoodTypeComponent : BsModalRef

      showEditFoodTypeComponent = this._foodTypeModalService.show(CreateOrEditFoodtypeComponent,
        {
            class: 'modal-lg',
            initialState : {id : id}, 
        });

        showEditFoodTypeComponent.content.onSave.subscribe(() => {
          this.refresh();
        })

  }



}

