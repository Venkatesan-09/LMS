import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 sm:px-6 lg:px-8 overflow-hidden'>
        {/* Background decorative elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-50 blur-3xl'></div>
          <div className='absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-100 rounded-full opacity-50 blur-3xl'></div>
        </div>
        
        <div className='relative max-w-6xl mx-auto text-center z-10'>
            {/* Main heading */}
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8'>
                Empower your future with the courses designed to 
                <span className='text-blue-600 relative inline-block'>
                    fit your choice.
                    <img 
                        src={assets.sketch} 
                        alt="sketch" 
                        className='absolute -bottom-4 left-0 w-full h-3 sm:h-4 object-contain' 
                    />
                </span>
            </h1>

            {/* Desktop description - hidden on mobile */}
            <p className='hidden md:block text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12 px-4'>
                We bring together world-class instructions, interactive content, and a supportive
                community to help you achieve your personal and professional goals.
            </p>
            <SearchBar/>
        
        {/* Mobile description - hidden on desktop */}
            <p className='md:hidden text-lg text-gray-600 max-w-md mx-auto leading-relaxed mb-12'>
                We bring together world-class instructors to help you achieve your professional goals.
            </p>

            

        </div>
    </div>
  )
}

export default Hero