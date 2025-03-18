import USER from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        try {
            console.log("Cookies:", req.cookies); // Log cookies for debugging
            const token = req.cookies.jwt;

            console.log("Request Headers:", req.headers); // Log headers for debugging
            console.log("Token from Cookies:", token); // Log token for debugging

            // Check if token exists
            if (!token) {
                return res.status(401).json({ message: "Unauthorized - No Token Provided" });
            }

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            if (!decoded) {
                return res.status(401).json({ message: "Unauthorized - Invalid Token" });
            }

            // Find the user and exclude the password from the response
            const user = await USER.findById(decoded.userId).select("-password");

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Attach user to the request object
            req.user = user;

            // Check if role-based access is required
            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({
                    message: "Access Denied - You do not have the required permissions",
                });
            }

            next();
        } catch (error) {
            console.log("Error in authMiddleware:", error.message);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
};
