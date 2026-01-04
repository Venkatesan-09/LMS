import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className=" py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">
          Learn anything, anytime, anywhere
        </h1>
        
        <p className="text-black-100 mb-8 md:mb-10 max-w-2xl mx-auto">
          Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident 
          excepteur commodo do ea.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center bg-blue">
          <button className="bg-blue-200 text-blue-600 font-medium px-8 py-3 rounded-lg hover:bg-blue-10 transition-colors">
            Get Started
          </button>
          
          <button className="bg-transparent border border-black text-black font-medium px-8 py-3 rounded-lg hover:bg-black/10 transition-colors flex items-center justify-center gap-2">
            Learn More
            <img 
              src={assets.arrow_icon} 
              alt="arrow-icon" 
              className="w-4 h-4"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CallToAction