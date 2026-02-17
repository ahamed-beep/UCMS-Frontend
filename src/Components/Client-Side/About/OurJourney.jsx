import React from "react";

export default function OurJourney() {
  return (
    <div className="w-full py-16 px-6 bg-blue-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a2472] mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-gray-600">
            Key milestones in our growth story
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Connecting Lines - Hidden on mobile, visible on lg screens */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-[#ff7b54] opacity-30" 
               style={{
                 left: 'calc(1.5% + 3rem)',
                 right: 'calc(12.5% + 3rem)',
                 zIndex: 0
               }}>
          </div>

          {/* 2013 - Founded */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative z-10">
            {/* Year with connector dot */}
            <div className="relative">
              <h3 className="text-4xl md:text-5xl font-bold text-[#ff7b54] mb-4">
                2013
              </h3>
               </div>

            {/* Title */}
            <h4 className="text-xl font-bold text-[#0a2472] mb-3">
              Founded
            </h4>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              UCMS established with a vision to make global education accessible
            </p>
          </div>

          {/* 2016 - 1000+ Students */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative z-10">
            {/* Year with connector dot */}
            <div className="relative">
              <h3 className="text-4xl md:text-5xl font-bold text-[#ff7b54] mb-4">
                2016
              </h3>
              </div>

            {/* Title */}
            <h4 className="text-xl font-bold text-[#0a2472] mb-3">
              1000+ Students
            </h4>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              Reached milestone of guiding over 1000 students abroad
            </p>
          </div>

          {/* 2019 - Multiple Centers */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative z-10">
            {/* Year with connector dot */}
            <div className="relative">
              <h3 className="text-4xl md:text-5xl font-bold text-[#ff7b54] mb-4">
                2019
              </h3>
              </div>

            {/* Title */}
            <h4 className="text-xl font-bold text-[#0a2472] mb-3">
              Multiple Centers
            </h4>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              Expanded to 5 training centers across the region
            </p>
          </div>

          {/* 2024 - 5000+ Success Stories */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative z-10">
            {/* Year */}
            <h3 className="text-4xl md:text-5xl font-bold text-[#ff7b54] mb-4">
              2024
            </h3>

            {/* Title */}
            <h4 className="text-xl font-bold text-[#0a2472] mb-3">
              5000+ Success Stories
            </h4>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              Celebrated helping over 5000 students achieve their dreams
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}