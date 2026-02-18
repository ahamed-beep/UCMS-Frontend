import React from "react";

export default function OurJourney() {
  const milestones = [
    { year: "2013", title: "Founded", description: "UCMS established with a vision to make global education accessible" },
    { year: "2016", title: "1000+ Students", description: "Reached milestone of guiding over 1000 students abroad" },
    { year: "2019", title: "Multiple Centers", description: "Expanded to 5 training centers across the region" },
    { year: "2024", title: "5000+ Success Stories", description: "Celebrated helping over 5000 students achieve their dreams" },
  ];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {milestones.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Connecting line — sirf lg pe, last card pe nahi */}
              {index < milestones.length - 1 && (
                <div
                  className="hidden md:block absolute"
                  style={{
                    top: '2.8rem',        
                    right: '-1rem',     
                    width: '1.8rem',        
                    height: '2.67px',
                    backgroundColor: '#FF6B35',
                    zIndex: 20,
                  }}
                />
              )}

               {index < milestones.length  && (
                <div
                  className=" block lg:hidden absolute"
                  style={{
                    top: '2.8rem',        
                    left: '-1rem',     
                    width: '1.8rem',        
                    height: '2.67px',
                    backgroundColor: '#FF6B35',
                    zIndex: 20,
                  }}
                />
              )}

              {/* Year */}
              <h3 className="text-4xl md:text-5xl font-bold text-[#ff7b54] mb-3">
                {item.year}
              </h3>

              {/* Title */}
              <h4 className="text-xl font-bold text-[#0a2472] mb-3">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}