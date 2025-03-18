import express from "express";
import {
    createCourse,
    updateCourse,
    deleteCourse,
    enrolledUsers,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    getAllCourseAnalytics,
    getCourseAnalytics,
} from "../controllers/courseController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js"; // Example for role-based authorization

const router = express.Router();

// Course Management
router.post("/courses", authMiddleware, roleMiddleware(["admin", "instructor"]), createCourse);
router.get("/courses/:id", authMiddleware, roleMiddleware(["admin", "instructor"]), updateCourse); 
router.delete("/courses/:id", authMiddleware, roleMiddleware(["admin", "instructor"]), deleteCourse);


// Enrollment Management
router.get("/courses/:id/enrolled-users", authMiddleware, roleMiddleware(["admin", "instructor"]), enrolledUsers);

// Content Management
router.post("/courses/:id/assignments", authMiddleware, roleMiddleware(["admin", "instructor"]), addAssignment);
router.put("/courses/:id/assignments/:assignmentId", authMiddleware, roleMiddleware(["admin", "instructor"]), updateAssignment);
router.delete("/courses/:id/assignments/:assignmentId", authMiddleware, roleMiddleware(["admin", "instructor"]), deleteAssignment);

// Analytics
router.get("/courses/analytics", authMiddleware, roleMiddleware(["admin"]), getAllCourseAnalytics);
router.get("/courses/:id/analytics", authMiddleware, roleMiddleware(["admin", "instructor"]), getCourseAnalytics);

export default router;
