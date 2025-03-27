import {create} from "zustand";
import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

// const BASE_URL=import.meta.env.MODE==="development" ? "http://localhost:3000" : "/";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const authStore = create((set,get) => ({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,

    
    

    checkAuth: async() => {
        try {
         const res = await axiosInstance.get(`${BASE_URL}/api/users/check`);
         set({ authUser:res.data});
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });   
        } finally {
            set({ isCheckingAuth:false});
        }
    },

    signup:async(data)=> {
        set({ isSigningUp: true});
        try {
            const res = await axiosInstance.post(`${BASE_URL}/api/users/signup`,data);
            set({ authUser:res.data});
            toast.success("Signup successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp:false });
        }
    },

    login: async(data) => {
        set({ isLoggingIn:true});
        try {
            const res = await axiosInstance.post(`${BASE_URL}/api/users/login`,data);
            console.log(res.data)
            set({authUser:res.data});
            toast.success("Login Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn:false});
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post(`${BASE_URL}/api/users/logout`);
            set({authUser:null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async(data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/api/users/profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message);
        } finally {
          set({ isUpdatingProfile: false });
        }
    },

    
}));