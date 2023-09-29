import { Component, Injector } from '@angular/core';

import { CreateOrEditCategoryComponent } from './create-or-edit-category/create-or-edit-category.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CategoryDto, CategoryDtoPagedResultDto, CategoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs';

class PagedCategoryDto extends PagedRequestDto //It must be always on the top of @Component
{
    keyword: string;
    IsActive: boolean | null;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  animations: [appModuleAnimation()],
})



export class CategoryComponent extends PagedListingComponentBase<CategoryDto>{
  

  categoryItems: CategoryDto[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  request: CategoryDtoPagedResultDto;
  keyword: "";
  isActive: boolean | null;
  advancedFiltersVisible = false;


  constructor(
    private injector: Injector,
    private _categoryServiceProxy: CategoryServiceProxy,
    private _categoryModalService: BsModalService,
  )
  {
    super(injector);
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  ShowCreateCategory() : void
  {
    this.CreateCategory();
  }
  
  ShowEditCategory(id) : void
  {
    this.EditCategory(id);
  }
  
  
  protected list(request: PagedCategoryDto, pageNumber: number, finishedCallback: Function): void {
    
    this._categoryServiceProxy.getAll(
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
    .subscribe((result: CategoryDtoPagedResultDto) => {
      this.categoryItems = result.items;
      this.showPaging(result, pageNumber);
    });
    
  }

  protected delete(categorySelectedItem: CategoryDto): void {
    
    abp.message.confirm(this.l('DeleteMessage', categorySelectedItem.categoryName), undefined,
      (condition: boolean) => {
        if (condition)
        {
            this._categoryServiceProxy.delete(categorySelectedItem.id).subscribe(() => {
              abp.notify.success(this.l('SuccessfullyDeleted'));
              this.refresh();

            });
        }
      }
    );

  }

  private CreateCategory(id?: number): void
  {
    let showCreateCategoryComponent: BsModalRef

    if(!id)
    {
      showCreateCategoryComponent = this._categoryModalService.show(CreateOrEditCategoryComponent,
        {
            class: 'modal-lg',
        });

        showCreateCategoryComponent.content.onSave.subscribe(() => {
          this.refresh();
        })
    }

  }

  private EditCategory(id?: number): void
  {
    let showEditCategoryComponent: BsModalRef

    showEditCategoryComponent = this._categoryModalService.show(CreateOrEditCategoryComponent, 
      {
          class: 'modal-lg',
          initialState: {id: id},
      });

      showEditCategoryComponent.content.onSave.subscribe(() => {
        this.refresh();
      })

  }
  

}
