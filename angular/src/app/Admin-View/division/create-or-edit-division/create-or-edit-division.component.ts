import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DivisionDto, DivisionServiceProxy } from '@shared/service-proxies/service-proxies';
import { request } from 'http';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-or-edit-division',
  templateUrl: './create-or-edit-division.component.html',
  styleUrls: ['./create-or-edit-division.component.css']
})

export class CreateOrEditDivisionComponent extends AppComponentBase implements OnInit {
  
  saving = false;
  divisionDto: DivisionDto = new DivisionDto();
  id: number = 0;
  notify: any;
  
  @Output() onSave = new EventEmitter<any>();

  constructor(
    private injector: Injector,
    private _divisionServiceProxy: DivisionServiceProxy,
    private _divisionModal: BsModalRef,
  )
  {
    super(injector);
  }
  
  
  ngOnInit(): void {
    
    if(this.id)
    {
        this._divisionServiceProxy.get(this.id).subscribe((request) => {
          this.divisionDto = request;
        });

    }
  }

  save(): void{

    this.saving = true;

    if(this.id != 0)
    {
        this._divisionServiceProxy.update(this.divisionDto).subscribe(() => {
          this.notify.info(this.l('UpdatedSuccessfully'));
          this._divisionModal.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        });

    }
    else
    {
        this._divisionServiceProxy.create(this.divisionDto).subscribe(() => {
          this.notify.info(this.l('CreatedSuccessfully'));
          this._divisionModal.hide();
          this.onSave.emit();
        },
          () => {
            this.saving = false;
          });
    }

  }

}
