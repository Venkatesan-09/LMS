import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import Loading from '../../components/students/Loading'

const StudedtsEnrolled = () => {

 const [enrolledStudents,setEnrolledStudents] = useState(null)

 const fetchEnrolledStudents = async ()=>{
   setEnrolledStudents(dummyStudentEnrolled)
 }

 useEffect(()=>{
   fetchEnrolledStudents()
 },[])

  return enrolledStudents ? (
    <div className='p-6'>
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-2xl font-bold text-gray-900'>Students Enrolled</h2>
          <p className='text-gray-600 mt-1'>View all students enrolled in your courses</p>
        </div>
        
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='py-4 px-6 text-left text-gray-700 font-semibold'>#</th>
                <th className='py-4 px-6 text-left text-gray-700 font-semibold'>Student Name</th>
                <th className='py-4 px-6 text-left text-gray-700 font-semibold'>Course Title</th>
                <th className='py-4 px-6 text-left text-gray-700 font-semibold'>Date</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {enrolledStudents.map((item,index)=>(
                <tr key={index} className='hover:bg-gray-50 transition-colors'>
                  <td className='py-4 px-6 text-gray-600 font-medium'>{index + 1}</td>
                  <td className='py-4 px-6'>
                    <div className='flex items-center gap-3'>
                      <img 
                        src={item.student.imageUrl} 
                        alt={item.student.name} 
                        className='w-10 h-10 rounded-full object-cover'
                      />
                      <span className='font-medium text-gray-900'>{item.student.name}</span>
                    </div>
                  </td>
                  <td className='py-4 px-6 text-gray-700'>{item.courseTitle}</td>
                  <td className='py-4 px-6 text-gray-600'>
                    {new Date (item.purchaseDate).toLocaleDateString()}
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

export default StudedtsEnrolled