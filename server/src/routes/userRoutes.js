import express from "express";
import { signup,login,logout,profile,updateProfile,deleteProfile} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/profile",authMiddleware,profile);
router.put("/profile",authMiddleware,updateProfile);
router.delete("/profile",authMiddleware,deleteProfile);

export default router;