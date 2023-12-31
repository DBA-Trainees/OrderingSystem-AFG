﻿using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystemAFG.CustomerOrders.Dto;
using OrderingSystemAFG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemAFG.CustomerOrders
{
    public class CustomerOrderAppService : AsyncCrudAppService<CustomerOrder, CustomerOrderDto, int, PagedCustomerOrderResultRequestDto, CreateCustomerOrderDto, CustomerOrderDto>, ICustomerOrderAppService
    {
        private readonly IRepository<CustomerOrder, int> _customerOrderIRepository;

        public CustomerOrderAppService(IRepository<CustomerOrder, int> repository) : base(repository)
        {
            _customerOrderIRepository = repository;
        }

        public override async Task<PagedResultDto<CustomerOrderDto>> GetAllAsync(PagedCustomerOrderResultRequestDto input)
        {
            var orderItems = await _customerOrderIRepository.GetAll()
                .Include(items => items.Food)
                .Include(items => items.Category)
                .Include(items => items.Size)
                .Include(items => items.Division)
                .Where(select => select.CheckoutStatusNumber == 1)
                .OrderByDescending(items => items.Id)
                .Select(items => ObjectMapper.Map<CustomerOrderDto>(items))
                .ToListAsync();

            return new PagedResultDto<CustomerOrderDto>(orderItems.Count(), orderItems);

        }

        public async Task<PagedResultDto<CustomerOrderDto>> GetAllOrdersInCart(PagedCustomerOrderResultRequestDto input)
        {

            #region Number Guide
            /*

                For Checkout Status Number              

                1 - Order added to cart      


            */
            #endregion


            var orderItems = await _customerOrderIRepository.GetAll()
                .Include(items => items.Food)
                .Include(items => items.Category)
                .Include(items => items.Size)
                .Include(items => items.Division)
                .Where(select => select.CheckoutStatusNumber == 1)
                .OrderByDescending(items => items.Id)
                .Select(items => ObjectMapper.Map<CustomerOrderDto>(items))
                .ToListAsync();

            return new PagedResultDto<CustomerOrderDto>(orderItems.Count(), orderItems);

        }

        public async Task<CustomerOrderDto> PutOrdersToCart(CustomerOrderDto input)
        {
            var customerOrder = ObjectMapper.Map<CustomerOrder>(input);
            var duplicateOrder = await _customerOrderIRepository.FirstOrDefaultAsync(
                item =>
                item.OrderStatus == false &&
                item.FoodId == input.FoodId &&
                item.SizeId == input.SizeId &&
                item.CategoryId == input.CategoryId && 
                item.CheckoutStatusNumber == 1); 

            if(duplicateOrder != null)
            {
                duplicateOrder.TotalQuantityOfOrder += input.TotalQuantityOfOrder;
                duplicateOrder.DateAndTimeOrderIsPlaced = input.DateAndTimeOrderIsPlaced?.ToLocalTime();
                duplicateOrder.FoodId = input.FoodId;
                duplicateOrder.SizeId = input.SizeId;
                duplicateOrder.CategoryId = input.CategoryId;   
                duplicateOrder.OrderStatus = false;
                duplicateOrder.CheckoutStatusNumber = 1;

                await _customerOrderIRepository.UpdateAsync(duplicateOrder);
                return ObjectMapper.Map<CustomerOrderDto>(duplicateOrder);
            }
            else
            {
                customerOrder = ObjectMapper.Map<CustomerOrder>(input);
                customerOrder.DateAndTimeOrderIsPlaced = input.DateAndTimeOrderIsPlaced?.ToLocalTime();
                customerOrder.FoodId = input.FoodId;
                customerOrder.SizeId = input.SizeId;
                customerOrder.CategoryId = input.CategoryId;
                customerOrder.OrderStatus = false;
                customerOrder.CheckoutStatusNumber = 1;

                await _customerOrderIRepository.InsertAsync(customerOrder);
                return ObjectMapper.Map<CustomerOrderDto>(customerOrder);


            }


        }
        //

        public async Task<CustomerOrderDto> UpdateStatusNumberIntoThree(CustomerOrderDto input)
        {

            var customerOrder = new CustomerOrder();
            var referenceNumber = Guid.NewGuid();


            foreach (var individualItem in input.ListOfOrders)
            {
                customerOrder = ObjectMapper.Map<CustomerOrder>(individualItem);
                customerOrder.Id = individualItem.Id;
                customerOrder.OrderStatus = false;
                customerOrder.ReferenceNumber = referenceNumber;

                await _customerOrderIRepository.UpdateAsync(customerOrder);

            }

            return base.MapToEntityDto(customerOrder);

        }

        public List<CustomerOrderDto> GetOrderByReferenceNumber(Guid referenceNumber)
        {

            #region Number Guide
            /*

                For Checkout Status Number              

                1 - Order added to cart      
                2 - Deleted order
                3 - Order is successfully placed                            


            */
            #endregion

            var listOfOrder = _customerOrderIRepository.GetAll()
                .Include(items => items.Food)
                .Include(items => items.Category)
                .Include(items => items.Size)
                .Include(items => items.Division)
                .Where(select => select.ReferenceNumber == referenceNumber && select.CheckoutStatusNumber == 3)
                .ToList();

            return ObjectMapper.Map<List<CustomerOrderDto>>(listOfOrder);

        }

        public async Task<PagedResultDto<CustomerOrderDto>> GetAllOrdersInCheckout(PagedCustomerOrderResultRequestDto input)
        {

            #region Number Guide
            /*

                For Checkout Status Number              

                1 - Order added to cart      
                2 - Deleted order
                3 - Order is successfully placed        
                4 - Order is under process                       


            */
            #endregion

            var orderList = await _customerOrderIRepository.GetAll()
                 .Include(items => items.Food)
                 .Include(items => items.Category)
                 .Include(items => items.Size)
                 .Include(items => items.Division)
                 .Where(select => select.CheckoutStatusNumber == 3 || select.CheckoutStatusNumber == 4 && select.OrderStatus == true)
                 .OrderByDescending(items => items.Id)
                 .Select(items => ObjectMapper.Map<CustomerOrderDto>(items))
                 .ToListAsync();

            return new PagedResultDto<CustomerOrderDto>(orderList.Count(), orderList);
        }

        public async Task<PagedResultDto<CustomerOrderDto>> GetAllOrdersForVendor(PagedCustomerOrderResultRequestDto input)
        {

            #region Number Guide
            /*

                For Checkout Status Number              

                1 - Order added to cart      
                2 - Deleted order
                3 - Order is successfully placed        


            */
            #endregion

            var orderList = await _customerOrderIRepository.GetAll()
                 .Include(items => items.Food)
                 .Include(items => items.Category)
                 .Include(items => items.Size)
                 .Include(items => items.Division)
                 .Where(select => select.CheckoutStatusNumber == 3)
                 .OrderByDescending(items => items.Id)
                 .Select(items => ObjectMapper.Map<CustomerOrderDto>(items))
                 .ToListAsync();

            return new PagedResultDto<CustomerOrderDto>(orderList.Count(), orderList);
        }


        public async Task<PagedResultDto<CustomerOrderDto>> GetAllPaidOrders(PagedCustomerOrderResultRequestDto input)
        {
            #region Number Guide
            /*

                For Checkout Status Number              

                1 - Order added to cart      
                2 - Deleted order
                3 - Order is successfully placed        
                4 - Order is confirm                       

                For Order Status Number 

                False - Unpaid
                True - Paid 


            */
            #endregion

            var orderList = await _customerOrderIRepository.GetAll()
               .Include(items => items.Food)
               .Include(items => items.Category)
               .Include(items => items.Size)
               .Include(items => items.Division)
               .Where(select => select.CheckoutStatusNumber == 4 && select.OrderStatus == false)
               .GroupBy(organize => organize.ReferenceNumber)
               .Select(item => new CustomerOrderDto()
               {
                   ReferenceNumber = item.Key,
                   CheckoutTotalAccumulatedOrders = item.FirstOrDefault().CheckoutTotalAccumulatedOrders,
                   GrandTotal = item.FirstOrDefault().GrandTotal,
                   DateAndTimeOrderIsPlaced = item.FirstOrDefault().DateAndTimeOrderIsPlaced,
                   OrderStatus = item.FirstOrDefault().OrderStatus
               })
               .ToListAsync();

            return new PagedResultDto<CustomerOrderDto>(orderList.Count(), orderList);
        }

        public async Task<PagedResultDto<CustomerOrderDto>> GetAllPreviousOrderVendor(PagedCustomerOrderResultRequestDto input)
        {

            #region Number Guide
            /*

                For Checkout Status Number              

                1 - Order added to cart      
                2 - Deleted order
                3 - Order is successfully placed        
                4 - Order is confirm                       

                For Order Status Number 

                False - Unpaid
                True - Paid 


            */
            #endregion

            var orderList = await _customerOrderIRepository.GetAll()
                 .Include(items => items.Food)
                 .Include(items => items.Category)
                 .Include(items => items.Size)
                 .Include(items => items.Division)
                 .Where(select => select.CheckoutStatusNumber == 4) 
                 .OrderByDescending(items => items.Id)
                 .Select(items => ObjectMapper.Map<CustomerOrderDto>(items))
                 .ToListAsync();

            return new PagedResultDto<CustomerOrderDto>(orderList.Count(), orderList);
        }

        public async Task<PagedResultDto<CustomerOrderDto>> GetAllConfirmedOrdersCustomer(PagedCustomerOrderResultRequestDto input)
        {
            #region Number Guide
            /*

                For Checkout Status Number              

                1 - Order added to cart      
                2 - Deleted order
                3 - Order is successfully placed        
                4 - Order is confirm                       

                For Order Status Number 

                False - Confirm
                True - Unconfirm 


            */
            #endregion

            var orderList = await _customerOrderIRepository.GetAll()
                 .Include(items => items.Food)
                 .Include(items => items.Category)
                 .Include(items => items.Size)
                 .Include(items => items.Division)
                 .Where(select => select.CheckoutStatusNumber == 4 && select.OrderStatus == false)
                 .OrderByDescending(items => items.Id)
                 .Select(items => ObjectMapper.Map<CustomerOrderDto>(items))
                 .ToListAsync();

            return new PagedResultDto<CustomerOrderDto>(orderList.Count(), orderList);


        }

        public List<CustomerOrderDto> GetPreviousOrderByReferenceNumber(Guid referenceNumber)
        {

            var listOfOrder = _customerOrderIRepository.GetAll()
                .Include(items => items.Food)
                .Include(items => items.Category)
                .Include(items => items.Size)
                .Include(items => items.Division)
                .Where(select => select.ReferenceNumber == referenceNumber && select.CheckoutStatusNumber == 4 && select.OrderStatus == false)
                .ToList();

            return ObjectMapper.Map<List<CustomerOrderDto>>(listOfOrder);

        }


        /*

               This is the guide i use 

               A. Order is added to cart
                    - CheckoutStatusNumber = 1

               B. Order is successfully placed
                    - CheckoutStatusNumber = 3

               C. Order is successfully paid
                    - CheckoutStatusNumber = 4
                    - OrderStatus = True

               D. Order is successfully confirm
                    - CheckoutStatusNumber = 4
                    - OrderStatus = False

        */




    }
}
