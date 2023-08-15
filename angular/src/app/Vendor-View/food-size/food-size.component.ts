import { Component, Injector } from '@angular/core';

import { CreateOrEditFoodsizeComponent } from './create-or-edit-foodsize/create-or-edit-foodsize.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { SizeDto, SizeDtoPagedResultDto, SizeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

class PagedSizeDto extends PagedRequestDto
{
    keyword: string;
    IsActive: boolean | null;
}


@Component({
  selector: 'app-food-size',
  templateUrl: './food-size.component.html',
  styleUrls: ['./food-size.component.css'],
  animations: [appModuleAnimation()],
})


export class FoodSizeComponent extends PagedListingComponentBase<SizeDto>{
  
  sizeItems: SizeDto[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;


  constructor(
    private injector: Injector,
    private _sizeServiceProxy: SizeServiceProxy,
    private _sizeModalService: BsModalService,
  )
  {
    super(injector);
  }
  
  ShowCreateSize(): void 
  {
    this.CreateSize();
  }

  ShowEditSize(id): void
  {
    this.EditSize(id);
  }
  
  
  protected list(request: PagedSizeDto, pageNumber: number, finishedCallback: Function): void {
    
    this._sizeServiceProxy.getAll(
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
    .subscribe((result: SizeDtoPagedResultDto) => {
      this.sizeItems = result.items;
      this.showPaging(result, pageNumber);
    })



  }
  protected delete(sizeSelectedItem: SizeDto): void {

    abp.message.confirm(this.l('DeleteMessage', sizeSelectedItem.sizeName), undefined,
      (condition: boolean) => {
        if (condition)
        {
            this._sizeServiceProxy.delete(sizeSelectedItem.id).subscribe(() => {
              abp.notify.success(this.l('SuccessfullyDeleted'));
              this.refresh();
            });
        }
      }
    );
  }

  private CreateSize(id?: number): void
  {
    let showCreateSizeComponent: BsModalRef

    if(!id)
    {
      showCreateSizeComponent = this._sizeModalService.show(CreateOrEditFoodsizeComponent, {
        class: 'modal-lg',
      });

    }

    showCreateSizeComponent.content.onSave.subscribe(() => {
      this.refresh();
    })

  }

  private EditSize(id?: number): void
  {
    let showEditSizeComponent: BsModalRef

      showEditSizeComponent = this._sizeModalService.show(CreateOrEditFoodsizeComponent, {
        
        class: 'modal-lg',
        initialState : {id : id},

      });


      showEditSizeComponent.content.onSave.subscribe(() => {
      this.refresh();
    })

  }



}


