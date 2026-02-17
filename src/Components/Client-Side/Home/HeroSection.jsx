import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <div className="relative w-full h-screen">

            {/* Background Image */}
            <img
                src="/Images/HeroSection.webp"
                alt="University"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute  bg-[#002366] opacity-[40%]"></div>

            {/* Content */}
            <div className="relative z-10 flex items-center h-full">
                <div className="max-w-7xl mx-auto px-6 py lg:px-12 w-full">

                    <div className="max-w-2xl  text-white">

                        {/* Heading */}
                        <h1 className="text-4xl md:text-6xl  font-Playfair leading-tight">
                            Your Journey to
                            <br />
                            <span className="text-orange-500 font-light  font-Praise ">
                                Academic Excellence
                            </span>
                            <br />
                            Starts Here
                        </h1>

                        {/* Paragraph */}
                        <p className="mt-6 text-lg text-gray-200 leading-relaxed">
                            Expert guidance, personalized support,<br></br> and proven success
                            in helping students <br></br> achieve their international education dreams.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex gap-4">
                            <Link to="/Contact">
                            <button className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-lg font-medium">
                                Apply Now
                            </button>
</Link >
                            <button className="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition">
                                Free Consultation
                            </button>
                        </div>

                        {/* Stats Section */}
                        <div className="mt-12 flex gap-12">
                            <div>
                                <h2 className="text-3xl  font-bold">10K+</h2>
                                <p className="text-gray-300 text-xs whitespace-nowrap">Students Placed</p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold">50+</h2>
                                <p className="text-gray-300 text-xs whitespace-nowrap">Universities</p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold">98%</h2>
                                <p className="text-gray-300 text-xs whitespace-nowrap">Success Rate</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}