import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='bg-gray-900 text-white'>
        <footer className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10'>
                 <div className='space-y-4'>
                    <img src={assets.logo_dark} alt="logo" className='w-40 h-auto' />
                    <p className='text-gray-400 text-sm leading-relaxed'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium debitis quae eligendi fuga repellat explicabo magnam sunt velit enim nesciunt, sapiente tempora ex delectus molestiae excepturi asperiores doloribus at mollitia! Deleniti quos inventore debitis voluptatibus alias molestiae ipsum a 
                        nulla rerum! Ad at cumque repudiandae nulla, commodi nisi vero libero.
                    </p>
                 </div>
                 <div className='space-y-4'>
                    <h2 className='text-lg font-semibold text-white mb-4'>Company</h2>
                    <ul className='space-y-3'>
                        <li><a href="#" className='text-gray-400 hover:text-white transition-colors duration-300'>Home</a></li>
                        <li><a href="#" className='text-gray-400 hover:text-white transition-colors duration-300'>About us</a></li>
                        <li><a href="#" className='text-gray-400 hover:text-white transition-colors duration-300'>Contact us</a></li>
                        <li><a href="#" className='text-gray-400 hover:text-white transition-colors duration-300'>Privacy policy</a></li>
                    </ul>
                 </div>
                 <div className='space-y-4'>
                    <h2 className='text-lg font-semibold text-white mb-4'>Subscribe to our newsletter</h2>
                    <p className='text-gray-400 text-sm'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus id minima nulla! Ratione aliquid natus 
                        impedit quisquam modi ullam commodi perspiciatis sequi numquam inventore, accusamus voluptatibus repellat dignissimos culpa quia?
                    </p>
                    <div className='flex flex-col sm:flex-row gap-2'>
                        <input 
                            type="email" 
                            placeholder='Enter your email' 
                            className='flex-grow px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        />
                        <button className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 whitespace-nowrap'>
                            Subscribe
                        </button>
                    </div>
                 </div>
            </div>
            <div className='border-t border-gray-800 pt-6'>
                <p className='text-gray-500 text-center text-sm'>
                    Copyright 2025 @ Greatstack. All Right Reserved.
                </p>
            </div>
        </footer>
    </div>
  )
}

export default Footer