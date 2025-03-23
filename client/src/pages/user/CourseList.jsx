import React, { useContext, useEffect, useState } from 'react'
import SearchBar from '../../components/user/SearchBar'
import { AppContext } from '../../Context/AppContext'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/user/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../components/user/Footer'

const CourseList = () => {
  const {navigate,allCourses}=useContext(AppContext)
  const {input}=useParams()
  const[filteredCourse,setFilteredCourse]=useState([])

  useEffect(()=>{
    if(allCourses && allCourses.length>0){
      const temCourses=allCourses.slice()
      input ? 
      setFilteredCourse(
        temCourses.filter(
          item=>item.courseTitle.toLowerCase().includes(input.toLowerCase())
        )
      ):
      setFilteredCourse(temCourses)
    }
  },[allCourses,input])
  return (
    <>
    <div className="relative md:px-36 px-8 pt-20 text-left">
      <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>
          <p className="text-gray-500">
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate('/')}
            >
              Home
            </span>{' '}
            / <span>Course List</span>
          </p>
        </div>
        <SearchBar data={input} />
      </div>


      {
        input  &&
        <div className='inline-flex items-center gap-4 py-1 px-4 border rounded-lg mt-8 -mb-8 text-gray-600'>
          <p>{input}</p>
          <img src={assets.cross_icon} className='cursor-pointer' onClick={()=>navigate('/course-list')} alt="" />
        </div>
      }

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-col-4 my-16 gap-3 px-2 md:p-0'>
        {
          filteredCourse.map((course,index)=><CourseCard key={index} course={course}/>)
        }

      </div>
    </div>
      <Footer/>
    </>
  )
}

export default CourseList