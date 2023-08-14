import { Component, Injector } from '@angular/core';

import { CreateOrEditDivisionComponent } from './create-or-edit-division/create-or-edit-division.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DivisionDto, DivisionDtoPagedResultDto, DivisionServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

class PagedDivisionDto extends PagedRequestDto
{
    keyword: string;
    IsActive: boolean | null;
}

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css'],
  animations: [appModuleAnimation()],

})

export class DivisionComponent extends PagedListingComponentBase<DivisionDto>{
  
  divisionItems: DivisionDto[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  //divisionPagedResultDto: DivisionDtoPagedResultDto;
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    private injector: Injector,
    private _divisionServiceProxy: DivisionServiceProxy,
    private _divisionModalService: BsModalService,
  )
  {
    super(injector);
  }
  
  ShowCreateDivision(): void
  {
    this.CreateDivision();
  }

  ShowEditDivision(id) : void
  {
    this.EditDivision(id);
  }
  
  
  protected list(request: PagedDivisionDto, pageNumber: number, finishedCallback: Function): void {
    
    this._divisionServiceProxy.getAll(
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
    .subscribe((result: DivisionDtoPagedResultDto) => {
      this.divisionItems = result.items;
      this.showPaging(result, pageNumber);
    });

  }


  protected delete(divisionSelectedItem: DivisionDto): void {
    
    abp.message.confirm(this.l('DeleteMessage', divisionSelectedItem.divisionName), undefined,
      (condition: boolean) => {
        if (condition)
        {
            this._divisionServiceProxy.delete(divisionSelectedItem.id).subscribe(() => {
              abp.notify.success(this.l('SuccessfullyDeleted'));
              this.refresh();

            });
        }
      }
    );

  }

  private CreateDivision(id?: number): void
  {
    let showCreateDivisionComponent: BsModalRef

    if(!id)
    {
      showCreateDivisionComponent = this._divisionModalService.show(CreateOrEditDivisionComponent,
        {
            class: 'modal-lg',
        });

        showCreateDivisionComponent.content.onSave.subscribe(() => {
          this.refresh();
        })
    }

  }

  private EditDivision(id?: number): void
  {
    let showEditDivisionComponent: BsModalRef

    showEditDivisionComponent = this._divisionModalService.show(CreateOrEditDivisionComponent, 
      {
          class: 'modal-lg',
          initialState: {id: id},
      });

      showEditDivisionComponent.content.onSave.subscribe(() => {
        this.refresh();
      })

  }




}
