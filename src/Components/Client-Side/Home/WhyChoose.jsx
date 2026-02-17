import React from "react";
import { Award, TrendingUp, UserCheck, Headphones } from "lucide-react";

export default function WhyChoose() {
  return (
<div
  className="py-20"
  style={{
    background: `
      linear-gradient(
        150deg,
        #EFF6FF 0%,
        #EFF6FF 55%,
        #EEF2FF 55%,
        #EEF2FF 100%
      )
    `,
  }}
>


      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-sans font-bold text-[#002366]">
          Why Choose{" "}
          <span className="text-orange-500 font-Praise font-light">
            UCMS
          </span>
           <span className="text-[#002366] ml-2   font-semibold">
            ?
          </span>
        </h2>

        <p className="mt-2 text-gray-600 text-lg">
          We're committed to your success every step of the way
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">

          {/* Item 1 */}
          <div className="flex flex-col max-w-[248px] items-center">
            <div className=" p-5 flex items-center justify-center bg-white rounded-full shadow-md">
              <Award className="text-orange-500" size={30} />
            </div>

            <h3 className="mt-4 text-xl font-bold text-blue-900">
              Experienced Consultants
            </h3>

            <p className="mt-3 text-gray-600 max-w-xs">
              5+ years of expertise in international education
            </p>
          </div>

          {/* Item 2 */}
            <div className="flex flex-col max-w-[248px] items-center">
            <div className=" p-5 flex items-center justify-center bg-white rounded-full shadow-md">
              <TrendingUp className="text-orange-500" size={30} />
            </div>

            <h3 className="mt-4 whitespace-nowrap text-xl font-bold text-blue-900">
              High Visa Success Rate
            </h3>

            <p className="mt-3 text-gray-600 max-w-xs">
              95% success rate in visa applications
            </p>
          </div>

          {/* Item 3 */}
      <div className="flex flex-col max-w-[248px] items-center">
            <div className=" p-5 flex items-center justify-center bg-white rounded-full shadow-md">
              <UserCheck className="text-orange-500" size={30} />
            </div>

            <h3 className="mt-4 whitespace-nowrap text-xl font-bold text-blue-900">
              Personalized Guidance
            </h3>

            <p className="mt-3 text-gray-600 max-w-xs">
              Customized counseling based on your profile
            </p>
          </div>

          {/* Item 4 */}
      <div className="flex flex-col max-w-[248px] items-center">
            <div className=" p-5 flex items-center justify-center bg-white rounded-full shadow-md">
              <Headphones className="text-orange-500" size={30} />
            </div>

            <h3 className="mt-4 text-xl font-bold text-blue-900">
              End-to-End Support
            </h3>

            <p className="mt-3 text-gray-600 max-w-xs">
              From application to departure assistance
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}