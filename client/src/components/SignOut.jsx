import React from 'react'
import Cookies from 'js-cookie'

export const SignOut = ({callBack}) => {



  return (
    <div>

      <button  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80" onClick={callBack}>Sign Out</button>  

    </div>
  )
}
