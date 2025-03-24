import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Footer from '../../components/user/Footer';
import { Rating } from 'react-simple-star-rating';

const Player = () => {
  const { entrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

  // Function to fetch the course data based on courseId
  const getCourseData = () => {
    const course = entrolledCourses.find((course) => course._id === courseId);
    if (course) setCourseData(course);
  };

  // Toggle section visibility
  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Extract YouTube video ID from URL
  const extractYouTubeVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.*\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  // Effect to fetch course data when entrolledCourses changes
  useEffect(() => {
    getCourseData();
  }, [entrolledCourses]);

  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* Course Structure Section */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>
          <div className="pt-5">
            {courseData && courseData.courseContent.map((chapter, chapterIndex) => (
              <div key={chapterIndex} className="border border-gray-300 bg-white mb-2 rounded">
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                  onClick={() => toggleSection(chapterIndex)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      className={`transform transition-transform ${openSections[chapterIndex] ? 'rotate-180' : ''}`}
                      src={assets.down_arrow_icon}
                      alt="Toggle"
                    />
                    <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                  </div>
                  <p className="text-sm md:text-default">
                    {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                  </p>
                </div>

                {/* Chapter Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${openSections[chapterIndex] ? 'max-h-96' : 'max-h-0'}`}
                >
                  <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                    {chapter.chapterContent.map((lecture, lectureIndex) => (
                      <li key={`${chapterIndex}-${lectureIndex}`} className="flex items-start gap-2 py-1">
                        <img
                          src={false ? assets.blue_tick_icon : assets.play_icon}
                          alt={false ? 'Completed' : 'Play'}
                          className="w-4 h-4 mt-1"
                        />
                        <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                          <p>{lecture.lectureTitle}</p>
                          <div className="flex gap-2">
                            {lecture.lectureUrl && (
                              <p
                                onClick={() =>
                                  setPlayerData({
                                    ...lecture,
                                    chapter: chapterIndex + 1,
                                    lecture: lectureIndex + 1,
                                  })
                                }
                                className="text-blue-500 cursor-pointer"
                              >
                                Watch
                              </p>
                            )}
                            <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="flex items-center gap-2 py-3 mt-10">
          <h1 className="text-xl font-bold">Rate this Course:</h1>
          <div  className="flex gap-1">
            <Rating initialRating={0} />
          </div>
        </div> */}

        </div>

        {/* Player Section */}
        <div>
          {playerData ? (
            <div>
              <YouTube
                videoId={extractYouTubeVideoId(playerData.lectureUrl)}
                iframeClassName="w-full aspect-video"
              />
              <div className="mt-4 flex justify-between items-center">
                <p>
                  {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
                </p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded mt-2">
                  {false ? 'Completed' : 'Mark Complete'}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={courseData?.courseThumbnail || assets.default_thumbnail}
              alt="Course Thumbnail"
              className="w-full"
            />
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Player;