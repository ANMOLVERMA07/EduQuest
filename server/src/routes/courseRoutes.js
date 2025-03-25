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

router.get("/",courses);
router.get("/:id",course);
router.post("/:id/enroll",authMiddleware,enrollCourse);
router.get("/enrolled",authMiddleware,enrolledCourses);
// router.get("/courses/:id/progress",authMiddleware,courseProgress);
router.post("/:id/reviews",authMiddleware,rateCourse);


export default router;