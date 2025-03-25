import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import { AppContext } from '../../context/AppContext'
const CourseSection = () => {

  const {allCourses}=useContext(AppContext)
  return (
    <div className='py-16 md:px-40 px-4'>
     
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3 mb-5'>Discover our top-rated courses across various categories. From coding and design to <br /> business and wellness, our courses are crafted to deliver results.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-0 md:my-16 my-10">
    {allCourses.slice(0, 4).map((course, index) => (
        <CourseCard key={index} course={course} />
    ))}
</div>
      {/* <div className='grid grid-cols-auto px-4 md:px-0 md:my-16 my-10 gap-4'>
        {allCourses.slice(0,4).map((course,index)=><CourseCard key={index}   course={course}/>)}
      </div> */}
      {/* CHANGES /courses to /api/courses */}
      <Link onClick={() => scrollTo(0, 0)} className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded' to={'/api/courses'}> Show all Courses</Link>
    </div>
  )
}

export default CourseSection
 