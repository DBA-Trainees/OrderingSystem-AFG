import { Component, EventEmitter, Inject, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FoodTypeDto, FoodTypeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-or-edit-foodtype',
  templateUrl: './create-or-edit-foodtype.component.html',
  styleUrls: ['./create-or-edit-foodtype.component.css']
})

export class CreateOrEditFoodtypeComponent extends AppComponentBase implements OnInit {
  
  saving = false;
  foodTypeDto: FoodTypeDto = new FoodTypeDto();
  id: number = 0;
  foodTypeItems: FoodTypeDto[] = [];
  notify: any;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    private injector: Injector,
    public _foodTypeModal: BsModalRef,
    private _foodTypeServiceProxy: FoodTypeServiceProxy,
  ){
    super(injector);
  }
  
  ngOnInit(): void {

    if(this.id)
    {
        this._foodTypeServiceProxy.get(this.id).subscribe((request) => {
            this.foodTypeDto = request;
        });

    }
  }

  save(): void
  {
      this.saving = true;

      if(this.id !=0)
      {
          this._foodTypeServiceProxy.update(this.foodTypeDto).subscribe(() => {
            this.notify.info(this.l('UpdatedSuccessfully'));
            this._foodTypeModal.hide();
            this.onSave.emit();
          }, () => {
            this.saving = false;
          });

      }
      else
      {
          this._foodTypeServiceProxy.create(this.foodTypeDto).subscribe(() => {
            this.notify.info(this.l('CreatedSuccessfully'));
            this._foodTypeModal.hide();
            this.onSave.emit();
          }, () => {
            this.saving = false;
          });
      }

  }

  


}
