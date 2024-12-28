import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            Shoppers Style is an online store where you can find a wide range of products for your everyday needs. We aim to make shopping easy for you.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li><a href="mailto:divine100rav@gmail.com" className="hover:text-blue-500">Email Us</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">Instagram</a></li>
            <li><a href="tel:+917004968292" className="hover:text-blue-500">Call Us: +91-7004968292</a></li>
          </ul>
        </div>

      </div>

        <div>
            <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ shoppersstyle.com - All Rights Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
