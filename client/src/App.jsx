import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import { Home,Login,NotFound,Signup } from "../src/pages/index.js"
import { Navbar,Sidebar } from './components/index.js';

const App = () => {
  

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  // if (isCheckingAuth && !authUser) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader className="size-10 animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
     
    </div>
  );
};

export default App;