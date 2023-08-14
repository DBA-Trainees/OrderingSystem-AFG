import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryDto, CategoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-or-edit-category',
  templateUrl: './create-or-edit-category.component.html',
  styleUrls: ['./create-or-edit-category.component.css']
})
export class CreateOrEditCategoryComponent extends AppComponentBase implements OnInit {

  saving = false;
  categoryDto: CategoryDto = new CategoryDto();
  id: number = 0;
  notify: any;


  @Output() onSave = new EventEmitter<any>();

  constructor(
    private injector: Injector,
    private _categoryServiceProxy: CategoryServiceProxy,
    public _categoryModal: BsModalRef,
  )
  {
    super(injector);
  }
  
  ngOnInit(): void {
    
    if(this.id)
    {
        this._categoryServiceProxy.get(this.id).subscribe((request) => {
          this.categoryDto = request;
        });
    }

  }

  save(): void
  {
    this.saving = true;

    if(this.id != 0)
    {
        this._categoryServiceProxy.update(this.categoryDto).subscribe(() => {
          this.notify.info(this.l('UpdatedSuccessfully'));
          this._categoryModal.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
          }
        );
    }
    else
    {
      this._categoryServiceProxy.create(this.categoryDto).subscribe(() => {
        this.notify.info(this.l('CreatedSuccessfully'));
        this._categoryModal.hide();
        this.onSave.emit();
      },
      () => {
          this.saving = false;
        }
      );
    }

  }



}
