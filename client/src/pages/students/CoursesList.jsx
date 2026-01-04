import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SearchBar from '../../components/students/SearchBar'
import { AppContext } from '../../context/AppContext'
import CourseCard from '../../components/students/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../components/students/Footer'

const CoursesList = () => {

const naviagte = useNavigate()
const {input} = useParams()
const {allCourses} = useContext(AppContext)
const [filteredCourse,setFilteredCourse] = useState([])

useEffect(()=>{
   if(allCourses && allCourses.length > 0){
    const tempCourses = allCourses.slice()

    input ? setFilteredCourse(
        tempCourses.filter(
            item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
        )
    )  : setFilteredCourse(tempCourses)
   }
},[allCourses,input])

  return (
    <>
    <div className='min-h-screen bg-gray-50'>
        <div className='bg-white shadow-sm'>
            <div className='max-w-7xl mx-auto px-4 py-8 md:py-12'>
                <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>Course List</h1>
                <p className='text-gray-600'>
                    <span className='hover:text-blue-600 cursor-pointer transition-colors' onClick={()=>naviagte('/')}>Home</span> 
                    <span className='mx-2'>/</span> 
                    <span className='text-blue-600'>Course List</span>
                </p>
            </div>
            <div className='max-w-7xl mx-auto px-4 pb-8'>
                <SearchBar data={input}/>
            </div>
        </div>
        
        {input && (
            <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg m-4 md:mx-auto md:my-6'>
                <p className='text-blue-700 font-medium'>Search results for: "{input}"</p>
                <img 
                    src={assets.cross_icon} 
                    alt="Clear search" 
                    className='w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity'
                    onClick={()=> naviagte('/course-list')}
                />
            </div>
        )}
        
        <div className='max-w-7xl mx-auto px-4 py-8 md:py-12'>
            {filteredCourse.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
                    {filteredCourse.map((course,index)=> (
                        <CourseCard key={index} course={course}/>
                    ))}
                </div>
            ) : (
                <div className='text-center py-16'>
                    <div className='text-gray-400 mb-4'>📚</div>
                    <h3 className='text-xl font-semibold text-gray-700 mb-2'>No courses found</h3>
                    <p className='text-gray-500 mb-6'>Try searching with different keywords</p>
                    <button 
                        onClick={()=> naviagte('/course-list')}
                        className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors'
                    >
                        View All Courses
                    </button>
                </div>
            )}
        </div>
    </div>
    
    <Footer/>
    </>
  )
}

export default CoursesList