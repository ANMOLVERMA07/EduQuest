import React, { useState } from "react";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate form submission
        if (formData.name && formData.email && formData.message) {
            setSuccess(true);

            // Reset form data
            setFormData({
                name: "",
                email: "",
                message: "",
            });

            // Show success alert (you can replace this with toast messages)
            setTimeout(() => setSuccess(false), 3000);
        }
    };

    return (
        <div className="py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>
                <p className="text-center text-gray-600 text-lg mb-8">
                    Have questions or need assistance? We're here to help! Reach out to us via the form below or through our support channels.
                </p>

                {success && (
                    <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-6">
                        Your message has been sent successfully! We'll get back to you soon.
                    </div>
                )}

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 p-2 rounded mt-1"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 p-2 rounded mt-1"
                            required
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">Your Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message here"
                            className="w-full border border-gray-300 p-2 rounded mt-1"
                            rows="5"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Send Message
                    </button>
                </form>

                {/* Support Information */}
                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                    <p className="text-gray-600">
                        <strong>Email:</strong> support@eduquest.com
                    </p>
                    <p className="text-gray-600">
                        <strong>Phone:</strong> +1-800-123-4567
                    </p>
                    <p className="text-gray-600">
                        <strong>Address:</strong> 123 Learning St, Knowledge City, Educationland
                    </p>
                </div>

                {/* Social Media Links */}
                {/* <div className="mt-8 flex justify-center space-x-6">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Facebook
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                    >
                        Twitter
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:underline"
                    >
                        Instagram
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline"
                    >
                        LinkedIn
                    </a>
                </div> */}
            </div>
        </div>
    );
};

export default ContactUs;