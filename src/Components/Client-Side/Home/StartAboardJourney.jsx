import { ArrowRight } from "lucide-react";
import React from "react";

export default function StartAboardJourney() {
  return (
    <div className="relative w-full h-full">

      {/* Background Image */}
      <img
        src="/Images/ImageWithFallback.webp" 
        alt="Study Abroad Background"
        className="w-full h-[336px] sm:h-[400px] md:h-[453px] bg-gradient-to-b from-[#1A2942] to-[#002366] object-cover opacity-10% object-center" 
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
        
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
          Start Your Study Abroad Journey
        </h2>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mt-1">
          Today
        </h2>

        {/* Description */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-200 max-w-[95%] sm:max-w-2xl px-2">
          Book a free consultation with our expert counselors and take the first step towards
          your international education dream
        </p>

        {/* Button */}
        <div className="mt-6 sm:mt-8 md:mt-10 flex">
          <button className="bg-[#FF6B35] hover:bg-orange-600 transition duration-300 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-lg flex items-center gap-2 sm:gap-3">
            <span>Book Free Consultation</span>
            <ArrowRight size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

    </div>
  );
}