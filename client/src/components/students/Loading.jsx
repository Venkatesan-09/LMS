import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="relative">
        {/* Main spinner */}
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
        
        {/* Optional: Loading text */}
        <p className="mt-6 text-gray-600 font-medium text-center">Loading...</p>
      </div>
    </div>
  )
}

export default Loading