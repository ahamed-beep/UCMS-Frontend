import React from "react";

export default function CoreValues() {
  return (
    <div className="w-full py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a2472] mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600">
            The principles that guide everything we do
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 - Student-Centric Approach */}
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            {/* Icon */}
            <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <svg 
                className="w-6 h-6 text-[#ff7b54]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#0a2472] mb-3">
              Student-Centric Approach
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              Every decision we make prioritizes the success and wellbeing of our students
            </p>
          </div>

          {/* Card 2 - Excellence in Service */}
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            {/* Icon */}
            <div className="bg-orange-100 text-amber-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award-icon lucide-award"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#0a2472] mb-3">
              Excellence in Service
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              We maintain the highest standards in counseling, training, and visa processing
            </p>
          </div>

          {/* Card 3 - Result-Oriented */}
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            {/* Icon */}
            <div className="bg-orange-100 text-amber-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target-icon lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#0a2472] mb-3">
              Result-Oriented
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              Our proven methodologies deliver consistent, measurable success for our students
            </p>
          </div>

          {/* Card 4 - Innovation */}
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            {/* Icon */}
            <div className="bg-orange-100 text-amber-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <svg 
                className="w-6 h-6 text-[#ff7b54]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#0a2472] mb-3">
              Innovation
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              We continuously evolve our services to meet changing educational landscapes
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}