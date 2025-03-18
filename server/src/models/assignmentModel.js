import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course", // Link the assignment to a course
            required: [true, "Course ID is required"],
        },
        title: {
            type: String,
            required: [true, "Assignment title is required"],
            trim: true,
            maxlength: [100, "Title must not exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Assignment description is required"],
            maxlength: [1000, "Description must not exceed 1000 characters"],
        },
        dueDate: {
            type: Date,
            required: [true, "Due date is required"],
        },
        maxMarks: {
            type: Number,
            required: [true, "Maximum marks are required"],
            min: [0, "Maximum marks must be a positive value"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

const ASSIGNMENT = mongoose.model("Assignment", assignmentSchema);

export default ASSIGNMENT;
