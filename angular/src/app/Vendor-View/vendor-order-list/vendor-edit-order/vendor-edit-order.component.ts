import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerOrderDto, CustomerOrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-vendor-edit-order',
  templateUrl: './vendor-edit-order.component.html',
  styleUrls: ['./vendor-edit-order.component.css']
})
export class VendorEditOrderComponent extends AppComponentBase implements OnInit
{
  orderDtoVendor: CustomerOrderDto = new CustomerOrderDto();

  id: number = 0;
  saving = false;
  notify: any;

  dateToday = new Date();


  @Output() onSave = new EventEmitter<any>();

  constructor(
      private injector: Injector,
      private _orderServiceProxyVendor: CustomerOrderServiceProxy,
      //public _venEditOrderModal: BsModalRef,
  )
  {
      super(injector);
  }


  ngOnInit(): void {
      //To be continue
  }

  save()
  {
      this.saving = true;
      //checkout status = 4;
      //order status = true;
      //create new column for amountRecieved

      this.orderDtoVendor.checkoutStatusNumber = 4;
      this.orderDtoVendor.orderStatus = true;


      if(this.id != 0)
      {
          //To be Continue
          //Initialize totalAmountToPay

      }



  }

}
