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
    addChapter,
    addLecture,
    editLecture,
    editChapter,
} from "../controllers/adminController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js"; // Example for role-based authorization

const router = express.Router();

// Course Management
router.post("/courses", authMiddleware, roleMiddleware(["admin", "instructor"]), createCourse);
router.get("/courses/:id", authMiddleware, roleMiddleware(["admin", "instructor"]), updateCourse); 
router.delete("/courses/:id", authMiddleware, roleMiddleware(["admin", "instructor"]), deleteCourse);
router.post('/:courseId/add-chapter', authMiddleware, roleMiddleware(["admin", "instructor"]), addChapter);   // Define the route for adding a chapter
router.put('/:courseId/:chapterId/edit-chapter',  authMiddleware, roleMiddleware(["admin", "instructor"]), editChapter);    // Define the route for editing a chapter
router.post('/:courseId/:chapterId/add-lecture', authMiddleware, roleMiddleware(["admin", "instructor"]), addLecture);   // Define the route for adding a lecture
router.put('/:courseId/:chapterId/:lectureId/edit-lecture', authMiddleware, roleMiddleware(["admin", "instructor"]), editLecture);  // Define the route for editing a lecture


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
