import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerOrderDto, CustomerOrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-vendor-report-details',
  templateUrl: './vendor-report-details.component.html',
  styleUrls: ['./vendor-report-details.component.css']
})

export class VendorReportDetailsComponent extends AppComponentBase implements OnInit
{


    saving: boolean = false;
    referenceNumber: string;

    ordertItems: CustomerOrderDto[] = [];
    orderDto: CustomerOrderDto = new CustomerOrderDto();

    constructor(
        injector: Injector,
        private _orderServiceProxy: CustomerOrderServiceProxy,
        public reportDetailsModal: BsModalRef,
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
