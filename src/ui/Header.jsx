import React from 'react'
import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder.jsx'
import Username from './Username.jsx'

export default function Header() {
    return (
        <header className='bg-yellow-500 px-4 py-3 uppercase border-b border-stone-500 sm:px-6 flex items-center justify-between'>
            <Link to={'/'} className='uppercase tracking-widest'>Fast react Pizza Co.</Link>
            <SearchOrder/>
            <Username/>
        </header>
    )
}
