import React from 'react'
import { assets, dummyEducatorData } from '../../assets/assets';
import {UserButton,useUser} from '@clerk/clerk-react'
import { Link } from 'react-router-dom';

const Navbar = () => {

const educatorData = dummyEducatorData
const {user} = useUser()

  return (
    <div className='bg-white shadow-md border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          
          <Link to='/' className='flex items-center'>
            <img 
              src={assets.logo} 
              alt="Logo" 
              className='h-8 w-auto hover:opacity-80 transition-opacity duration-200'
            />
          </Link>
          
          <div className='flex items-center gap-4'>
            <p className='text-gray-700 font-medium hidden sm:block'>
              Hi! {user ? user.fullName : 'Developers'}
            </p>
            
            {user ? (
              <div className='ml-2'>
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10",
                    }
                  }}
                />
              </div>
            ) : (
              <img 
                src={assets.profile_img} 
                alt='Profile' 
                className='w-10 h-10 rounded-full border-2 border-gray-200 object-cover'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar