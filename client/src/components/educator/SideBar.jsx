import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

const SideBar = () => {

const {isEducator} = useContext(AppContext)

const menuItems = [{name:'Dashboard',path:'/educator',icon:assets.home_icon},
                   {name:'Add Course',path:'/educator/add-course',icon:assets.add_icon},
                   {name:'My Courses',path:'/educator/my-courses',icon:assets.my_course_icon},
                   {name:'Student Enrolled',path:'/educator/student-enrolled',icon:assets.person_tick_icon},

];

  return isEducator && (
    <div className='w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen p-6'>
      <div className='space-y-2'>
        {menuItems.map((item)=>(
          <NavLink 
            to={item.path} 
            key={item.name} 
            end={item.path === '/educator'}
            className={({isActive}) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <img 
              src={item.icon} 
              alt={item.name} 
              className='w-5 h-5' 
            />
            <p className='font-medium'>{item.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default SideBar