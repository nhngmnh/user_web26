import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
    const navigate=useNavigate();
  return (
    <div className='md:mx-10'>
    <div className='flex flex-col sm:grid grid-cols-[4fr_1fr_2fr] gap-14 my-10 mt-40 text-sm'>
        {/*left*/}
        <div>
            <img className='mb-5 w-56' src={assets.logo} alt=''/>
            <p className='w-full md:2/3 text-gray-600 leading-6'>
            Our Company specializes in providing the latest technology devices at market prices. Our quality sales and warranty system makes us the top choice for online shopping of technology devices.
            </p>
        </div>
         {/*center*/}
         <div>
            <p className='text-xl font-medium mb-5'>
                Company
            </p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li className='hover:cursor-pointer hover:underline' onClick={()=>{navigate('/'); scrollTo(0,0)}}>Home</li>
                <li className='hover:cursor-pointer hover:underline' onClick={()=>{navigate('/about'); scrollTo(0,0)}}>About us</li>
                <li className='hover:cursor-pointer hover:underline' onClick={()=>{navigate('/contact'); scrollTo(0,0)}}>Contact us</li>
                <li className='hover:cursor-pointer hover:underline' onClick={()=>{navigate('/privacy'); scrollTo(0,0)}}>Privacy policy</li>
                <li className='hover:cursor-pointer hover:underline' onClick={()=>{navigate('/jobs'); scrollTo(0,0)}}>Explore jobs</li>
            </ul>
        </div>
         {/*right*/}
         <div >
            <p className='text-xl font-medium mb-5'>GET IN TOUGH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Phone number: +84 862613118</li>
                <li>Gmail-1: <a href="mailto:nhungocminh2004@gmail.com" class="text-primary hover:underline">nhungocminh2004@gmail.com</a></li>
                <li>Gmail-2: <a href="mailto:minhthn@gmail.com" class="text-primary hover:underline">minhthn@gmail.com</a></li>
            </ul>
        </div>
    
    </div>
    <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright © 2025</p>
        </div>
</div>
  )
}

export default Footer