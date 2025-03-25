import COURSE from "../models/courseModel.js";
import USER from "../models/userModel.js";
import ASSIGNMENT from "../models/assignmentModel.js";
import { StatusCodes } from "http-status-codes";

// Controller for creating a new course
export const createCourse = async (req, res) => {
    try {
        // Extract data from the request body
        const {
            courseTitle,
            courseCategory,
            courseDescription,
            coursePrice,
            isPublished,
            discount,
            courseContent,
            educator,
            courseThumbnail,
        } = req.body;

        // Check for mandatory fields
        if (!courseTitle || !courseCategory || !courseDescription || !coursePrice || !educator || !courseThumbnail) {
            return res.status(400).json({ success: false,message: "All required fields must be provided" });
        }

        // Create the new course object
        const newCourse = new COURSE({
            courseTitle,
            courseCategory,
            courseDescription,
            coursePrice,
            isPublished,
            discount,
            courseContent,
            educator,
            courseThumbnail,
        });

        // Save the course to the database
        const savedCourse = await newCourse.save();

        // Send success response
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Course created successfully",
            data: savedCourse,
        });

    } catch (error) {
        // Handle errors (e.g., validation errors, database errors)
        console.error("Error in createCourse controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// Controller for updating an existing course
export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params; // Extract course ID from route parameters
        const updates = req.body; // Extract update data from the request body

        // Validate the existence of the course
        const course = await COURSE.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Update the course fields
        const updatedCourse = await COURSE.findByIdAndUpdate(
            id,
            { $set: updates }, // Apply the updates to the course
            { new: true, runValidators: true } // Return the updated document and validate data
        );

        // Send the success response
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        // Handle errors (e.g., validation or database errors)
        console.error("Error in updateCourse controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to update the course",
        });
    }
};

// delete an existing course
export const deleteCourse = async (req, res) => {
    const { id } = req.params; // Extract course ID from route parameters

    try {
        // Check if the course exists
        const course = await COURSE.findById(id);

        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Course not found",
            });
        }

        // Delete the course
        await COURSE.findByIdAndDelete(id);

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleteCourse controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// Controller for getting enrolled users for a specific course
export const enrolledUsers = async (req, res) => {
    try {
        const { courseId } = req.params; // Extract course ID from route parameters

        // Find the course by ID
        const course = await COURSE.findById(courseId).populate('enrolledStudents', 'firstName email profilePicture'); // Populate user details (optional: customize fields)

        // Check if the course exists
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Respond with the list of enrolled users
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Enrolled users fetched successfully",
            data: enrolledStudents,
        });
    } catch (error) {
        // Handle errors
        console.error("Error in enrolledUsers controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// Controller for adding a chapter to a specific course
export const addChapter = async (req, res) => {
    try {
        const { courseId } = req.params; // Extract course ID from route parameters
        const { chapterOrder, chapterTitle, chapterContent } = req.body; // Extract chapter details from request body

        // Validate required fields
        if (!chapterOrder || !chapterTitle || !chapterContent) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "All chapter fields (chapterOrder, chapterTitle, chapterContent) must be provided",
            });
        }

        // Find the course
        const course = await COURSE.findById(courseId);
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Course not found",
            });
        }

        // Create a new chapter object
        const newChapter = {
            chapterOrder,
            chapterTitle,
            chapterContent,
        };

        // Add the new chapter to the course
        course.courseContent.push(newChapter);

        // Save the updated course
        const savedCourse = await course.save();

        // Send success response
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Chapter added successfully",
            data: savedCourse,
        });
    } catch (error) {
        // Handle errors
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to add chapter",
            error: error.message,
        });
    }
};

// Controller for editing a chapter in a course
export const editChapter = async (req, res) => {
    try {
        const { courseId, chapterId } = req.params; // Extract course and chapter IDs from route parameters
        const updates = req.body; // Extract updated chapter details from request body

        // Find the course
        const course = await COURSE.findById(courseId);
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Course not found",
            });
        }

        // Find the specific chapter in the course
        const chapter = course.courseContent.find((chap) => chap._id.toString() === chapterId);
        if (!chapter) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Chapter not found in the specified course",
            });
        }

        // Update the chapter with the provided fields
        Object.keys(updates).forEach((key) => {
            chapter[key] = updates[key];
        });

        // Save the updated course
        const savedCourse = await course.save();

        // Send success response
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Chapter updated successfully",
            data: savedCourse,
        });
    } catch (error) {
        // Handle errors
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to update chapter",
            error: error.message,
        });
    }
};


// Controller for adding a lecture to a specific chapter in a course
export const addLecture = async (req, res) => {
    try {
        const { courseId, chapterId } = req.params; // Extract course and chapter IDs from route parameters
        const { lectureTitle, lectureDuration, lectureUrl, isPreviewFree, lectureOrder } = req.body; // Extract lecture details from request body

        // Validate required fields
        if (!lectureTitle || !lectureDuration || !lectureUrl || isPreviewFree === undefined || !lectureOrder) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "All lecture fields must be provided",
            });
        }

        // Find the course
        const course = await COURSE.findById(courseId);
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Course not found",
            });
        }

        // Find the specific chapter in the course
        const chapter = course.courseContent.find((chap) => chap._id.toString() === chapterId);
        if (!chapter) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Chapter not found in the specified course",
            });
        }

        // Create a new lecture object
        const newLecture = {
            lectureTitle,
            lectureDuration,
            lectureUrl,
            isPreviewFree,
            lectureOrder,
        };

        // Add the new lecture to the chapter
        chapter.chapterContent.push(newLecture);

        // Save the updated course
        const savedCourse = await course.save();

        // Send success response
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Lecture added successfully",
            data: savedCourse,
        });
    } catch (error) {
        // Handle errors
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to add lecture",
            error: error.message,
        });
    }
};


// Controller for editing a lecture in a specific chapter of a course
export const editLecture = async (req, res) => {
    try {
        const { courseId, chapterId, lectureId } = req.params; // Extract IDs from route parameters
        const updates = req.body; // Extract updated lecture details from request body

        // Find the course
        const course = await COURSE.findById(courseId);
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Course not found",
            });
        }

        // Find the specific chapter in the course
        const chapter = course.courseContent.find((chap) => chap._id.toString() === chapterId);
        if (!chapter) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Chapter not found in the specified course",
            });
        }

        // Find the specific lecture in the chapter
        const lecture = chapter.chapterContent.find((lec) => lec._id.toString() === lectureId);
        if (!lecture) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Lecture not found in the specified chapter",
            });
        }

        // Update the lecture with the provided fields
        Object.keys(updates).forEach((key) => {
            lecture[key] = updates[key];
        });

        // Save the updated course
        const savedCourse = await course.save();

        // Send success response
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Lecture updated successfully",
            data: savedCourse,
        });
    } catch (error) {
        // Handle errors
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to update lecture",
            error: error.message,
        });
    }
};

// Add an assignment to a specific course
export const addAssignment = async (req, res) => {
    const { id } = req.params; // Extract the course ID from the route parameter
    const { title, description, dueDate, maxMarks } = req.body; // Extract assignment details from the request body

    try {
        // Validate input fields
        if (!title || !description || !dueDate || !maxMarks) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "All fields (title, description, dueDate, maxMarks) are required",
            });
        }

        // Validate course existence
        const course = await COURSE.findById(id);
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Course not found",
            });
        }

        // Create the assignment
        const newAssignment = new ASSIGNMENT({
            course: id, // Associate the assignment with the course
            title,
            description,
            dueDate,
            maxMarks,
        });

        // Save the assignment to the database
        const savedAssignment = await newAssignment.save();

        // // Optional: Add the assignment reference to the course document
        // course.assignments.push(savedAssignment._id);
        // await course.save();

        // Respond with success
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Assignment added successfully",
            data: savedAssignment,
        });
    } catch (error) {
        console.error("Error in addAssignment controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// update an assignment
export const updateAssignment = async (req, res) => {
    const { id, assignmentId } = req.params; // Extract course ID and assignment ID from params
    const { title, description, dueDate, maxMarks } = req.body; // Data to be updated

    try {
        // Find the assignment by ID
        const assignment = await ASSIGNMENT.findById(assignmentId);

        if (!assignment) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Assignment not found",
            });
        }

        // // Check if the assignment belongs to the provided course
        // if (assignment.course.toString() !== id) {
        //     return res.status(StatusCodes.BAD_REQUEST).json({
        //         success: false,
        //         message: "Assignment does not belong to this course",
        //     });
        // }

        // Update only the provided fields
        if (title) assignment.title = title;
        if (description) assignment.description = description;
        if (dueDate) {
            const due = new Date(dueDate);
            if (due < new Date()) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "Due date must be in the future",
                });
            }
            assignment.dueDate = due;
        }
        if (maxMarks) {
            if (maxMarks <= 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "Maximum marks must be a positive number",
                });
            }
            assignment.maxMarks = maxMarks;
        }

        // Save the updated assignment
        const updatedAssignment = await assignment.save();

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Assignment updated successfully",
            data: updatedAssignment,
        });
    } catch (error) {
        console.error("Error in updateAssignment controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// for deleting an assignment
export const deleteAssignment = async (req, res) => {
    const { id, assignmentId } = req.params; // Course ID and Assignment ID from route parameters

    try {
        // Find the assignment by ID
        const assignment = await ASSIGNMENT.findById(assignmentId);

        if (!assignment) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Assignment not found",
            });
        }

        // // Check if the assignment belongs to the specified course
        // if (assignment.course.toString() !== id) {
        //     return res.status(StatusCodes.BAD_REQUEST).json({
        //         success: false,
        //         message: "Assignment does not belong to this course",
        //     });
        // }

        // Delete the assignment
        await ASSIGNMENT.findByIdAndDelete(assignmentId);

        // // Optional: Remove the assignment reference from the course document
        // const course = await COURSE.findById(id);
        // if (course) {
        //     course.assignments = course.assignments.filter(
        //         (assignment) => assignment.toString() !== assignmentId
        //     );
        //     await course.save();
        // }

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Assignment deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleteAssignment controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// get all courses analytics (ADMIN)
export const getAllCourseAnalytics = async (req, res) => {
    try {
        // Fetch analytics data for all courses
        const courses = await COURSE.find()
            .select("title totalEnrollments rating.average createdAt")
            .lean();

        if (!courses || courses.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "No courses found for analytics",
            });
        }

        // Format analytics data
        const analyticsData = courses.map((course) => ({
            title: course.title,
            totalEnrollments: course.totalEnrollments,
            averageRating: course.rating.average,
            createdAt: course.createdAt,
        }));

        res.status(StatusCodes.OK).json({
            success: true,
            message: "All course analytics fetched successfully",
            data: analyticsData,
        });
    } catch (error) {
        console.error("Error in getAllCourseAnalytics controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// get specific course analytics
export const getCourseAnalytics = async (req, res) => {
    const { id } = req.params; // Course ID from the route parameter

    try {
        // Fetch course details by ID
        const course = await COURSE.findById(id)
            .populate("enrolledStudents", "firstName lastName email")
            .lean();

        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Course not found",
            });
        }

        // Fetch assignment details (optional)
        const assignments = await ASSIGNMENT.find({ course: id }).select("title dueDate maxMarks").lean();

        // Construct analytics data
        const analyticsData = {
            title: course.title,
            totalEnrollments: course.totalEnrollments,
            averageRating: course.rating.average,
            reviews: course.rating.reviews.length,
            createdAt: course.createdAt,
            enrolledStudents: course.enrolledStudents.map((student) => ({
                name: `${student.firstName} ${student.lastName}`,
                email: student.email,
            })),
            assignments, // List of assignments related to the course
        };

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Course analytics fetched successfully",
            data: analyticsData,
        });
    } catch (error) {
        console.error("Error in getCourseAnalytics controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export default {
    createCourse,
    updateCourse,
    enrolledUsers,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    getAllCourseAnalytics,
    getCourseAnalytics,
    addLecture,
    addChapter,
    editChapter,
    editLecture
}