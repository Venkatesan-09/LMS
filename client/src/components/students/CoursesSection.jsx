import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

const CoursesSection = () => {

const {allCourses} = useContext(AppContext)

  return (
   <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center'>
    <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
        Learn from the best
    </h2>
    <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10'>
        Discover our top-rated courses across various categories. From coding and design to business and wellness,
        our courses are crafted to deliver results.
    </p>

     <div className='grid grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4'>
        {allCourses.slice(0,4).map((course,index)=> <CourseCard key={index} course={course}/>)}
     </div>

    <Link 
        to={'/course-list'} 
        onClick={()=>scrollTo(0,0)} 
        className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-lg'
    >
        Show all courses
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
    </Link>
</div>
  )
}

export default CoursesSection