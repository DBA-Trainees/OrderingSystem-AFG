import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FoodDto, FoodServiceProxy, FoodTypeDto, FoodTypeServiceProxy, SizeDto, SizeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-or-edit-food',
  templateUrl: './create-or-edit-food.component.html',
  styleUrls: ['./create-or-edit-food.component.css']
})

export class CreateOrEditFoodComponent extends AppComponentBase implements OnInit {
  
  
  saving = false;
  foodDto = new FoodDto();
  typeItems: FoodTypeDto[] = [];
  sizeItems: SizeDto[] = [];
  id: number = 0;
  selectedType: number = null;
  isAvailable: boolean = true;
  base64ImagePath: string;
  
  @Output() onSave = new EventEmitter<any>();

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  constructor(
    injector: Injector,
    public _foodModal: BsModalRef,
    private _foodServiceProxy: FoodServiceProxy,
    private _typeServiceProxy: FoodTypeServiceProxy,
    private _sizeServiceProxy: SizeServiceProxy,
  )
  {
      super(injector);
  }

  
  ngOnInit(): void {

    if(this.id)
    {
        this._foodServiceProxy.get(this.id).subscribe((request) => {
            this.foodDto = request;
            this.selectedType = request.typeId;

        });

    }

    this._typeServiceProxy.getAllTheListOfFoodTyoeFromDTO().subscribe((request) => {
          this.typeItems = request;
    });

  }

  displayImage(event: any): void {

    var foodFile = event.target.files[0];

    const reader = new FileReader();

    if(foodFile)
    {
        reader.onload = (selectedImage: any) => {
              this.foodDto.image = selectedImage.target.result.split(",")[1];
              this.foodDto.imageName = foodFile.name;
              const fileTypeOnly = this.foodDto.imageName.split(".").pop();
              this.foodDto.imageFileType = fileTypeOnly;
        };
        reader.readAsDataURL(foodFile);
    }

  }


  save(): void
  {
      this.saving = true;
      this.foodDto.typeId = this.selectedType;

      if(this.id !==0)
      {
            this._foodServiceProxy.update(this.foodDto).subscribe(() => {
                  this.notify.info(this.l('UpdatedSuccessfully'));
                  this._foodModal.hide();
                  this.onSave.emit();

            }, () => {
                this.saving = false;
            });
      }
      else
      {
             this._foodServiceProxy.create(this.foodDto).subscribe(() => {
                  this.notify.info(this.l('CreatedSuccessfully'));
                  this._foodModal.hide();
                  this.onSave.emit();

            }, () => {
                this.saving = false;
            });
      }



  }


}
