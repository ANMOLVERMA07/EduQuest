import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
    courses,
    course,
    enrollCourse,
    enrolledCourses,
    rateCourse
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/courses",courses);
router.get("/courses/:id",course);
router.post("/courses/:id/enroll",authMiddleware,enrollCourse);
router.get("/courses/enrolled",authMiddleware,enrolledCourses);
// router.get("/courses/:id/progress",authMiddleware,courseProgress);
router.post("/courses/:id/reviews",authMiddleware,rateCourse);


export default router;