// AppContext.jsx
import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'
export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [allCourses, setAllCourses] = useState([]);
    let [isEducator, setIsEducator] = useState(true);
    const [entrolledCourses, setEntrolledCourses] = useState([]);

    const fetchallCourses = async () => {
        setAllCourses(dummyCourses);
    };

    isEducator = (user) => {
        // Check if the user's role is "instructor"
        if (user.role === "instructor") {
            setIsEducator(true); // User is an educator
        }
        setIsEducator(false); // User is not an educator
    };
    
    

  

    //Function to calculate average rating of course
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) {
            return 0;
        }
        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating;
        });
        return totalRating / course.courseRatings.length;
    };
  

    // Function to calculate Course Chapter Time
    const calculateChapterTime=(chapter)=>{
        let time=0
        chapter.chapterContent.map((lecture)=> time+=lecture.lectureDuration)
        return humanizeDuration(time*60*1000,{units:["h","m"]})
    }

    //Function to Calculate Course Duration

    const calculateCourseDuration=(course)=>{
        let time=0
        course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration))
        return humanizeDuration(time*60*1000,{units:["h","m"]})
    }

    //Function calculate to No of Lecture in the Coure

    const calculateNoOfLectures=(course)=>{
        let totalLectures=0;
        course.courseContent.forEach(chapter=>{
            if(Array.isArray(chapter.chapterContent)){
                totalLectures+=chapter.chapterContent.length
            }
        })
        return totalLectures
    }


    const fetchUserEntrolledCourses= async()=>{
        setEntrolledCourses(dummyCourses)
    }





    useEffect(() => {
        fetchallCourses();
        fetchUserEntrolledCourses()
    }, []);
    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator,
        setIsEducator,
        calculateNoOfLectures,
        calculateCourseDuration,
        calculateChapterTime,
        entrolledCourses

    };


    
    

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};