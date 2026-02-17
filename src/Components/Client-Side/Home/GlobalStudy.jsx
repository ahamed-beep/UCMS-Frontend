import React from "react";

export default function GlobalStudy() {
  const universities = [
    {
      name: "Macquarie University",
      image: "/Images/Macquarie University.webp",
    },
    {
      name: "Deakin University",
      image: "/Images/Deakin University.webp",
    },
    {
      name: "Western Sydney University",
      image: "/Images/Western Sydney University.webp",
    },
    {
      name: "Griffith University",
      image: "/Images/Griffith University.webp",
    },
  ];

  return (
    <div className="bg-[#FFFFFF] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold  text-[#002366]">
          Global Study{" "}
          <span className="text-orange-500 font-Praise font-light">
            Destinations
          </span>
        </h2>

        <p className="mt-2 text-gray-600 text-lg">
          Top countries for your international education
        </p>

        {/* Logo Cards */}
        <div className="grid   grid-cols-2 sm:grid-cols-2  lg:grid-cols-4 gap-8 mt-16">

          {universities.map((uni, index) => (
            <div
              key={index}
              className="  rounded-2xl  border-gray-200 border   transition duration-300 h-40 overflow-hidden"
            >
              <img
                src={uni.image}
                alt={uni.name}
                className="md:w-full  md:h-full w-[200px] h-full object-cover "
              />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}