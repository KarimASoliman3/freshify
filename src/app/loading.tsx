import Image from 'next/image'
import React from 'react'
import logo from '../../public/assets/FreshifyBlack-removebg-preview.png'
import { Loader } from 'lucide-react'

export default function Loading() {
  return <>
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        {/* <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div> */}

        <Image src={logo} alt='freshify' width={200} height={200}/>
        <Loader className='animate-spin' size={50}/>
    </div>

  </>
}
