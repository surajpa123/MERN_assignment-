import React from 'react'
import { Home } from './Home'
import Cookies from 'js-cookie'

export const MerchantProdView = () => {
    const role = Cookies.get("role")
  return (
    <div> <h1 className='text-center'>MerchantProdView </h1>

    <Home role = {role}/> 
    </div>
  )
}
