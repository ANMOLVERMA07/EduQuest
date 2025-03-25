import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ChaptersList from "./ChaptersList";
import LecturesList from "./LecturesList";

const CourseDetailsPage = ({ courseId }) => {
    const [course, setCourse] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);

    // Fetch course details
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/courses/${courseId}`);
                const data = await res.json();
                setCourse(data);
            } catch (error) {
                toast.error("Failed to fetch course details!");
            }
        };
        fetchCourse();
    }, [courseId]);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Course Details */}
            {course ? (
                <div className="mb-6 bg-white p-4 shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold">{course.courseTitle}</h1>
                    <p className="text-gray-600">{course.courseDescription}</p>
                    <p className="text-gray-800">
                        <strong>Category:</strong> {course.courseCategory}
                    </p>
                    <p className="text-gray-800">
                        <strong>Price:</strong> ${course.coursePrice}
                    </p>
                    <p className="text-gray-800">
                        <strong>Published:</strong> {course.isPublished ? "Yes" : "No"}
                    </p>
                </div>
            ) : (
                <p>Loading course details...</p>
            )}

            {/* Chapters Section */}
            {course && (
                <div className="bg-gray-50 p-4 shadow-md rounded-lg">
                    <ChaptersList
                        chapters={course.courseContent}
                        setSelectedChapter={setSelectedChapter}
                        setCourse={setCourse}
                        courseId={courseId}
                    />
                </div>
            )}

            {/* Lectures Section */}
            {selectedChapter && (
                <div className="mt-6 bg-gray-50 p-4 shadow-md rounded-lg">
                    <LecturesList
                        chapter={selectedChapter}
                        setCourse={setCourse}
                        courseId={courseId}
                    />
                </div>
            )}
        </div>
    );
};

export default CourseDetailsPage;