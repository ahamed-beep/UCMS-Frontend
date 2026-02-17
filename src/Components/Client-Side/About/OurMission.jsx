import React from "react";

export default function MissionVision() {
  return (
    <div className="w-full py-16 px-6 bg-gray-50">
      <div className="max-w-[1088px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Our Mission Card */}
          <div className="bg-gradient-to-b from-[#1A2942] to-[#002366] text-white rounded-2xl p-8 md:p-10 shadow-lg">
            {/* Icon */}
            <div className="bg-[#ff7b54] w-14 h-14 rounded-xl flex items-center justify-center mb-6">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target-icon lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Our Mission
            </h3>

            {/* Description */}
            <p className="text-base md:text-lg leading-relaxed text-gray-200">
              To provide comprehensive, personalized, and professional education consulting services that empower students to achieve their international academic and career aspirations with confidence and success.
            </p>
          </div>

          {/* Our Vision Card */}
          <div className="bg-gradient-to-b from-[#ff6b35] to-[#ff5520] text-white rounded-2xl p-8 md:p-10 shadow-lg">
            {/* Icon */}
            <div className="bg-white text-amber-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Our Vision
            </h3>

            {/* Description */}
            <p className="text-base md:text-lg leading-relaxed">
              To be the most trusted and preferred study abroad consultancy, recognized globally for excellence in student services, innovative educational solutions, and creating pathways to success for students worldwide.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}