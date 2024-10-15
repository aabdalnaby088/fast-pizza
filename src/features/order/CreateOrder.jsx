import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCartItems, getTotalCartPrice } from "../cart/cartSlice.js";
import EmptyCart from "../cart/EmptyCart.jsx";
import store from "../../store.js";
import { formatCurrency } from "../../utils/helpers.js";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice.js";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation(); 
  const { userName, status: addressStatus, position, address, error: errorAddress } = useSelector(state=> state.user)
  const isLoading = addressStatus == 'loading'
  const isSubmitting = navigation.state == 'submitting'
  const cart = useSelector(getCartItems);
  const total = useSelector(getTotalCartPrice); 
  const priorityFees = withPriority? total*0.2 : 0 ; 
  const OrderFees = total + priorityFees ;  
  const formError = useActionData(); 
  const dispatch = useDispatch(); 

  if(!cart.length) return <EmptyCart/>

  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>
      <Form method='post'  >
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input" defaultValue={userName} type="text" name="customer" required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
            <input className="input" type="tel" name="phone" required />
          {formError?.phone && <p className="mt-2 text-xs text-red-700 bg-red-100 p=2">{formError.phone}</p> }
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className=" flex grow relative">
        <input disabled= {isLoading} className="input grow" defaultValue={address} type="text" name="address" required  />
            <span className={`absolute right-1 top-[50%] -translate-y-[50%] z-30 ${position.latitude && position.longitude && 'hidden'}`}><Button disabled={isLoading} type={'small'} onClick={(e) => { 
            e.preventDefault(); 
            dispatch(fetchAddress()) 
            }}>Get My Location</Button></span>
      </div>
            {addressStatus == 'failed' && <p className="mt-2 p-4 text-xs text-red-700 bg-red-100 p=2">{errorAddress}</p>}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.latitude ? `${position.latitude},${position.longitude}` : ""} />
          <Button
            disabled={isSubmitting || isLoading}
            type='primary'
          >
            {isSubmitting ? 'Placing Order...' : `Order now ${formatCurrency(total)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}


export async function action({request}){
  const formDate = await request.formData();
  const data = Object.fromEntries(formDate)

  const order = {
    ...data,
    cart: JSON.parse(data.cart), 
    priority: data.priority === 'true',
  }
  
let errors = {};

if(!isValidPhone(order.phone)){
  errors.phone = "give us a valid phone number we might need to contact with you"
}

if(Object.keys(errors).length){
  return errors; 
}

  const newOrder = await createOrder(order); 
  store.dispatch(clearCart()); 
  return redirect(`/order/${newOrder.id}`);  
}

export default CreateOrder;
