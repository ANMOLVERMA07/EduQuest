import USER from "../models/userModel.js";
import {StatusCodes} from "http-status-codes";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";


export const signup = async(req,res) => {
    const {firstName,lastName,email,password} = req.body;
    try {
        if(!firstName || !lastName || !email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"All Fields are required"});
        }

        if(password.length < 6){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Password must be atleast 6 characters"});
        }

        const isEmail = await USER.findOne({email});
        if(isEmail){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Already account exist.Please Login"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new USER({
            fullName,
            email,
            password:hashedPassword,
        });

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(StatusCodes.CREATED).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePicture:newUser.profilePicture,
            });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"}); 
    }
};


export const login = async(req,res) => {
    const {email,password} = req.body;
    try {
        if(!email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json("All fields are required");
        }

        const user = await USER.findOne({email});
        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({message:"Please Signup First"});
        }

        const debug = await bcrypt.compare(password,user.password);
        if(!debug){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Incorrect Password"});
        }

        generateToken(user._id,res);
        res.status(StatusCodes.ACCEPTED).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePicture:user.profilePicture,
        });
    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"}); 
    }
};

export const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(StatusCodes.OK).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"}); 
    }
}


export const updateProfile = async(req,res) => {
    try {
        const {profilePicture} = req.body;
        const userId = req.user._id;

        if(!profilePicture){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"profile picture not found"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePicture);
        const selectedUser = await USER.findByIdAndUpdate(userId,{profilePicture:uploadResponse.secure_url},{new:true});

        res.status(StatusCodes.OK).json(selectedUser);
    } catch (error) {
        console.log("Error in update-profile controller",error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"}); 
    }
}

export const checkAuth = (req,res) => {
    try {
        res.status(StatusCodes.OK).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller",error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"}); 
    }
}


export const profile = async (req, res) => {
    try {
        // Get user ID from the request object (set by authMiddleware)
        const userId = req.user.userId;

        // Fetch user details from the database
        const user = await USER.findById(userId).select("-password"); // Exclude password

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        // Respond with user details
        res.status(StatusCodes.OK).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};


export const deleteProfile = async (req, res) => {
    try {
        // Get the authenticated user's ID (set by authMiddleware)
        const userId = req.user.userId;

        // Find and delete the user from the database
        const user = await USER.findByIdAndDelete(userId);

        if (!user) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "User not found, unable to delete profile" });
        }

        // Clear the JWT cookie
        res.cookie("jwt", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
        });

        res.status(StatusCodes.OK).json({ message: "Profile deleted successfully" });
    } catch (error) {
        console.error("Error in deleteProfile controller:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};




export default{
    signup,
    login,
    logout,
    profile,
    updateProfile,
    deleteProfile,
}