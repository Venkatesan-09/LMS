import React from 'react'
import {assets, dummyTestimonial } from '../../assets/assets'

const TestmonialSections = () => {
  return (
    <div className='max-w-6xl mx-auto px-4 py-16'>
        <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                Testimonials
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
                Hear from our learners as they share their journeys of transformation and success.
            </p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {dummyTestimonial.map((testimonial,index)=>(
                <div 
                    key={index} 
                    className='bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300'
                >
                    <div className='flex items-center gap-4 mb-6'>
                        <img 
                            className='w-14 h-14 rounded-full object-cover border-2 border-gray-200' 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                        />
                        <div>
                            <h3 className='text-lg font-bold text-gray-900'>{testimonial.name}</h3>
                            <p className='text-gray-600 text-sm'>{testimonial.role}</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center gap-2 mb-4'>
                        <div className='flex'>
                            {[...Array(5)].map((_, i) => (
                                <img 
                                    className='w-5 h-5' 
                                    key={i} 
                                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} 
                                    alt="star" 
                                />
                            ))}
                        </div>
                        <span className='text-gray-700 font-bold ml-2'>
                            {testimonial.rating}
                        </span>
                    </div>
                    
                    <p className='text-gray-700 italic mb-4'>
                        "{testimonial.feedback}"
                    </p>
                    
                    <a href="#" className='text-blue-600 text-sm hover:underline'>
                        Read more
                    </a>
                </div>
            ))}
        </div>
        
        <div className='text-center mt-12'>
            <button className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors'>
                View All Testimonials
            </button>
        </div>
    </div>
  )
}

export default TestmonialSections