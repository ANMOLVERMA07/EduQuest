// Navbar.jsx
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
    const { navigate,isEducator } = useContext(AppContext);
    const location = useLocation();
    const isCourseListPage = location.pathname.includes('/courses');
    const { openSignIn } = useClerk();
    const { user } = useUser();
 
    return (
        <div>
            {/* Desktop Navbar */}
            <div
                className={`hidden md:flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
                    isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'
                }`}
            >
                <img 
                    onClick={() => navigate('/')} 
                    src={assets.logo} 
                    alt="Logo" 
                    className="w-32 lg:w-32 cursor-pointer" 
                />

                <div className="flex items-center gap-5 text-gray-500">
                    <div className="flex items-center gap-5">
                        {user && (
                            <>
                                {/* <button onClick={()=>{navigate('/educator')}}>{isEducator?'Educator Dashboard':'Become Educator'}</button> */}
                                <Link to="/courses/enrolled">My Enrollments</Link>
                            </>
                        )}
                    </div>
                    {user ? (
                        <UserButton />
                    ) : (
                        <button 
                            onClick={() => openSignIn()} 
                            className="bg-blue-600 text-white px-5 py-2 rounded-full"
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
                    {user && (
                        <>
                             {/* <button onClick={()=>{navigate('/educator')}}>{isEducator?'Educator Dashboard':'Become Educator'}</button> */}
                            <Link to="/courses/enrolled">My Enrollments</Link>
                        </>
                    )}
                    {user ? (
                        <UserButton />
                    ) : (
                        <img 
                            onClick={() => openSignIn()} 
                            src={assets.user_icon} 
                            alt="User Icon" 
                            className="w-6 h-6" 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;