import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import Footer from '../../components/students/Footer'
import Rating from '../../components/students/Rating'

const Player = () => {

const {enrolledCourses,calculateChapterTime} = useContext(AppContext)
const {courseId} = useParams()
const [courseData,setCourseData] = useState(null)
const [openSections,setOpenSections] = useState({})
const [playerData,setPlayerData] = useState(null)

const getCourseData = ()=>{
  enrolledCourses.map((course)=>{
     if(course._id === courseId){
      setCourseData(course)
     }
  })
}

const toggleSection = (index)=>{
   setOpenSections((prev)=>(
    {  ...prev,[index]:!prev[index]
      
    }
   ))
}

useEffect(()=>{
  getCourseData()
},[enrolledCourses])

  return (
    <>
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          
          {/*left column */}
          <div className='lg:col-span-1.5 bg-white rounded-xl p-6 shadow-sm'>
            <h2 className='text-xl font-bold text-gray-900 mb-6'>Course Structure</h2>
            <div className='space-y-4'>
              {courseData && courseData.courseContent.map((chapter,index)=>(
                <div key={index} className='border border-gray-200 rounded-lg overflow-hidden'>
                  <div 
                    onClick={()=>toggleSection(index)} 
                    className='bg-white p-4 cursor-pointer hover:bg-gray-50 transition-colors'
                  >
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-3'>
                        <img 
                          className={`transform transition-transform ${openSections [index] ? 'rotate-180':''} w-5 h-5`} 
                          src={assets.down_arrow_icon} 
                          alt="arrow-icon" 
                        />
                        <p className='font-medium text-gray-900 text-sm'>{chapter.chapterTitle}</p>
                      </div>
                      <p className='text-gray-500 text-xs pl-7'>{chapter.chapterContent.length} Lectures - {calculateChapterTime(chapter)}</p>
                    </div>
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 
                    ${openSections[index] ? 'max-h-[500px]' : 'max-h-0'}`}>
                    <ul className='p-4 space-y-3 bg-white'>
                      {chapter.chapterContent.map((lecture,i)=>(
                        <li key={i} className='flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg'>
                          <img src={false ? assets.blue_tick_icon : assets.play_icon} alt="play-icon" className='w-4 h-4 mt-1' />
                          <div className='flex-1'>
                            <p className='font-medium text-gray-900 text-sm mb-1'>{lecture.lectureTitle}</p>
                            <div className='flex justify-between items-center'>
                              {lecture.lectureUrl && <p 
                                onClick={()=>setPlayerData({...lecture,chapter:index + 1 ,lecture:i + 1})}
                                className='text-blue-600 hover:text-blue-700 cursor-pointer text-xs font-medium'
                              >
                                Watch
                              </p>}
                              <p className='text-gray-500 text-xs'>
                                {humanizeDuration(lecture.lectureDuration * 60 * 1000,{units:['h','m']})}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <div className='mt-8 pt-6 border-t border-gray-200'>
              <h1 className='text-lg font-bold text-gray-900 mb-4'>Rate this Course: </h1>
              <Rating initialRating={0}/>
            </div>
          </div>

          {/*right column */}
          <div className='lg:col-span-3 space-y-6'>
            {playerData ? (
              <div className='bg-white rounded-xl p-6 shadow-sm'>
                <div className='mb-6'>
                  <YouTube 
                    videoId={playerData.lectureUrl.split('/').pop()}  
                    iframeClassName='w-full aspect-video rounded-lg'
                  />
                </div>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-xl font-bold text-gray-900'>
                      {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
                    </p>
                  </div>
                  <button className={`px-6 py-2 rounded-lg font-medium ${
                    false 
                      ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors'
                  }`}>
                    {false ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            ) : (
              <div className='bg-white rounded-xl p-6 shadow-sm'>
                <div className='flex flex-col items-center justify-center py-12'>
                  <img 
                    src={courseData ? courseData.courseThumbnail : ''} 
                    alt='Course thumbnail' 
                    className='w-full max-w-2xl h-auto rounded-lg mb-6'
                  />
                  <p className='text-gray-600 text-lg text-center'>
                    Select a lecture from the course structure to start learning
                  </p>
                </div>
              </div>
            )}
            
            {/* Course description section */}
            {courseData && (
              <div className='bg-white rounded-xl p-6 shadow-sm'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>About this course</h3>
                <p className='text-gray-600 mb-2'><span className='font-medium'>Course:</span> {courseData.courseTitle}</p>
                <p className='text-gray-600 mb-4'><span className='font-medium'>Instructor:</span> {courseData.educator?.name || 'Greatstack'}</p>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-gray-700 text-sm'>{courseData.courseDescription?.slice(0,300)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Player