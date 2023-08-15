import { Component, Injector } from '@angular/core';

import { CreateOrEditCustomerwithdivisionComponent } from './create-or-edit-customerwithdivision/create-or-edit-customerwithdivision.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CustomerDto, CustomerDtoPagedResultDto, CustomerServiceProxy, DivisionDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

class PagedCustomerDto extends PagedRequestDto
{
    keyword: string;
    IsActive: boolean | null;
}

@Component({
  selector: 'app-customer-with-division',
  templateUrl: './customer-with-division.component.html',
  styleUrls: ['./customer-with-division.component.css'],
  animations: [appModuleAnimation()],
})


export class CustomerWithDivisionComponent extends PagedListingComponentBase<CustomerDto>
{

  customerItems: CustomerDto[] = [];
  divisionItems: DivisionDto[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    private injector: Injector,
    private _customerServiceProxy: CustomerServiceProxy,
    private _customerModalService: BsModalService,
  )
  {
    super(injector);
  }

  ShowCreateCustomer(): void 
  {
    this.CreateCustomer();
  }

  ShowEditCustomer(id)
  {
    this.EditCustomer(id);
  }

  protected list(request: PagedCustomerDto, pageNumber: number, finishedCallback: Function): void {
    
    this._customerServiceProxy.getAll(
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
    .subscribe((result: CustomerDtoPagedResultDto) => {
        this.customerItems = result.items;
        this.showPaging(result, pageNumber);
    });



  }
  protected delete(customerSelectedItem: CustomerDto): void {
    
    abp.message.confirm(this.l('DeleteMessage', customerSelectedItem.customerName), undefined,
      (condition: boolean) => {
        if (condition)
        {
            this._customerServiceProxy.delete(customerSelectedItem.id).subscribe(() => {
              abp.notify.success(this.l('SuccessfullyDeleted'));
              this.refresh();

            });
        }
      }
    );

  }

  private CreateCustomer(id?: number): void
  {
    let showCreateComponent: BsModalRef

    if (!id) 
    {
      showCreateComponent = this._customerModalService.show(
        CreateOrEditCustomerwithdivisionComponent,
        {
          class: 'modal-lg',
        }
      );

      showCreateComponent.content.onSave.subscribe(()=> {
        this.refresh();
      })

    } 
   
  }

  private EditCustomer(id?: number): void
  {
    let showEditComponent: BsModalRef

      showEditComponent = this._customerModalService.show(
        CreateOrEditCustomerwithdivisionComponent,
        {
          class: 'modal-lg',
          initialState : {id : id},
        }
      );

      showEditComponent.content.onSave.subscribe(()=> {
        this.refresh();
      })
   
  }

  

}
