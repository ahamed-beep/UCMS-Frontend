import React from "react";

export default function AboutUCMS() {
  return (
   <div className="relative w-full">

      {/* Background Image */}
      <img
        src="/Images/ImageWithFallback.webp" 
        alt="Study Abroad Background"
        className="w-full h-[700px] object-cover bg-gradient-to-b from-[#1A2942] to-[#002366] opacity-20% object-center" 
      />

      
      

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

        <h2 className="text-4xl md:text-5xl mx-auto md:w-[381px] md:h-[70px] mb-10 font-bold text-white leading-tight">
            About UCMS
        </h2>

        {/* Paragraph 1 */}
        <p className="text-base md:text-lg leading-relaxed mb-10 text-gray-200">
          UCMS (Upskills Consultancy & Migration Services) was founded in 2013 with a simple yet powerful
          mission: to make quality international education accessible to aspiring students worldwide. What
          started as a small consultancy has grown into a trusted name in study abroad services.
        </p>

        {/* Paragraph 2 */}
        <p className="text-base md:text-lg leading-relaxed mb-10 text-gray-200">
          Over the past decade, we have successfully guided more than 5,000 students in
          achieving their dreams of studying at prestigious universities across the UK, Australia,
          Canada, USA, and Europe. Our success is built on a foundation of expertise,
          dedication, and genuine care for each student's future.
        </p>

        {/* Paragraph 3 */}
        <p className="text-base md:text-lg leading-relaxed text-gray-200">
          Today, UCMS stands as a comprehensive education services provider, offering career
          counseling, visa assistance, IELTS/PTE/TOFEL preparation, and O/A Level education
          all under one roof with a proven track record of excellence.
        </p>


       
      </div>

    </div>
  );
}