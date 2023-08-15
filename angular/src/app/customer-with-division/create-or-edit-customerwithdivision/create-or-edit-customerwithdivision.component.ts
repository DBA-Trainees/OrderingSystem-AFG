import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerDto, CustomerServiceProxy, DivisionDto, DivisionServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-or-edit-customerwithdivision',
  templateUrl: './create-or-edit-customerwithdivision.component.html',
  styleUrls: ['./create-or-edit-customerwithdivision.component.css']
})


export class CreateOrEditCustomerwithdivisionComponent extends AppComponentBase implements OnInit
{
  saving = false;
  customerDto: CustomerDto = new CustomerDto();
  id: number = 0;
  divisionItems: DivisionDto[] = [];
  selectedDivision: number = null;
  notify: any;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    private injector: Injector,
    private _customerServiceProxy: CustomerServiceProxy,
    private _divisionServiceProxy: DivisionServiceProxy,
    public _customerModal: BsModalRef,
  )
  {
    super(injector);
  }



  ngOnInit(): void {

    if(this.id)
    {
      this._customerServiceProxy.get(this.id).subscribe((request: CustomerDto) => {
          this.customerDto = request;
          this.selectedDivision = this.customerDto.divisionId;
      });
    }

    this._divisionServiceProxy.getAllTheListOfDivisionFromDTO().subscribe((request) => {
          this.divisionItems = request;
    })

  }

  save(): void
  {
      this.saving = true;
      this.customerDto.divisionId = this.selectedDivision;

      if(this.id != 0)
      {
          this._customerServiceProxy.update(this.customerDto).subscribe(() => {
              this.notify.info(this.l('UpdatedSuccessfully'));
              this._customerModal.hide();
              this.onSave.emit();
          }, () => {
              this.saving = false;
          });

      }
      else
      {
          this._customerServiceProxy.create(this.customerDto).subscribe(() => {
              this.notify.info(this.l('CreatedSuccessfully'));
              this._customerModal.hide();
              this.onSave.emit();
          }, () => {
              this.saving = false;
          });

      }


  }




}
