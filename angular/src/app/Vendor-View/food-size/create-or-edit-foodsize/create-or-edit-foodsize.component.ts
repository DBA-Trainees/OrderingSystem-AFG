import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { SizeDto, SizeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-or-edit-foodsize',
  templateUrl: './create-or-edit-foodsize.component.html',
  styleUrls: ['./create-or-edit-foodsize.component.css']
})


export class CreateOrEditFoodsizeComponent extends AppComponentBase implements OnInit {
  
  saving = false;
  sizeDto: SizeDto = new SizeDto();
  id: number = 0;
  notify: any;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    private injector: Injector,
    private _sizeServiceProxy: SizeServiceProxy,
    public _sizeModal: BsModalRef,
  )
  {
    super(injector);
  }
  
  
  ngOnInit(): void {
    
    if(this.id)
    {
        this._sizeServiceProxy.get(this.id).subscribe((request) => {
          this.sizeDto = request;
        });
    }

  }

  save(): void
  {
      this.saving = true;

      if(this.id !=0 )
      {
          this._sizeServiceProxy.update(this.sizeDto).subscribe(() => {
            this.notify.info(this.l('UpdatedSuccessfuly'));
            this._sizeModal.hide();
            this.onSave.emit();

          }, () => {
            this.saving = false;
          });

      }
      else
      {
         this._sizeServiceProxy.create(this.sizeDto).subscribe(() => {
            this.notify.info(this.l('CreatedSuccessfully'));
            this._sizeModal.hide();
            this.onSave.emit();
         }, () => {
            this.saving = false;
         });

      }
  }




}
