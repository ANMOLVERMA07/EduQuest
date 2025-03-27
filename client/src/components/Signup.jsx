import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { authStore } from "../store/useAuthStore";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Signup = () => {
  const [state, setState] = useState("Sign up");
  const { signup,login, isSigningUp, isLoggingIn } = authStore();
  const {showLogin,setShowLogin} = useContext(AppContext);

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role

  // Form Validation
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    if (state === "Sign up" && (!firstName || !lastName)) {
      toast.error("First Name and Last Name are required for Sign up!");
      return false;
    }
    return true;
  };

  // Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (state === "Login") {
        const loginData = { email, password,role };
        await login(loginData);
      } else {
        const signupData = { firstName, lastName, email, password, role };
        await signup(signupData);
      }
      setShowLogin(false); // Close modal on success
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center"
      onClick={() => setShowLogin(false)}
    >
      <motion.form
        onSubmit={submitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h1 className="text-center text-3xl text-neutral-700 font-semibold">{state}</h1>
        <p className="text-sm">Welcome back! Please {state} to continue.</p>

        {/* First & Last Name Fields (Sign up only) */}
        {state === "Sign up" && (
          <div className="border px-5 py-2 flex flex-row gap-3 rounded-full mt-4">
            {/* First Name Field */}
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="outline-none text-sm"
              type="text"
              placeholder="First Name"
              required
            />

            {/* Last Name Field */}
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="outline-none text-sm"
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
        )}
        {/* Email Field */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          {/* <img src={assets.email} alt="email" /> */}
          <input
            className="outline-none text-sm"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email ID"
            required
          />
        </div>

        {/* Password Field */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          {/* <img src={assets.key} alt="password" /> */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {/* Role Dropdown (Sign up only) */}
        {/* {state === "Sign up" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <label className="text-sm">Role: </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="outline-none text-sm px-2 py-1 border rounded-full cursor-pointer"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )} */}
        
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <label className="text-sm">Role: </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="outline-none text-sm px-2 py-1 border rounded-full cursor-pointer"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 cursor-pointer hover:scale-105 w-full text-white font-semi py-2 rounded-full mt-4"
          disabled={isSigningUp || isLoggingIn}
        >
          {isSigningUp || isLoggingIn ? "Processing..." : state === "Login" ? "Login" : "Create Account"}
        </button>

        {/* Toggle Login/Sign Up */}
        <p className="mt-3 text-center">
          {state === "Login" ? (
            <>
              Don't have an account?{" "}
              <span className="text-blue-600 cursor-pointer" onClick={() => setState("Sign up")}>
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span className="text-blue-600 cursor-pointer" onClick={() => setState("Login")}>
                Login
              </span>
            </>
          )}
        </p>

        {/* Close Modal */}
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="close"
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Signup;