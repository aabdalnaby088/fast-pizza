// Test ID: IIDSAT

import { useFetcher } from "react-router-dom";
import { useLoaderData } from "react-router";
import { getOrder } from "../../services/apiRestaurant.js";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers.js";
import OrderItem from "./OrderItem.jsx";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder.jsx";


function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  useEffect(function(){
    if(!fetcher.data && fetcher.state == 'idle')
    fetcher.load('/menu'); 
  },[fetcher])
  
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return ( 
    <div className="py-6 px-4 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-x-12">
        <h2 className="text-xl font-semibold">order #{id} status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-red-50">Priority</span>}
          <span className="bg-green-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-green-50">{status} order</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-12 bg-stone-200 px-6 py-5">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
            <ul className="divide-y divide-stone-200 border-y">
              {cart.map(item => <OrderItem item={item} key={item.pizzaId} isLoadingIngredients={fetcher.state == 'loading'} ingredients={fetcher?.data?.find(el => el.id == item.pizzaId).ingredients}/> )}
            </ul>
      <div className="space-y-2 px-6 py-5 bg-stone-200">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder order={order}/> }
    </div>
  );
}

export async function loader({params}){
  const order = await getOrder(params.orderId);
  return order; 
}

export default Order;
