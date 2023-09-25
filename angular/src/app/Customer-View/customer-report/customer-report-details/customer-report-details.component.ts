import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerOrderDto, CustomerOrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer-report-details',
  templateUrl: './customer-report-details.component.html',
  styleUrls: ['./customer-report-details.component.css']
})

export class CustomerReportDetailsComponent extends AppComponentBase implements OnInit
{

    saving: boolean = false;
    referenceNumber: string;

    ordertItems: CustomerOrderDto[] = [];
    orderDto: CustomerOrderDto = new CustomerOrderDto();

     constructor(
        injector: Injector,
        public checkoutSummaryModal: BsModalRef,
        private _orderServiceProxy: CustomerOrderServiceProxy,
    )
    {
        super(injector);
    }


    ngOnInit(): void {

        if(this.referenceNumber){
              this.getAllByReferenceNumber(this.referenceNumber);
          }

    }

    getAllByReferenceNumber(referenceNumber: string): void
    {
        this._orderServiceProxy.getPreviousOrderByReferenceNumber(referenceNumber).subscribe((result) => {
            this.ordertItems = result;

        });

    }

    filterByReferenceNumber(referenceNumber: string): CustomerOrderDto[]
    {
        return this.ordertItems.filter (order => order.referenceNumber == referenceNumber && order.dateAndTimeOrderIsPlaced)
    }

    GrandTotal(orderDtoItems: CustomerOrderDto[]): number
    {
          /* Return the accumulated Sub Total into a Grand total  */
  
          return orderDtoItems.reduce((total, orderDto) => 
          total + this.UpdatedTotalAmmountToPay(orderDto), 0);
  
    }


    UpdatedTotalAmmountToPay(orderDto : CustomerOrderDto): number
    {
        let originalAmmount = orderDto.food?.price;

        return originalAmmount * orderDto.totalQuantityOfOrder;
    }




}
