import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CustomerOrderDto, CustomerOrderDtoPagedResultDto, CustomerOrderServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

class PagedOrderDto extends PagedRequestDto
{
    keyword: string;
    IsActive: boolean | null;
}

@Component({
  selector: 'app-customer-checkout',
  templateUrl: './customer-checkout.component.html',
  styleUrls: ['./customer-checkout.component.css'],
  animations: [appModuleAnimation()],
})

export class CustomerCheckoutComponent extends AppComponentBase implements OnInit
{
  
  checkoutItems: CustomerOrderDto[] = [];
  orderDto = new CustomerOrderDto();

  dateToday = new Date();
  referenceID: any[] = [];
  grandTotal: number = 0;

  keyword: string = "";
  isActive: boolean | null;
  skipCount: number;
  maxResultCount: number;

  constructor(
      injector: Injector,
      private _orderServiceProxy: CustomerOrderServiceProxy,
      private _checkoutModalService: BsModalService,
      private checkoutRouter: Router,
  )
  {
      super(injector);
  }

   ngOnInit(): void {
        //
   }
  
   


}
