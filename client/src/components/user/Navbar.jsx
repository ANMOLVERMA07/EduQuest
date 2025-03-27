import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { authStore } from '../../store/useAuthStore'; // Access authStore
import Signup from '../../components/Signup'; // Adjust the path as needed

const Navbar = () => {
    const { navigate, isEducator,showLogin,setShowLogin } = useContext(AppContext);
    const { authUser, logout } = authStore(); // Access authUser and logout 
    const location = useLocation();
    const isCourseListPage = location.pathname.includes('/courses' | '/educator');

    return (
        <div>
            {/* Desktop Navbar */}
            <div
                className={`hidden md:flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
                    isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'
                }`}
            >
                <h1
                    className="text-3xl font-bold w-32 lg:w-32 cursor-pointer flex flex-row"
                    onClick={() => navigate('/')}
                >
                    Edu <span className='text-blue-600'>Quest</span>
                </h1>

                <div className="flex items-center gap-5 text-gray-500">
                    <div className="flex items-center gap-5">
                        {authUser && (
                            <>
                                <Link to="/courses/enrolled">My Enrollments</Link>
                            </>
                        )}
                    </div>

                    {authUser ? (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={logout}
                                className="bg-red-600 text-white px-4 py-2 rounded-full cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowLogin(true)}
                            className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer"
                        >
                            Create Account
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Navbar */}
            <div
                className={`md:hidden flex items-center justify-between px-4 py-4 ${
                    isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'
                }`}
            >
                <img
                    onClick={() => navigate('/')}
                    src={assets.logo}
                    alt="Logo"
                    className="w-20 cursor-pointer"
                />

                <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
                    {authUser && (
                        <Link to="/api/courses/enrolled">My Enrollments</Link>
                    )}
                    {authUser ? (
                        <button
                            onClick={logout}
                            className="bg-red-600 text-white px-3 py-1 rounded-full"
                        >
                            Logout
                        </button>
                    ) : (
                        <img
                            onClick={() => setShowLogin(true)}
                            src={assets.user_icon}
                            alt="User Icon"
                            className="w-6 h-6 cursor-pointer"
                        />
                    )}
                </div>
            </div>

            {/* Login Modal */}
            {showLogin && <Signup />}
        </div>
    );
};

export default Navbar;