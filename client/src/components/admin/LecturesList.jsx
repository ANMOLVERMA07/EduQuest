import React, { useState } from "react";
import { toast } from "react-toastify";

const LecturesList = ({ chapter, setCourse, courseId }) => {
    // State to manage new lecture input fields
    const [lectureData, setLectureData] = useState({
        lectureTitle: "",
        lectureDuration: "",
        lectureUrl: "",
        isPreviewFree: false,
    });

    // Handle input changes for new lecture
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLectureData({
            ...lectureData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Validate inputs
    const validateLecture = () => {
        const { lectureTitle, lectureDuration, lectureUrl } = lectureData;
        const errors = [];

        if (!lectureTitle) errors.push("Lecture title is required.");
        if (!lectureDuration || isNaN(Number(lectureDuration)) || Number(lectureDuration) <= 0) {
            errors.push("Lecture duration must be a valid number greater than 0.");
        }
        if (!lectureUrl || !/^https?:\/\/\S+$/.test(lectureUrl)) {
            errors.push("Lecture URL must be a valid URL.");
        }

        if (errors.length > 0) {
            errors.forEach((error) => toast.error(error));
            return false;
        }
        return true;
    };

    // Function to add a new lecture
    const addLecture = async () => {
        if (!validateLecture()) return;

        try {
            const res = await fetch(`/api/courses/${courseId}/${chapter._id}/add-lecture`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(lectureData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to add lecture.");
            }

            // Update course state with the new lecture
            const updatedCourse = await res.json();
            setCourse(updatedCourse);
            toast.success("Lecture added successfully!");

            // Reset input fields
            setLectureData({
                lectureTitle: "",
                lectureDuration: "",
                lectureUrl: "",
                isPreviewFree: false,
            });
        } catch (error) {
            toast.error(error.message || "An error occurred while adding the lecture.");
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Lectures in {chapter.chapterTitle}</h2>
            <ul className="space-y-3">
                {chapter.chapterContent.map((lecture, index) => (
                    <li key={lecture._id} className="p-3 bg-white rounded-lg shadow">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium text-gray-800">{lecture.lectureTitle}</h3>
                                <p className="text-gray-600 text-sm">
                                    Duration: {lecture.lectureDuration} minutes
                                </p>
                                <p className="text-blue-500 text-sm">
                                    <a href={lecture.lectureUrl} target="_blank" rel="noopener noreferrer">
                                        Watch Lecture
                                    </a>
                                </p>
                            </div>
                            <div>
                                {lecture.isPreviewFree ? (
                                    <span className="text-green-500 text-xs">Free Preview</span>
                                ) : (
                                    <span className="text-gray-500 text-xs">Paid Lecture</span>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Add Lecture Form */}
            <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">Add New Lecture</h3>
                <div className="space-y-4">
                    {/* Lecture Title */}
                    <div>
                        <label className="block text-gray-700">Lecture Title</label>
                        <input
                            type="text"
                            name="lectureTitle"
                            value={lectureData.lectureTitle}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>

                    {/* Lecture Duration */}
                    <div>
                        <label className="block text-gray-700">Duration (in minutes)</label>
                        <input
                            type="number"
                            name="lectureDuration"
                            value={lectureData.lectureDuration}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>

                    {/* Lecture URL */}
                    <div>
                        <label className="block text-gray-700">Lecture URL</label>
                        <input
                            type="text"
                            name="lectureUrl"
                            value={lectureData.lectureUrl}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>

                    {/* Free Preview Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isPreviewFree"
                            checked={lectureData.isPreviewFree}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <label className="text-gray-700">Free Preview</label>
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={addLecture}
                        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        Add Lecture
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LecturesList;