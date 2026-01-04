import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-10'>
          
          {/* Logo Section */}
          <div className='text-center lg:text-left'>
            <div className='flex justify-center lg:justify-start mb-4'>
              <img 
                src={assets.logo} 
                alt="GreatStack Logo" 
                className='h-12 w-auto brightness-0 invert'
              />
            </div>
            <p className='text-gray-400 text-sm max-w-xs'>
              Empowering learners worldwide with quality education and innovative learning solutions.
            </p>
          </div>

          {/* Copyright Section */}
          <div className='text-center'>
            <p className='text-gray-300 font-medium mb-2'>© 2025 GreatStack</p>
            <p className='text-gray-400 text-sm'>
              All rights reserved
            </p>
          </div>

          {/* Social Media Section */}
          <div className='text-center lg:text-right'>
            <p className='text-gray-300 font-medium mb-4'>Connect with us</p>
            <div className='flex justify-center lg:justify-end gap-5'>
              <a 
                href="" 
                className='w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110'
              >
                <img 
                  src={assets.facebook_icon} 
                  alt="Facebook" 
                  className='w-5 h-5'
                />
              </a>
              <a 
                href="" 
                className='w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-sky-500 transition-all duration-300 hover:scale-110'
              >
                <img 
                  src={assets.twitter_icon} 
                  alt="Twitter" 
                  className='w-5 h-5'
                />
              </a>
              <a 
                href="" 
                className='w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-110'
              >
                <img 
                  src={assets.instagram_icon} 
                  alt="Instagram" 
                  className='w-5 h-5'
                />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className='mt-12 pt-8 border-t border-gray-800 text-center'>
          <p className='text-gray-500 text-sm'>
            Copyright 2025 @ GreatStack. All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer