import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/students/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Footer from '../../components/students/Footer'
import YouTube from 'react-youtube'

const CourseDetails = () => {

const {id} = useParams()

const [courseData,setCourseData] = useState(null)
const [openSections,setOpenSections] = useState({})
const [isAlreadyEnrolled,setIsAlreadyEnrolled] = useState(false)
const [playerData,setPlayerData] = useState(null)
const {allCourses,calculateRating,calculateChapterTime,calculateCourseDuration,calculateNoOfLectures,currency} = useContext(AppContext)

const fetchCourseData = async ()=>{
   const findCourse =  allCourses.find(course => course._id === id)
   setCourseData(findCourse)
}


useEffect(()=>{
  fetchCourseData()
},[allCourses])

const toggleSection = (index)=>{
   setOpenSections((prev)=>(
    {  ...prev,[index]:!prev[index]
      
    }
   ))
}

  return courseData ? <> (
    <div className='min-h-screen bg-gray-50'>
        <div className='bg-white shadow-sm'>
          <div className='max-w-7xl mx-auto px-4 py-4'>
            <p className='text-gray-600 text-sm'>
              <span className='hover:text-blue-600 cursor-pointer'>Courses</span> 
              <span className='mx-2'>/</span> 
              <span className='text-blue-600'>{courseData.courseTitle}</span>
            </p>
          </div>
        </div>

        <div className='max-w-7xl mx-auto px-4 py-6 md:py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            
            {/*left column */}
            <div className='lg:col-span-2 space-y-8'>
              <div className='bg-white rounded-xl p-6 shadow-sm'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>{courseData.courseTitle}</h1>
                <p className='text-gray-600 mb-6' dangerouslySetInnerHTML={{__html : courseData.courseDescription.slice(0,200)}}></p>
               

                {/* review and rating */}
                <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1.5'>
                      <p className='font-bold text-gray-900 text-base'>{calculateRating(courseData)}</p>
                      <div className='flex items-center'>
                        {[...Array(5)].map((_,i)=>(
                          <img 
                            className='w-4 h-4' 
                            src={i< Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} 
                            alt="star" 
                            key={i} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className='text-gray-500 text-sm'>({courseData.courseRatings.length}
                      {courseData.courseRatings.length > 1 ? ' ratings' : ' rating'})</p>
                  </div>
                  <div className='flex items-center gap-4'>
                    <p className='text-gray-600'>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length >1 ? 'students' : 'student'}</p>
                  </div>
                </div>

                <p className='text-gray-600 mb-8'>Course by <span className='font-semibold'>Greatstack</span></p>

                <div className='bg-gray-50 rounded-lg p-6'>
                  <h2 className='text-xl font-bold text-gray-900 mb-6'>Course Structure</h2>

                  <div className='space-y-4'>
                    {courseData.courseContent.map((chapter,index)=>(
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
                              <p className='font-medium text-gray-900'>{chapter.chapterTitle}</p>
                            </div>
                            <p className='text-gray-500 text-sm'>{chapter.chapterContent.length} Lectures - {calculateChapterTime(chapter)}</p>
                          </div>
                        </div>

                        <div className={`overflow-hidden transition-all duration-300 
                          ${openSections[index] ? 'max-h-[500px]' : 'max-h-0'}`}>
                          <ul className='p-4 space-y-3 bg-white'>
                            {chapter.chapterContent.map((lecture,i)=>(
                              <li key={i} className='flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg'>
                                <img src={assets.play_icon} alt="play-icon" className='w-5 h-5 mt-1' />
                                <div className='flex-1'>
                                  <p className='font-medium text-gray-900 mb-1'>{lecture.lectureTitle}</p>
                                  <div className='flex justify-between items-center'>
                                    {lecture.isPreviewFree && <p 
                                      onClick={()=>setPlayerData({videoId : lecture.lectureUrl.split('/').pop()})}
                                      className='text-blue-600 hover:text-blue-700 cursor-pointer text-sm font-medium'
                                    >
                                      Preview
                                    </p>}
                                    <p className='text-gray-500 text-sm'>
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
                </div>
              </div>

              <div className='bg-white rounded-xl p-6 shadow-sm'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>Course Description</h3>
                <div className='text-gray-600 leading-relaxed' dangerouslySetInnerHTML={{__html : courseData.courseDescription}}></div>
              </div>
            </div>

            {/*right column */}
            <div className='space-y-6'>
              <div className='bg-white rounded-xl p-6 shadow-sm sticky top-6'>
                <div className='mb-6'>
                  {
                    playerData ? 
                      <YouTube 
                        videoId={playerData.videoId} 
                        opts={{playerVars:{autoplay:1}}} 
                        iframeClassName='w-full aspect-video rounded-lg'
                      /> :
                      <img 
                        src={courseData.courseThumbnail} 
                        alt="course thumbnail" 
                        className='w-full h-48 object-cover rounded-lg'
                      />
                  }
                </div>

                <div className='bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6'>
                  <div className='flex items-center gap-2 mb-2'>
                    <img src={assets.time_left_clock_icon} alt="time-left-clock-icon" className='w-5 h-5' />
                    <p className='text-blue-700 font-medium'>
                      <span className='font-bold'>5 days</span> left at this price!
                    </p>
                  </div>
                </div>

                <div className='space-y-4 mb-6'>
                  <div className='flex items-baseline gap-3'>
                    <p className='text-3xl font-bold text-gray-900'>
                      {currency} {(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}
                    </p>
                    <p className='text-gray-400 line-through'>
                      {currency} {courseData.coursePrice.toFixed(2)}
                    </p>
                    <p className='text-green-600 font-semibold bg-green-50 px-2 py-1 rounded'>
                      {courseData.discount}% off
                    </p>
                  </div>

                  <div className='flex items-center justify-between bg-gray-50 p-4 rounded-lg'>
                    <div className='flex items-center gap-2'>
                      <img src={assets.star} alt="star-icon" className='w-4 h-4' />
                      <p className='font-medium'>{calculateRating(courseData)}</p>
                    </div>

                    <div className='h-4 w-px bg-gray-300'></div>

                    <div className='flex items-center gap-2'>
                      <img src={assets.time_clock_icon} alt="clock-icon" className='w-4 h-4' />
                      <p className='font-medium'>{calculateCourseDuration(courseData)}</p>
                    </div>

                    <div className='h-4 w-px bg-gray-300'></div>

                    <div className='flex items-center gap-2'>
                      <img src={assets.lesson_icon} alt="lesson-icon" className='w-4 h-4' />
                      <p className='font-medium'>{calculateNoOfLectures(courseData)} lessons</p>
                    </div>
                  </div>
                </div>

                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  isAlreadyEnrolled 
                    ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                }`}>
                  {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
                </button>

                <div className='mt-8 pt-6 border-t border-gray-200'>
                  <p className='font-bold text-gray-900 mb-4'>What's in the course?</p>
                  <ul className='space-y-3'>
                    <li className='flex items-start gap-2'>
                      <span className='text-green-600 mt-1'>✓</span>
                      <span className='text-gray-600'>Lifetime access with free updates.</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-green-600 mt-1'>✓</span>
                      <span className='text-gray-600'>Step-by-step, hands-on project guidance.</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-green-600 mt-1'>✓</span>
                      <span className='text-gray-600'>Downloadable resources and source code.</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-green-600 mt-1'>✓</span>
                      <span className='text-gray-600'>Quizzes to test your knowledge.</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-green-600 mt-1'>✓</span>
                      <span className='text-gray-600'>Certificate of completion.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <Footer/>
  ) </>  : <Loading/>
}

export default CourseDetails