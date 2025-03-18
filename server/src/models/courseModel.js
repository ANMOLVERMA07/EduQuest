import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Course title is required"],
            trim: true,
            maxlength: [100, "Course title must not exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Course description is required"],
            maxlength: [1000, "Description must not exceed 1000 characters"],
        },
        price: {
            type: Number,
            required: [true, "Course price is required"],
            min: [0, "Price must be at least 0"],
            default: 0, // Free courses have a price of 0
        },
        category: {
            type: String,
            required: [true, "Course category is required"],
            enum: [
                "Programming",
                "Design",
                "Marketing",
                "Business",
                "Personal Development",
                "Data Science",
                "Other",
            ], // Categories restrict acceptable values
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Instructor is required"], // Instructor must be linked to a User
        },
        enrolledStudents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Students who have enrolled
            },
        ],
        content: [
            {
                title: {
                    type: String,
                    required: [true, "Content title is required"],
                },
                videoUrl: {
                    type: String,
                    required: [true, "Video URL is required"],
                },
                duration: {
                    type: Number, // Duration in minutes
                    required: [true, "Duration is required"],
                    min: [1, "Duration must be at least 1 minute"],
                },
            },
        ],
        rating: {
            average: {
                type: Number,
                default: 0,
                min: [0, "Rating must be at least 0"],
                max: [5, "Rating cannot exceed 5"],
            },
            reviews: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: [true, "Review must have an associated user"],
                    },
                    comment: {
                        type: String,
                        maxlength: [500, "Review comment cannot exceed 500 characters"],
                    },
                    rating: {
                        type: Number,
                        required: [true, "Rating is required"],
                        min: [1, "Rating must be at least 1"],
                        max: [5, "Rating cannot exceed 5"],
                    },
                },
            ],
        },
        totalEnrollments: {
            type: Number,
            default: 0,
        },
        published: {
            type: Boolean,
            default: false,
        },
        thumbnail: {
            type: String,
            required: [true, "Course thumbnail URL is required"],
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

// Automatically update totalEnrollments based on the enrolledStudents array
courseSchema.pre("save", function (next) {
    this.totalEnrollments = this.enrolledStudents.length;
    next();
});

const COURSE = mongoose.model("Course", courseSchema);

export default COURSE;
