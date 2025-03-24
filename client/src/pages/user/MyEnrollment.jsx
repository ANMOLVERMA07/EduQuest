import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Line } from 'rc-progress';
import Footer from '../../components/user/Footer';

const MyEntrollment = () => {
  const { entrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 5, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 4, totalLectures: 8 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 7, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 5 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 2 },
    { lectureCompleted: 5, totalLectures: 5 },
  ]);

  const calculateProgress = (index) => {
    if (progressArray[index]) {
      return (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures;
    }
    return 0;
  };

  const getStatus = (index) => {
    if (progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1) {
      return 'Completed';
    }
    return 'On Going';
  };

  return (
    <>
      <div className="md:px-36 px-4 pt-10">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>

        {/* Desktop Table - Only visible on medium screens and up */}
        <div className="hidden md:block mt-10">
          <table className="table-auto w-full overflow-hidden border">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Course</th>
                <th className="px-4 py-3 font-semibold">Duration</th>
                <th className="px-4 py-3 font-semibold">Completed</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {entrolledCourses.map((course, index) => (
                <tr className="border-b border-gray-500/20" key={index}>
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img className="w-28" src={course.courseThumbnail} alt="" />
                    <div className="flex-1">
                      <p className="mb-1">{course.courseTitle}</p>
                      <Line 
                        className="bg-gray-300 rounded-full" 
                        strokeWidth={2} 
                        percent={calculateProgress(index)} 
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">{calculateCourseDuration(course)}</td>
                  <td className="px-4 py-3">
                    {progressArray[index] && 
                      `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`} 
                    <span> Lectures</span>
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => navigate('/player/' + course._id)} 
                      className="px-5 py-2 bg-blue-600 text-white"
                    >
                      {getStatus(index)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards - Only visible on small screens */}
        <div className="md:hidden mt-6 space-y-4">
          {entrolledCourses.map((course, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <img className="w-20 h-20 object-cover rounded" src={course.courseThumbnail} alt="" />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">{course.courseTitle}</h3>
                    <Line 
                      className="bg-gray-300 rounded-full" 
                      strokeWidth={2} 
                      percent={calculateProgress(index)} 
                    />
                    <div className="mt-2 flex justify-between items-center text-xs text-gray-600">
                      <span>{calculateCourseDuration(course)}</span>
                      <span>
                        {progressArray[index] && 
                          `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures} Lectures`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => navigate('/player/' + course._id)} 
                    className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded"
                  >
                    {getStatus(index)}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyEntrollment;