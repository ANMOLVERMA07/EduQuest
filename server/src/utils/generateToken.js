import jwt from "jsonwebtoken";

/**
 * Generate a JWT and set it in an HTTP-only cookie.
 *
 * @param {string} userId - The user ID to encode in the token.
 * @param {object} res - The response object to set the cookie.
 * @param {object} options - Additional options (e.g., token expiration).
 * @returns {string} - The generated JWT token.
 */
export const generateToken = (userId, res, options = {}) => {
    // Define the payload for the token
    const payload = { userId };

    // Configure the token expiration (default is 7 days)
    const expiresIn = options.expiresIn || "7d";

    // Generate the JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn:"7d" });

    // Set secure cookie options
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration: 7 days
        httpOnly: true, // Prevent access via client-side JavaScript
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict", // Protect against CSRF
        path: "/", // Root path
        domain: process.env.COOKIE_DOMAIN || "localhost", // Set domain dynamically
    });

    // Optional: Log cookie details (useful for debugging)
    if (process.env.NODE_ENV !== "production") {
        console.log("Set-Cookie Header:", res.getHeader("Set-Cookie"));
    }

    return token;
};
