import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({course}) => {

const {currency,calculateRating} = useContext(AppContext)

  return (
 <Link 
    to={'/course/'+ course._id} 
    onClick={()=>scrollTo(0,0)} 
    className='group block bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 border border-gray-100 h-full flex flex-col'
>
    <div className='relative overflow-hidden flex-shrink-0'>
        <div className='relative pt-[56.25%]'> {/* 16:9 Aspect Ratio Container */}
            <img 
                className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                src={course.courseThumbnail} 
                alt={course.courseTitle} 
                loading='lazy'
            />
        </div>
        <div className='absolute top-3 right-3 bg-blue-600 text-white text-xs md:text-sm font-semibold px-2.5 md:px-3 py-1 md:py-1.5 rounded-full'>
            -{course.discount}%
        </div>
    </div>
    
    <div className='p-4 md:p-5 lg:p-6 flex flex-col flex-grow'>
        <h3 className='text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 flex-grow'>
            {course.courseTitle}
        </h3>
        <p className='text-gray-600 text-sm mb-3 md:mb-4'>Great stack</p>
        
        <div className='flex items-center justify-between mb-3 md:mb-4'>
            <div className='flex items-center gap-1.5 md:gap-2'>
                <p className='font-bold text-gray-900 text-sm md:text-base'>{calculateRating(course)}</p>
                <div className='flex items-center'>
                    {[...Array(5)].map((_,i)=>(
                        <img 
                            className='w-3 h-3 md:w-3.5 md:h-3.5' 
                            src={i< Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} 
                            alt="star" 
                            key={i} 
                        />
                    ))}
                </div>
            </div>
            <p className='text-gray-500 text-xs md:text-sm'>{course.courseRatings.length}</p>
        </div>
        
        <div className='flex items-center justify-between mt-auto'>
            <div className='flex items-baseline gap-1.5 md:gap-2'>
                <p className='text-lg md:text-xl lg:text-2xl font-bold text-gray-900'>
                    {currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}
                </p>
                <p className='text-gray-400 line-through text-xs md:text-sm'>
                    {currency}{course.coursePrice.toFixed(2)}
                </p>
            </div>
            {/* <button className='bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg transition-colors duration-300 whitespace-nowrap'>
                View Details
            </button> */}
        </div>
    </div>
</Link>
  )
}

export default CourseCard