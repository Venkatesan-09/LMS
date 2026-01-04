import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/students/Loading'

const MyCourses = () => {

const {currency,allCourses} = useContext(AppContext)
const [courses,setCourses] = useState(null)

const fetchEducatedCourses = async ()=>{
  setCourses(allCourses)
}

useEffect(()=>{
  fetchEducatedCourses()
},[])

  return courses ? (
    <div className='p-6'>
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-2xl font-bold text-gray-900'>My Courses</h2>
          <p className='text-gray-600 mt-1'>Manage and track your published courses</p>
        </div>
        
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='py-4 px-6 text-left text-gray-700 font-semibold'>All Courses</th>
                <th className='py-4 px-6 text-left text-gray-700 font-semibold'>Earnings</th>
                <th className='py-4 px-6 text-left text-gray-700 font-semibold'>Students</th>
                <th className='py-4 px-6 text-left text-gray-700 font-semibold'>Published On</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {courses.map((course)=>(
                <tr key={course._id} className='hover:bg-gray-50 transition-colors'>
                  <td className='py-4 px-6'>
                    <div className='flex items-center gap-4'>
                      <img 
                        src={course.courseThumbnail} 
                        alt="course-image" 
                        className='w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg'
                      />
                      <span className='font-medium text-gray-900'>{course.courseTitle}</span>
                    </div>
                  </td>
                  <td className='py-4 px-6'>
                    <span className='font-semibold text-green-600'>
                      {currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}
                    </span>
                  </td>
                  <td className='py-4 px-6'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium text-gray-900'>{course.enrolledStudents.length}</span>
                      <span className='text-gray-500 text-sm'>students</span>
                    </div>
                  </td>
                  <td className='py-4 px-6 text-gray-600'>
                    {new Date (course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <Loading/>
}

export default MyCourses