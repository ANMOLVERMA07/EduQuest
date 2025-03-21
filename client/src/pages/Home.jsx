import React from "react";
import { cn } from "../utils/helper.js";
import Description from "../components/Description.jsx";

export default function Home() {
  return (


    <div
      className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )} />

      <div className="z-1 flex-col ">
        <header className="text-center ">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            Welcome to Your Homepage!
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Start building your awesome project with React and Tailwind CSS.
          </p>
        </header>

        {/* Main Content Section */}
        <main className="flex flex-col items-center mt-10 space-y-6">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-500">
            Get Started
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md shadow-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            Learn More
          </button>
        </main>
      </div>


    </div>




  );
}
