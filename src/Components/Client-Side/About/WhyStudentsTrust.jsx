import React from "react";

export default function AboutUCMS() {
  return (
   <div className="relative w-full h-[400px] ">

      {/* Background Image */}
      <img
        src="/Images/ImageWithFallback.webp" 
        alt="Study Abroad Background"
        className="w-full h-[372px] object-cover mt-8 bg-gradient-to-b from-[#1A2942] to-[#002366] opacity-20% object-center" 
      />

      
      

     {/* Content */}
<div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">

  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-[90%] sm:max-w-[638px] mb-12 sm:mb-16 md:mb-20 font-bold text-white leading-tight">
     Why Students Trust UCMS
  </h2>

  {/* Stats Grid */}
  <div className="w-full max-w-[95%] sm:max-w-[1088px] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
    
    {/* Stat 1 - Years Experience */}
    <div className="text-center">
      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#ff7b54] mb-2 sm:mb-3">
        10+
      </h3>
      <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white font-medium leading-tight">
        Years Experience
      </p>
    </div>

    {/* Stat 2 - Students Guided */}
    <div className="text-center">
      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#ff7b54] mb-2 sm:mb-3">
        5000+
      </h3>
      <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white font-medium leading-tight">
        Students Guided
      </p>
    </div>

    {/* Stat 3 - Visa Success Rate */}
    <div className="text-center">
      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#ff7b54] mb-2 sm:mb-3">
        95%
      </h3>
      <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white font-medium leading-tight">
        Visa Success Rate
      </p>
    </div>

    {/* Stat 4 - Partner Universities */}
    <div className="text-center">
      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#ff7b54] mb-2 sm:mb-3">
        50+
      </h3>
      <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white font-medium leading-tight">
        Partner Universities
      </p>
    </div>

  </div>

</div>

    </div>
  );
}