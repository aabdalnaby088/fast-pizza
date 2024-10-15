import React from 'react'
import Header from './Header.jsx'
import CartOverview from '../features/cart/CartOverview.jsx'
import { Outlet, useNavigation } from 'react-router'
import Loader from './Loader.jsx'

export default function AppLayout() {
    const navigation = useNavigation()
    
    const isLoading = navigation.state === 'loading'; 
    
    return (
        <div className='h-screen grid grid-rows-[auto_1fr_auto]'>
            {isLoading && <Loader/>}
            <Header/>
            <main className='overflow-scroll max-w-3xl mx-auto'>
                <Outlet/>
            </main>
            <CartOverview/>
        </div>
    )
}