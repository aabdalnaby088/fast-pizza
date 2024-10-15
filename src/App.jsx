import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './ui/Home.jsx'
import Menu, {Loader as menuLoader} from './features/menu/Menu.jsx'
import Cart from './features/cart/Cart.jsx'
import CreateOrder, {action as createOrder} from './features/order/CreateOrder.jsx'
import Order, { loader as orderLoader } from './features/order/Order.jsx'
import AppLayout from './ui/AppLayout.jsx'
import Error from './ui/Error.jsx'
import { action as updateOrder } from './features/order/UpdateOrder.jsx'

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    errorElement: <Error/>,
    children : [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrder
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        action: updateOrder,
        errorElement: <Error />,
      }
    ]
  },

])



export default function App() {
  return (
<RouterProvider router={router}>

</RouterProvider>
  )
}
