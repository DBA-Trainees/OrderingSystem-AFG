import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerOrderDto, CustomerOrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.css']
})
export class CheckoutSummaryComponent extends AppComponentBase implements OnInit{
    

    saving: boolean = false;
    referenceNumber: string;
    referenceID: any[] = [];
    ordertItems: CustomerOrderDto[] = [];
    orderDto: CustomerOrderDto = new CustomerOrderDto();

    grandTotal: number = 0; 

    
    ngOnInit(): void {

        if(this.referenceNumber){
            this.getAllByReferenceNumber(this.referenceNumber);
        }
    }


    constructor(
        injector: Injector,
        public checkoutSummaryModal: BsModalRef,
        private _orderServiceProxy: CustomerOrderServiceProxy,
        private checkoutSummaryRouter: Router
    )
    {
        super(injector);
    }


    GrandTotal(orderDtoItems: CustomerOrderDto[]): number
    {
          /* Return the accumulated Sub Total into a Grand total  */
  
          return orderDtoItems.reduce((total, orderDto) => total + orderDto.totalAmountTobePay, 0);
  
    }


    getAllByReferenceNumber(referenceNumber: string): void
    {
        this._orderServiceProxy.getOrderByReferenceNumber(referenceNumber).subscribe((result) => {
            this.ordertItems = result;

            this.checkoutSummaryRouter.navigate(["./app/customer/order-history"]);
        });

    }

    filterByReferenceNumber(referenceNumber: string): CustomerOrderDto[]
    {
        return this.ordertItems.filter (order => order.referenceNumber == referenceNumber && order.dateAndTimeOrderIsPlaced)
    }


}
