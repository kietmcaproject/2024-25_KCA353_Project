import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Shoppers Style was started with a simple goal: to make online shopping easy and enjoyable. We wanted to create a place where people could quickly find and buy products they love, all from home.</p>
          <p>Since then, we’ve worked hard to offer a variety of high-quality products to suit every style. From fashion and beauty to electronics and home goods, we provide a wide range of items from brands you can trust.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Shoppers Style is to give customers choice, convenience, and confidence. We aim to make your shopping experience smooth from start to finish.</p>
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
          <p className=' text-gray-600'>We carefully choose and check each product to meet high quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
          <p className=' text-gray-600'>With our easy-to-use site and smooth ordering, shopping is easier than ever.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
          <p className=' text-gray-600'>Our friendly team is here to help every step of the way, making sure you’re satisfied.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
