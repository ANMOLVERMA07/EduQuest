import React from "react";

const About = () => {
    return (
        <div id="target-about" className=" py-12 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                    Welcome to <a onClick={() =>
            document.getElementById("target-home").scrollIntoView({ behavior: "smooth" })
          } className="font-semibold text-blue-500 cursor-pointer">EduQuest</a>, your ultimate destination for online learning and skill development! 
                    Our mission is to empower learners across the globe by providing high-quality education anytime, anywhere. We believe that education is the foundation for growth and innovation, and we're here to make it accessible to everyone.
                </p>
            </div>

            <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                {/* Feature 1 */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">World-Class Courses</h3>
                    <p className="text-gray-600">
                        Explore courses crafted by industry-leading educators and experts, designed to help you achieve excellence.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Flexible Learning</h3>
                    <p className="text-gray-600">
                        Learn at your own pace with on-demand lectures, interactive content, and downloadable resources.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Community Support</h3>
                    <p className="text-gray-600">
                        Join a thriving community of learners, connect with peers, and get support from dedicated mentors.
                    </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Certifications</h3>
                    <p className="text-gray-600">
                        Earn verified certificates and badges to showcase your achievements and boost your career prospects.
                    </p>
                </div>

                {/* Feature 5 */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Innovative Tools</h3>
                    <p className="text-gray-600">
                        Leverage AI-powered tools, analytics, and progress trackers to maximize your learning experience.
                    </p>
                </div>

                {/* Feature 6 */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Accessibility for All</h3>
                    <p className="text-gray-600">
                        We’re committed to making education accessible to learners everywhere, regardless of their background.
                    </p>
                </div>
            </div>

            {/* <div className="mt-12 max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                    At <span className="font-semibold text-blue-500">Eduquest</span>, we envision a world where education knows no boundaries. Our platform fosters lifelong learning, enabling individuals to unlock their potential and transform their lives. Together, let's pave the way for a brighter future!
                </p>
            </div> */}
        </div>
    );
};

export default About;