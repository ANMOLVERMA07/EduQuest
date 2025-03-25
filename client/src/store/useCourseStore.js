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
  isFetchingChapters: false,
  isCreatingChapter:false,
  isUpdatingChapter: false,
  isDeletingChapter: false,
  isFetchingLectures: false,
  isCreatingLecture: false,
  isUpdatingLecture: false,
  isDeletingLecture: false,

  fetchCourses: async () => {
    set({ isFetchingCourses: true });
    try {
      const res = await axiosInstance.get("/api/courses");
      set({ courses: res.data });
    } catch (error) {
      console.log("Error in fetchCourses:", error);
      toast.error("Failed to fetch courses!");
    } finally {
      set({ isFetchingCourses: false });
    }
  },

  createCourse: async (data) => {
    try {
        // Set loading state
        set({ isCreatingCourse: true });

        // Send API request to create course
        const res = await axiosInstance.post("/api/admin/courses", data);

        // Update courses state with the new course
        set((state) => ({
            courses: [...state.courses, res.data],
        }));

        // Show success toast
        toast.success("Course created successfully!", {
            position: "top-right",
            autoClose: 3000,
        });
    } catch (error) {
        // Log error details for debugging
        console.error("Error in createCourse:", error);

        // Show error toast with server response or fallback message
        const errorMessage =
            error.response?.data?.message || "Failed to create course!";
        toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
        });
    } finally {
        // Reset loading state
        set({ isCreatingCourse: false });
    }
},

  updateCourse: async (id, data) => {
    set({ isUpdatingCourse: true });
    try {
      const res = await axiosInstance.put(`/api/admin/courses/${id}`, data);
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
      await axiosInstance.delete(`/api/admin/courses/${id}`);
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