import React, { useState } from "react";
import {courseStore} from "../../store/useCourseStore";
import { toast } from "react-toastify";

const CreateCourseForm = () => {
    const [formData, setFormData] = useState({
        courseTitle: "",
        courseCategory: "",
        courseDescription: "",
        coursePrice: "",
        isPublished: false,
        discount: "",
        courseThumbnail: "",
    });

    const { createCourse } = courseStore;

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.courseTitle) {
            newErrors.courseTitle = "Course title is required.";
        }

        if (!formData.courseCategory) {
            newErrors.courseCategory = "Course category is required.";
        }

        if (!formData.courseDescription) {
            newErrors.courseDescription = "Course description is required.";
        }

        if (!formData.coursePrice || isNaN(Number(formData.coursePrice)) || Number(formData.coursePrice) < 0) {
            newErrors.coursePrice = "Valid course price is required.";
        }

        if (!formData.discount || isNaN(Number(formData.discount)) || Number(formData.discount) < 0 || Number(formData.discount) > 100) {
            newErrors.discount = "Discount should be between 0 and 100.";
        }

        if (!formData.courseThumbnail || !/^https?:\/\/\S+$/.test(formData.courseThumbnail)) {
            newErrors.courseThumbnail = "Valid thumbnail URL is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        if (!validateForm()) {
            toast.error("Validation failed! Please check all fields.");
            return;
        }
    
        try {
            // Trigger the API call to create a course
            const response = await createCourse(formData);
    
            if (response.success) {
                toast.success("Course created successfully!");
                
                // Reset the form
                setFormData({
                    courseTitle: "",
                    courseCategory: "",
                    courseDescription: "",
                    coursePrice: "",
                    isPublished: false,
                    discount: "",
                    courseThumbnail: "",
                });
            } else {
                toast.error(response.message || "Failed to create the course.");
            }
        } catch (error) {
            // Show error message from API response if available, or display a fallback error
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg bg-gradient-to-b from-[#A9C9FF] to-[#FFBBEC]">
            <h1 className="text-2xl font-bold mb-6 text-gray-700">Create a New Course</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Course Title */}
                <div>
                    <label className="block text-gray-700">Course Title</label>
                    <input
                        type="text"
                        name="courseTitle"
                        value={formData.courseTitle}
                        onChange={handleChange}
                        className="w-full border-2 border-purple-800 p-2 rounded mt-1"
                    />
                    {errors.courseTitle && <p className="text-red-500 text-sm">{errors.courseTitle}</p>}
                </div>

                {/* Course Category */}
                <div>
                    <label className="block text-gray-700">Course Category</label>
                    <select
                        name="courseCategory"
                        value={formData.courseCategory}
                        onChange={handleChange}
                        className="w-full border-2 border-purple-800 p-2 rounded mt-1 cursor-pointer"
                    >
                        <option value="">Select Category</option>
                        <option value="Programming">Programming</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Business">Business</option>
                        <option value="Personal Development">Personal Development</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.courseCategory && <p className="text-red-500 text-sm">{errors.courseCategory}</p>}
                </div>

                {/* Course Description */}
                <div>
                    <label className="block text-gray-700">Course Description</label>
                    <textarea
                        name="courseDescription"
                        value={formData.courseDescription}
                        onChange={handleChange}
                        className="w-full border-2 border-purple-800 p-2 rounded mt-1"
                    />
                    {errors.courseDescription && <p className="text-red-500 text-sm">{errors.courseDescription}</p>}
                </div>

                {/* Course Price */}
                <div>
                    <label className="block text-gray-700">Course Price ($)</label>
                    <input
                        type="text"
                        name="coursePrice"
                        value={formData.coursePrice}
                        onChange={handleChange}
                        className="w-full border-2 border-purple-800 p-2 rounded mt-1"
                    />
                    {errors.coursePrice && <p className="text-red-500 text-sm">{errors.coursePrice}</p>}
                </div>

                {/* Is Published */}
                <div>
                    <label className="flex items-center text-gray-700">
                        <input
                            type="checkbox"
                            name="isPublished"
                            checked={formData.isPublished}
                            onChange={handleChange}
                            className="mr-2 cursor-pointer"
                        />
                        Published
                    </label>
                </div>

                {/* Discount */}
                <div>
                    <label className="block text-gray-700">Discount (%)</label>
                    <input
                        type="text"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="w-full border-2 border-purple-800 p-2 rounded mt-1"
                    />
                    {errors.discount && <p className="text-red-500 text-sm">{errors.discount}</p>}
                </div>

                {/* Course Thumbnail */}
                <div>
                    <label className="block text-gray-700">Thumbnail URL</label>
                    <input
                        type="text"
                        name="courseThumbnail"
                        value={formData.courseThumbnail}
                        onChange={handleChange}
                        className="w-full border-2 border-purple-800 p-2 rounded mt-1"
                    />
                    {errors.courseThumbnail && <p className="text-red-500 text-sm">{errors.courseThumbnail}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
                >
                    <span className="font-semibold">Submit</span>
                </button>
            </form>
        </div>
    );
};

export default CreateCourseForm;