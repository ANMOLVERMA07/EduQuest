import React from 'react'
import { assets } from '../../assets/assets'
import { Navigate, useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full p-3 mt-10'>
      <div className='flex flex-col md:flex-row items-start x-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        <div className='flex flex-col md:items-start items-center w-full'>
          {/* <h1 src={assets.logo_dark} alt="" /> */}
          <h1 className='text-amber-50 text-3xl' onClick={() =>
            document.getElementById("target-home").scrollIntoView({ behavior: "smooth" })
          }
 >EduQuest</h1>
          <p className='mt-6 text-center md:text-left text-sm text-white/80'>Our mission is to empower learners across the globe by providing high-quality education anytime, anywhere. We believe that education is the foundation for growth and innovation, and we're here to make it accessible to everyone.</p>
        </div>
        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-semibold text-white mb-5'>Company</h2>
          <ul className='flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2'>
            <li><a onClick={() =>
              document.getElementById("target-home").scrollIntoView({ behavior: "smooth" })
            }>Home</a></li>
            <li><a onClick={() =>
              document.getElementById("target-about").scrollIntoView({ behavior: "smooth" })
            }
            >About us</a></li>
            <li><a onClick={() =>
              document.getElementById("target-contact").scrollIntoView({ behavior: "smooth" })
            }>Contact us</a></li>
            {/* <li><a href="#">Privacy Policy</a></li> */}
          </ul>
        </div>
        <div className='hidden  md:flex flex-col items-start w-full'>
          <h2 className='font-semibold text-white mb-5'>Subscribe to our newsletter</h2>
          <p className='text-sm text-white/80'>The lastest news, articles, and reources,sent to your inbox weekly</p>
          <div className='flex items-center gap-2 pt-2'>
            <input type="email" className='border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm' placeholder='Enter Your Email' />
            <button className='bg-blue-600 w-24 h-9 text-white rounded'>Subscribe</button>
          </div>

        </div>

      </div>
      <p className='py-4 text-center text-xs md:text-sm text-white/60'>Copyright 2025 @ Learn. All Right Reserved.</p>
    </footer>
  )
}

export default Footer