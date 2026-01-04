import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import quill from 'quill'
import { assets } from '../../assets/assets'

const AddCourse = () => {

const quillRef = useRef(null)
const editorRef = useRef(null)

const [courseTitle,setCourseTitle] = useState('')
const [coursePrice,setCoursePrice] = useState(0)
const [discount,setDiscount] = useState(0)
const [image,setImage] = useState(null)
const [chapters,setChapters] = useState([])
const [showPopup,setShowPopup] = useState(false)
const [currentChapterId,setCurrentChapterId] = useState(false)
const [lectureDetails,setLectureDetails] = useState(
  {
    lectureTitle : '',
    lecutreDuration : '',
    lectureUrl : '',
    isPreviewFree : false,
  }
)

const handleChapter = (action,chapterId) =>{
  if(action === 'add') {
    const title = prompt('Enter Chapter Name :');
    if(title) {
      const newChapter = {
        chapterId : uniqid(),
        chapterTitle : title,
        chapterContent : [],
        collapsed : false,
        chapterOrder : chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1
      };
      setChapters([...chapters,newChapter])
    }
  }
  else if (action === 'remove'){
    setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId))
  }
  else if (action === 'toggle'){
    setChapters(
      chapters.map((chapter) =>
      chapter.chapterId === chapterId ? {...chapter,collapsed : !chapter.collapsed} : chapter)
    )
  }
}

const handleLecture = (action,chapterId,lectureIndex) =>{
   if(action === 'add'){
    setCurrentChapterId(chapterId)
    setShowPopup(true)
   }
   else if(action === 'remove'){
    setChapters(
      chapters.map((chapter) =>{
        if(chapter.chapterId === chapterId) {
          chapter.chapterContent.splice(lectureIndex,1)
        }
        return chapter;
      })
    )
   }
}

const addLecture = ()=>{
  setChapters(
    chapters.map((chapter) =>{
      if(chapter.chapterId === currentChapterId) {
        const newLecture = {
          ...lectureDetails,
          lectureOrder : chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
          lectureId : uniqid()
        };
        chapter.chapterContent.push(newLecture)
      }
      return chapter
    })
  );
  setShowPopup(false)
  setLectureDetails({
    lectureTitle : '',
    lecutreDuration : '',
    lectureUrl : '',
    isPreviewFree : false,
  })
}

const handleSubmit = async (e) =>{
  e.preventDefault()
}

useEffect(()=>{
  // Initiate quill only once
 if(!quillRef.current && editorRef.current){
  quillRef.current = new quill(editorRef.current , {
    theme : 'snow',
  })
 }
},[])


  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
         <form onSubmit={handleSubmit} className='max-w-4xl mx-auto'>
          
          <div className='bg-white rounded-xl p-6 shadow-sm mb-6'>
            <p className='font-medium text-gray-700 mb-2'>Course Title</p>
            <input 
              type="text" 
              onChange={e => setCourseTitle(e.target.value)} 
              value={courseTitle} 
              placeholder='Type course title here' 
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
              required
            />
          </div>

          <div className='bg-white rounded-xl p-6 shadow-sm mb-6'>
            <p className='font-medium text-gray-700 mb-2'>Course Description</p>
            <div ref={editorRef} className='h-64 border border-gray-300 rounded-lg overflow-hidden'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
             <div className='bg-white rounded-xl p-6 shadow-sm'>
              <p className='font-medium text-gray-700 mb-2'>Course Price</p>
              <input 
                type="number" 
                onChange={e => setCoursePrice(e.target.value)} 
                value={coursePrice} 
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
                required 
              />
             </div>

             <div className='bg-white rounded-xl p-6 shadow-sm'>
              <p className='font-medium text-gray-700 mb-2'>Course Thumbnail</p>
              <label htmlFor="thumbnailImage" className='cursor-pointer'>
                <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors'>
                  <img src={assets.file_upload_icon} alt="Upload" className='w-10 h-10 mx-auto mb-3' />
                  <p className='text-gray-600'>Click to upload thumbnail</p>
                </div>
                <input type="file" id='thumbnailImage' onChange={e => setImage(e.target.files[0])} accept='image/*' hidden/>
                {image && (
                  <div className='mt-4'>
                    <img src={URL.createObjectURL(image)} alt="Preview" className='w-full h-40 object-cover rounded-lg' />
                  </div>
                )}
              </label>
             </div>
          </div>

          <div className='bg-white rounded-xl p-6 shadow-sm mb-6'>
            <p className='font-medium text-gray-700 mb-2'>Discount %</p>
            <input 
              type="number" 
              onChange={e => setDiscount(e.target.value)} 
              value={discount} 
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
              required 
              min={0} 
              max={100} 
            />
          </div>

          {/* adding chapters & lectures */}
           <div className='bg-white rounded-xl p-6 shadow-sm mb-6'>
            <p className='font-medium text-gray-700 mb-4'>Course Chapters & Lectures</p>
            <div className='space-y-4'>
              {chapters.map((chapter,chapterIndex)=>(
                <div key={chapterIndex} className='border border-gray-200 rounded-lg overflow-hidden'>
                    <div className='flex justify-between items-center p-4 bg-gray-50'>
                      <div className='flex items-center gap-3'>
                          <img 
                            onClick={()=>handleChapter('toggle',chapter.chapterId)} 
                            src={assets.dropdown_icon} 
                            width={14} 
                            alt="" 
                            className={`cursor-pointer transition-transform ${chapter.collapsed && '-rotate-90'}`}
                          />
                          <span className='font-medium text-gray-900'>{chapterIndex + 1}. {chapter.chapterTitle}</span>
                      </div>
                      <div className='flex items-center gap-4'>
                        <span className='text-gray-600 text-sm'>{chapter.chapterContent.length} Lectures</span>
                        <img 
                          onClick={()=> handleChapter('remove',chapter.chapterId)} 
                          src={assets.cross_icon} 
                          alt="Remove" 
                          className='w-4 h-4 cursor-pointer hover:opacity-70'
                        />
                      </div>
                    </div>
                    {!chapter.collapsed && (
                      <div className='p-4 bg-white'>
                        {chapter.chapterContent.map((lecture,lectureIndex)=>(
                          <div key={lectureIndex} className='flex justify-between items-center p-3 mb-2 bg-gray-50 rounded-lg last:mb-0'>
                            <span className='text-gray-700'>
                              {lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lecutreDuration} mins - 
                              <a href={lecture.lectureUrl} target='_blank' className='text-blue-600 hover:underline ml-1'>Link</a> - 
                              <span className={`ml-1 ${lecture.isPreviewFree ? 'text-green-600' : 'text-blue-600'}`}>
                                {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                              </span>
                            </span>
                            <img 
                              onClick={()=> handleLecture('remove',chapter.chapterId,lectureIndex)} 
                              src={assets.cross_icon} 
                              alt="Remove" 
                              className='w-4 h-4 cursor-pointer hover:opacity-70'
                            />
                          </div>
                        ))}
                        <div 
                          onClick={()=>handleLecture('add',chapter.chapterId)} 
                          className='flex items-center gap-2 text-blue-600 hover:text-blue-700 cursor-pointer mt-3'
                        >
                          <span>+</span>
                          <span>Add Lecture</span>
                        </div>
                      </div>
                    )}
                </div>
              ))}
              <div 
                onClick={()=> handleChapter('add')} 
                className='flex items-center gap-2 text-blue-600 hover:text-blue-700 cursor-pointer'
              >
                <span>+</span>
                <span>Add Chapter</span>
              </div>

              {showPopup && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
                  <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-2xl'>
                    <div className='flex justify-between items-center mb-6'>
                      <h2 className='text-xl font-bold text-gray-900'>Add Lecture</h2>
                      <img 
                        src={assets.cross_icon} 
                        alt="Close" 
                        className='w-5 h-5 cursor-pointer hover:opacity-70'
                        onClick={()=> setShowPopup(false)}
                      />
                    </div>
                    
                    <div className='space-y-4'>
                      <div>
                        <p className='font-medium text-gray-700 mb-2'>Lecture Title</p>
                        <input 
                          type="text" 
                          onChange={(e) => setLectureDetails({...lectureDetails,lectureTitle:e.target.value})} 
                          value={lectureDetails.lectureTitle}
                          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
                        />
                      </div>

                      <div>
                        <p className='font-medium text-gray-700 mb-2'>Duration (minutes)</p>
                        <input 
                          type="number" 
                          onChange={(e) => setLectureDetails({...lectureDetails,lecutreDuration:e.target.value})} 
                          value={lectureDetails.lecutreDuration}
                          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
                        />
                      </div>

                      <div>
                        <p className='font-medium text-gray-700 mb-2'>Lecture URL</p>
                        <input 
                          type="text" 
                          onChange={(e) => setLectureDetails({...lectureDetails,lectureUrl:e.target.value})} 
                          value={lectureDetails.lectureUrl}
                          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
                        />
                      </div>

                      <div className='flex items-center gap-3'>
                        <input 
                          type="checkbox" 
                          onChange={(e) => setLectureDetails({...lectureDetails,isPreviewFree:e.target.checked})} 
                          checked={lectureDetails.isPreviewFree}
                          className='w-5 h-5'
                        />
                        <p className='font-medium text-gray-700'>Is Preview Free</p>
                      </div>
                    </div>

                    <button 
                      onClick={addLecture} 
                      type='button'
                      className='w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors'
                    >
                      Add Lecture
                    </button>
                  </div>
                </div>
              )}
            </div>
           </div>
           
           <button 
             type='submit' 
             className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors'
           >
             ADD COURSE
           </button>
         </form>
    </div>
  )
}

export default AddCourse