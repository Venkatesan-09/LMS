import React, { useContext } from 'react'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk,UserButton,useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext'

const Navbar = () => {

const navigate = useNavigate()
const {isEducator} = useContext(AppContext)

  const isCourseListPage = location.pathname.includes('/course-list')

  const {openSignIn} = useClerk()
  const {user} = useUser()

  return (
    <div className={`w-full shadow-md ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-300" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
             { user && <> <button onClick={()=>{navigate('/educator')}} className="text-gray-700 hover:text-cyan-600 font-medium px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors duration-300">
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>
              <Link 
                to='/my-enrollments' 
                className="text-gray-700 hover:text-cyan-600 font-medium px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors duration-300">
                My Enrollments
              </Link>
              </>}
            </div>
           { user ? <UserButton/> :
            <button onClick={()=>openSignIn()} className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md">
              Create Account
            </button>}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-4">
            <div className="flex items-center space-x-3">
              { user && <>
              <button onClick={()=>{navigate('/educator')}} className="text-gray-700 hover:text-cyan-600 font-medium px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors duration-300">
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>
              <Link 
                to='/my-enrollments' 
                className="text-gray-700 hover:text-cyan-600 font-medium text-sm px-3 py-1.5 rounded-lg hover:bg-cyan-50 transition-colors duration-300">
                Enrollments
              </Link>
              </>}
            </div>
            {
                user ? <UserButton/> :
                <button onClick={()=>openSignIn()} className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300">
              <img src={assets.user_icon} alt="User" className="h-8 w-8 rounded-full" />
            </button>
            }
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar