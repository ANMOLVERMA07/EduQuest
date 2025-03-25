import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const Testimonials = () => {
  return (
    <div className='pb-14 px-8 md:px-0'>
      <h2 className='text-3xl font-medium text-gray-800'>Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3">
        Hear from our learners as they share their journeys of transformation, 
        success, and how our <br /> platform has made a difference in their lives.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-16 mt-14">
    {dummyTestimonial.map((testimonial, index) => (
        <div
            key={index}
            className="text-left border border-gray-300 pb-6 rounded-lg bg-white shadow-lg overflow-hidden"
        >
            {/* Header Section */}
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-100">
                <img
                    className="h-14 w-14 rounded-full"
                    src={testimonial.image}
                    alt={testimonial.name}
                />
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{testimonial.name}</h2>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
            </div>

            {/* Rating and Feedback Section */}
            <div className="p-5">
                {/* Star Rating */}
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <img
                            className="h-5"
                            key={i}
                            src={
                                i < Math.floor(testimonial.rating)
                                    ? assets.star
                                    : assets.star_blank
                            }
                            alt={`${i + 1} Star`}
                        />
                    ))}
                </div>
                {/* Feedback */}
                <p className="text-gray-600 mt-4">{testimonial.feedback}</p>
            </div>

            {/* Read More Section */}
            <div className="px-5">
                <a
                    href="#"
                    className="text-blue-500 underline text-sm hover:text-blue-600"
                >
                    Read more
                </a>
            </div>
        </div>
    ))}
</div>
    </div>
  )
}

export default Testimonials