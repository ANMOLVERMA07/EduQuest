import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    lectureTitle: {
        type: String,
        required: [true, "Lecture title is required"],
        maxlength: [100, "Lecture title must not exceed 100 characters"]
    },
    lectureDuration: {
        type: Number,
        required: [true, "Lecture duration is required"],
        min: [1, "Lecture duration must be at least 1 minute"]
    },
    lectureUrl: {
        type: String,
        required: [true, "Lecture URL is required"],
        validate: {
            validator: function (v) {
                return /^https?:\/\/\S+$/.test(v); // Validate URL format
            },
            message: "Invalid URL format"
        }
    },
    isPreviewFree: {
        type: Boolean,
        required: [true, "isPreviewFree field is required"]
    },
    lectureOrder: {
        type: Number,
        required: [true, "Lecture order is required"]
    }
},{ timestamps:true });

const chapterSchema = new mongoose.Schema({
    chapterOrder: {
        type: Number,
        required: [true, "Chapter order is required"]
    },
    chapterTitle: {
        type: String,
        required: [true, "Chapter title is required"],
        maxlength: [100, "Chapter title must not exceed 100 characters"]
    },
    chapterContent: {
        type: [lectureSchema],
        validate: {
            validator: function (v) {
                return v.length > 0; // Ensure at least one lecture exists
            },
            message: "Chapter content cannot be empty"
        }
    }
},{ timestamps:true });

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: [true, "Course title is required"],
        trim: true,
        maxlength: [100, "Course title must not exceed 100 characters"]
    },
    courseCategory: {
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
    courseDescription: {
        type: String,
        required: [true, "Course description is required"]
    },
    coursePrice: {
        type: Number,
        required: [true, "Course price is required"],
        min: [0, "Course price must be at least 0"]
    },
    isPublished: {
        type: Boolean,
        required: [true, "Course published status is required"]
    },
    discount: {
        type: Number,
        min: [0, "Discount cannot be negative"],
        max: [100, "Discount cannot exceed 100%"]
    },
    courseContent: {
        type: [chapterSchema],
        validate: {
            validator: function (v) {
                return v.length > 0; // Ensure at least one chapter exists
            },
            message: "Course content cannot be empty"
        }
    },
    educator: {
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
    totalEnrollments: {
        type: Number,
        default: 0,
    },
    courseRatings: [{
        userId: {
            type: String,
            required: [true, "User ID is required"]
        },
        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot exceed 5"]
        }
    }],
    __v: {
        type: Number
    },
    courseThumbnail: {
        type: String,
        required: [true, "Course thumbnail URL is required"],
        validate: {
            validator: function (v) {
                return /^https?:\/\/\S+$/.test(v); // Validate URL format
            },
            message: "Invalid thumbnail URL format"
        }
    }
},{ timestamps:true });

// Automatically update totalEnrollments based on the enrolledStudents array
courseSchema.pre("save", function (next) {
    this.totalEnrollments = this.enrolledStudents.length;
    next();
});


const COURSE = mongoose.model("Course", courseSchema);

export default COURSE;
