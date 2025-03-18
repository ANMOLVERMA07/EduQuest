export const roleMiddleware = (roles) => (req, res, next) => {
    try {
        // Assuming `authMiddleware` has already added `req.user.role`
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied. You do not have permission." });
        }
        next();
    } catch (error) {
        console.error("Error in roleMiddleware:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
