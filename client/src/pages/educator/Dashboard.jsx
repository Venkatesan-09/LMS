import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets, dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/students/Loading'

const Dashboard = () => {

const [dashboardData,setDashboardData] = useState(null)
const {currency} = useContext(AppContext)

const fetchDashboardData = async ()=>{
  setDashboardData(dummyDashboardData)
}

useEffect(()=>{
  fetchDashboardData()
},[])

  return dashboardData ? (
    <div className='p-6'>
      <div className='space-y-8'>
        
        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                <img src={assets.patients_icon} alt="enrollments" className='w-7 h-7' />
              </div>
              <div>
                <p className='text-3xl font-bold text-gray-900'>{dashboardData.enrolledStudentsData.length}</p>
                <p className='text-gray-600'>Total Enrolments</p>
              </div>
            </div>
          </div>
          
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                <img src={assets.appointments_icon} alt="courses" className='w-7 h-7' />
              </div>
              <div>
                <p className='text-3xl font-bold text-gray-900'>{dashboardData.totalCourses}</p>
                <p className='text-gray-600'>Total Courses</p>
              </div>
            </div>
          </div>
          
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
                <img src={assets.earning_icon} alt="earnings" className='w-7 h-7' />
              </div>
              <div>
                <p className='text-3xl font-bold text-gray-900'>{currency} {dashboardData.totalEarnings}</p>
                <p className='text-gray-600'>Total Earnings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Enrolments Table */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='p-6 border-b border-gray-200'>
            <h2 className='text-xl font-bold text-gray-900'>Latest Enrolments</h2>
          </div>
          
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='py-3 px-6 text-left text-gray-700 font-semibold'>#</th>
                  <th className='py-3 px-6 text-left text-gray-700 font-semibold'>Student Name</th>
                  <th className='py-3 px-6 text-left text-gray-700 font-semibold'>Course Title</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {dashboardData.enrolledStudentsData.map((item,index)=>(
                  <tr key={index} className='hover:bg-gray-50 transition-colors'>
                    <td className='py-4 px-6 text-gray-600 font-medium'>{index + 1}</td>
                    <td className='py-4 px-6'>
                      <div className='flex items-center gap-3'>
                        <img 
                          src={item.student.imageUrl} 
                          alt="profile" 
                          className='w-9 h-9 rounded-full object-cover'
                        />
                        <span className='text-gray-900 font-medium'>{item.student.name}</span>
                      </div>
                    </td>
                    <td className='py-4 px-6 text-gray-700'>{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  ) : <Loading/>
}

export default Dashboard