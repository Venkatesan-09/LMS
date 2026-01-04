import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import {  useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

const navigate = useNavigate();
const [input,setInput] = useState(data ? data : '')

const onSearchHandeler = (e)=>{
   e.preventDafault();
   navigate('/course-list/'+input)
}

  return (
   
        <form onSubmit={onSearchHandeler} className='relative w-full max-w-2xl mx-auto'>
    <img 
        src={assets.search_icon} 
        alt="search-icon" 
        className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10' 
    />
    <div className='relative'>
        <input 
            onChange={e => setInput(e.target.value)} 
            value={input} 
            type="text" 
            placeholder='Search for courses' 
            className='w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md' 
        />
        <button 
            type='submit' 
            className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-300'
        >
            Search
        </button>
    </div>
</form>
  )
}

export default SearchBar