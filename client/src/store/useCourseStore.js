import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

const STUDENT_BASE_URL=import.meta.env.MODE==="development" ? "https://eduquest-blvt.onrender.com/api" : "/";
const ADMIN_BASE_URL=import.meta.env.MODE==="development" ? "https://eduquest-blvt.onrender.com/api" : "/";

export const courseStore = create((set, get) => ({
  courses: [],
  isFetchingCourses: false,
  isCreatingCourse: false,
  isUpdatingCourse: false,
  isDeletingCourse: false,

  fetchCourses: async () => {
    set({ isFetchingCourses: true });
    try {
      const res = await axiosInstance.get("/courses/courses");
      set({ courses: res.data });
    } catch (error) {
      console.log("Error in fetchCourses:", error);
      toast.error("Failed to fetch courses!");
    } finally {
      set({ isFetchingCourses: false });
    }
  },

  createCourse: async (data) => {
    set({ isCreatingCourse: true });
    try {
      const res = await axiosInstance.post("/admin/courses", data);
      set((state) => ({ courses: [...state.courses, res.data] }));
      toast.success("Course created successfully!");
    } catch (error) {
      console.log("Error in createCourse:", error);
      toast.error("Failed to create course!");
    } finally {
      set({ isCreatingCourse: false });
    }
  },

  updateCourse: async (id, data) => {
    set({ isUpdatingCourse: true });
    try {
      const res = await axiosInstance.put(`/courses/${id}`, data);
      set((state) => ({
        courses: state.courses.map((course) =>
          course.id === id ? res.data : course
        ),
      }));
      toast.success("Course updated successfully!");
    } catch (error) {
      console.log("Error in updateCourse:", error);
      toast.error("Failed to update course!");
    } finally {
      set({ isUpdatingCourse: false });
    }
  },

  deleteCourse: async (id) => {
    set({ isDeletingCourse: true });
    try {
      await axiosInstance.delete(`/courses/${id}`);
      set((state) => ({
        courses: state.courses.filter((course) => course.id !== id),
      }));
      toast.success("Course deleted successfully!");
    } catch (error) {
      console.log("Error in deleteCourse:", error);
      toast.error("Failed to delete course!");
    } finally {
      set({ isDeletingCourse: false });
    }
  },
}));