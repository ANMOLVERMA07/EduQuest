import COURSE from "../models/courseModel.js";
import { StatusCodes } from "http-status-codes";

// get all courses
export const courses = async (req, res) => {
    try {
        // Fetch all published courses
        const allCourses = await COURSE.find({ published: true })
            .select("title description price category thumbnail totalEnrollments rating.average")
            .lean();

        // Check if there are no courses
        if (!allCourses || allCourses.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "No courses found",
            });
        }

        // Respond with the list of courses
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Courses fetched successfully",
            data: allCourses,
        });
    } catch (error) {
        console.error("Error in courses controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// get a specific course
export const course = async (req, res) => {
    const { id } = req.params; // Extract course ID from route parameter

    try {
        // Fetch the course by ID
        const course = await COURSE.findById(id)
            .populate("instructor", "firstName lastName email") // Populate instructor details
            .select("-__v"); // Exclude internal fields like __v

        // If course not found, return 404 error
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Course not found",
            });
        }

        // Respond with course details
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Course fetched successfully",
            data: course,
        });
    } catch (error) {
        console.error("Error in course controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// for enrolling a course
export const enrollCourse = async (req, res) => {
    const { id } = req.params; // Extract the course ID from route parameters
    const userId = req.user._id; // Get the user's ID from the authenticated request

    try {
        // Find the course by ID
        const course = await COURSE.findById(id);

        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Course not found",
            });
        }

        // Check if the user is already enrolled
        if (course.enrolledStudents.includes(userId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "You are already enrolled in this course",
            });
        }

        // Add the user to the enrolledStudents list
        course.enrolledStudents.push(userId);

        // Increment total enrollments
        course.totalEnrollments += 1;

        // Save the course with the updated enrollments
        await course.save();

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully enrolled in the course",
            data: {
                courseId: course._id,
                title: course.title,
                description: course.description,
                category: course.category,
                thumbnail: course.thumbnail,
            },
        });
    } catch (error) {
        console.error("Error in enrollCourse controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// display all enrolled courses
export const enrolledCourses = async (req, res) => {
    const userId = req.user._id; // Get the authenticated user's ID from authMiddleware

    try {
        // Fetch all courses where the user is enrolled
        const courses = await COURSE.find({ enrolledStudents: userId })
            .select("title description category thumbnail totalEnrollments rating.average")
            .lean();

        // Check if the user is enrolled in any courses
        if (!courses || courses.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "You are not enrolled in any courses",
            });
        }

        // Respond with the list of enrolled courses
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Enrolled courses fetched successfully",
            data: courses,
        });
    } catch (error) {
        console.error("Error in enrolledCourses controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// display course progress
// export const courseProgress = async (req, res) => {
//     const { id } = req.params; // Course ID from the route parameter
//     const userId = req.user._id; // Authenticated user's ID from authMiddleware

//     try {
//         // Fetch the course by ID and check if the user is enrolled
//         const course = await COURSE.findById(id).populate("enrolledStudents");

//         if (!course) {
//             return res.status(StatusCodes.NOT_FOUND).json({
//                 success: false,
//                 message: "Course not found",
//             });
//         }

//         // Check if the user is enrolled in the course
//         if (!course.enrolledStudents.includes(userId)) {
//             return res.status(StatusCodes.FORBIDDEN).json({
//                 success: false,
//                 message: "You are not enrolled in this course",
//             });
//         }

//         // Assuming there's a `progress` object or array in the course specific to the user
//         const progress = course.progress?.find((p) => p.userId.toString() === userId.toString());

//         if (!progress) {
//             return res.status(StatusCodes.NOT_FOUND).json({
//                 success: false,
//                 message: "No progress found for this course",
//             });
//         }

//         res.status(StatusCodes.OK).json({
//             success: true,
//             message: "Course progress fetched successfully",
//             data: progress,
//         });
//     } catch (error) {
//         console.error("Error in courseProgress controller:", error.message);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             message: "Internal server error",
//         });
//     }
// };

// for rating the course
export const rateCourse = async (req, res) => {
    const { id } = req.params; // Course ID from the route parameter
    const userId = req.user._id; // Authenticated user's ID from authMiddleware
    const { comment, rating } = req.body; // Review and rating from the request body

    try {
        // Validate rating
        if (!rating || rating < 1 || rating > 5) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Rating must be between 1 and 5",
            });
        }

        // Find the course by ID
        const course = await COURSE.findById(id);

        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Course not found",
            });
        }

        // Check if the user is enrolled in the course
        if (!course.enrolledStudents.includes(userId)) {
            return res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                message: "You cannot review this course because you are not enrolled",
            });
        }

        // Check if the user has already submitted a review
        const existingReview = course.rating.reviews.find(
            (review) => review.user.toString() === userId.toString()
        );

        if (existingReview) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "You have already submitted a review for this course",
            });
        }

        // Add the new review
        const newReview = {
            user: userId,
            comment,
            rating,
        };
        course.rating.reviews.push(newReview);

        // Update the average rating
        const totalRatings = course.rating.reviews.length;
        const averageRating =
            (course.rating.average * (totalRatings - 1) + rating) / totalRatings;
        course.rating.average = averageRating;

        // Save the updated course
        await course.save();

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Review submitted successfully",
        });
    } catch (error) {
        console.error("Error in rateCourse controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export default {
    course,
    courses,
    enrollCourse,
    enrolledCourses,
    rateCourse,
}