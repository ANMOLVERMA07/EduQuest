import COURSE from "../models/courseModel.js";
import USER from "../models/userModel.js";
import ASSIGNMENT from "../models/assignmentModel.js";
import { StatusCodes } from "http-status-codes";

// for creating a course
export const createCourse = async (req, res) => {
    const { title, description, price, category, thumbnail, content } = req.body;

    try {
        // Validate required fields
        if (!title || !description || !price || !category || !thumbnail) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "All required fields must be filled (title, description, price, category, thumbnail).",
            });
        }

        // Validate content array structure
        if (content && content.length > 0) {
            const isContentValid = content.every(
                (item) =>
                    item.title && item.videoUrl && item.duration &&
                    typeof item.duration === "number" && item.duration > 0
            );
            if (!isContentValid) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "Invalid content structure. Each content item must have a title, videoUrl, and a positive duration.",
                });
            }
        }

        // Create a new course document
        const course = new COURSE({
            title,
            description,
            price,
            category,
            thumbnail,
            content,
            instructor: req.user._id, // Get instructor ID from `authMiddleware`
        });

        // Save the course to the database
        const savedCourse = await course.save();

        // Return a success response
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Course created successfully!",
            data: savedCourse,
        });
    } catch (error) {
        console.error("Error in createCourse controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

// Update an existing course
export const updateCourse = async (req, res) => {
    const { id } = req.params; // Course ID from route parameters
    const { title, description, price, category, thumbnail, content, published } = req.body;

    try {
        // Validate the existence of the course in the database
        const course = await COURSE.findById(id);

        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Course not found",
            });
        }

        // Only allow updates to specific fields
        if (title) course.title = title;
        if (description) course.description = description;
        if (price) {
            if (price < 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "Price must be a positive value",
                });
            }
            course.price = price;
        }
        if (category) course.category = category;
        if (thumbnail) course.thumbnail = thumbnail;

        // Validate the content array structure (if provided)
        if (content && content.length > 0) {
            const isContentValid = content.every(
                (item) =>
                    item.title && item.videoUrl && item.duration &&
                    typeof item.duration === "number" && item.duration > 0
            );

            if (!isContentValid) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "Invalid content structure. Each item must have a title, videoUrl, and positive duration.",
                });
            }
            course.content = content;
        }

        // Update publish status if provided
        if (typeof published === "boolean") {
            course.published = published;
        }

        // Save the updated course
        const updatedCourse = await course.save();

        // Respond with the updated course
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        console.error("Error in updateCourse controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
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

// get enrolled users for a particular course
export const enrolledUsers = async (req, res) => {
    const { id } = req.params; // Extract the course ID from the request parameters

    try {
        // Check if the course exists
        const course = await COURSE.findById(id).populate("enrolledStudents", "firstName lastName email profilePicture");

        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Course not found",
            });
        }

        // Fetch enrolled students from the populated `enrolledStudents` field
        const enrolledStudents = course.enrolledStudents;

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Enrolled users fetched successfully",
            data: enrolledStudents,
        });
    } catch (error) {
        console.error("Error in enrolledUsers controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
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
}