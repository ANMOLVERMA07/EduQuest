import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar.jsx';
import Companies from './Companies.jsx';
import CourseSection from './CourseSection.jsx';
import Testimonials from './Testimonials.jsx';
import CallToAction from './CallToAction.jsx';
import Footer from './Footer.jsx';
import About from '../../components/About.jsx'
import ContactUs from '../../components/ContactUs.jsx'

const Hero = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full md:pt-36    md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70">
        <h1 className="text-5xl leading-snug md:text-home-heading-large p-3 mt-4 text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto">
          Empower your future with the courses designed to{' '}
          <span className="text-blue-600">fit your choice.</span>
          <img src={assets.sketch} alt="sketch" className="md:block hidden absolute -bottom-7 right-0" />
        </h1>
        <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
          We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
        </p>
        <p className="md:hidden text-gray-500 max-w-sm mx-auto">
          We bring together world-class instructors to help you achieve your professional goals.
        </p>
        <SearchBar/>
        <Companies/>
        <About/>
        <CourseSection/>
        <Testimonials/>
        <CallToAction/>
        <ContactUs/>
        <Footer/>
      </div>


    </div>
  )
}

export default Hero