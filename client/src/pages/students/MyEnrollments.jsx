import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Line } from 'rc-progress'
import Footer from '../../components/students/Footer'

const MyEnrollments = () => {

const {enrolledCourses,calculateCourseDuration} = useContext(AppContext)
const navigate = useNavigate();
const [progressArray,setProgressArray] = useState([
  {lectureCompleted : 2,totalLectures : 4},
  {lectureCompleted : 1,totalLectures : 5},
  {lectureCompleted : 3,totalLectures : 6},
  {lectureCompleted : 5,totalLectures : 7},
  {lectureCompleted : 6,totalLectures : 8},
  {lectureCompleted : 2,totalLectures : 9},
  {lectureCompleted : 4,totalLectures : 4},
  {lectureCompleted : 3,totalLectures : 7},
  {lectureCompleted : 7,totalLectures : 10},
  {lectureCompleted : 1,totalLectures : 5},
  {lectureCompleted : 0,totalLectures : 7},
  {lectureCompleted : 5,totalLectures : 8},
  {lectureCompleted : 3,totalLectures : 6},
  {lectureCompleted : 2,totalLectures : 5},
])

  return (
    <>
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>My Enrollments</h1>
        <p className='text-gray-600 mb-8'>Track your learning progress and continue your courses</p>
        
        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='py-4 px-6 text-left text-gray-700 font-semibold'>Course</th>
                  <th className='py-4 px-6 text-left text-gray-700 font-semibold'>Duration</th>
                  <th className='py-4 px-6 text-left text-gray-700 font-semibold'>Completed</th>
                  <th className='py-4 px-6 text-left text-gray-700 font-semibold'>Status</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {enrolledCourses.map((course,index)=>(
                  <tr key={index} className='hover:bg-gray-50 transition-colors'>
                    <td className='py-4 px-6'>
                      <div className='flex items-center gap-4'>
                        <img 
                          src={course.courseThumbnail} 
                          alt={course.courseTitle} 
                          className='w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg'
                        />
                        <div className='flex-1 min-w-0'>
                          <p className='font-medium text-gray-900 truncate'>{course.courseTitle}</p>
                          <div className='mt-2 flex items-center gap-3'>
                            <Line 
                              strokeWidth={3} 
                              strokeColor={progressArray[index] && (progressArray[index].lectureCompleted * 100)/progressArray[index].totalLectures === 100 ? '#10B981' : '#3B82F6'} 
                              trailColor='#E5E7EB' 
                              percent={progressArray[index] ? (progressArray[index].lectureCompleted * 100)/progressArray[index].totalLectures : 0} 
                              className='w-24 md:w-32'
                            />
                            <span className='text-sm text-gray-600'>
                              {progressArray[index] ? Math.round((progressArray[index].lectureCompleted * 100)/progressArray[index].totalLectures) : 0}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='py-4 px-6'>
                      <span className='text-gray-700 font-medium'>
                        {calculateCourseDuration(course)}
                      </span>
                    </td>
                    <td className='py-4 px-6'>
                      <div className='flex flex-col'>
                        <span className='text-gray-900 font-medium'>
                          {progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`}
                        </span>
                        <span className='text-gray-500 text-sm'>Lectures</span>
                      </div>
                    </td>
                    <td className='py-4 px-6'>
                      <button 
                        onClick={()=>navigate('/player/' + course._id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1 ? 'Completed' : 'Continue'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {enrolledCourses.length === 0 && (
            <div className='text-center py-16'>
              <div className='text-gray-400 text-6xl mb-4'>📚</div>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>No enrollments yet</h3>
              <p className='text-gray-500 mb-6'>Explore our courses and start learning today!</p>
              <button 
                onClick={() => navigate('/course-list')}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors'
              >
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default MyEnrollments