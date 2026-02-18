import React from "react";
export default function GlobalStudy() {
  const universities = [
    {
      name: "Macquarie University",
      image: "/Images/4.webp",
    },
    {
      name: "Deakin University",
      image: "/Images/Dakin2.webp",
    },
    {
      name: "Western Sydney University",
      image: "/Images/Western3.webp",
    },
    {
      name: "Griffith University",
      image: "/Images/Grifith1.webp",
    },
  ];
  return (
    <div className="bg-[#FFFFFF] py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-[#002366]">
          Global Study{" "}
          <span className="text-[#FF6B35] text-4xl md:text-6xl font-Praise font-light">
            Destinations
          </span>
        </h2>
        <p className="mt-2 text-[#4A5565] text-lg">
          Top countries for your international education
        </p>
        {/* Logo Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {universities.map((uni, index) => (
            <div
              key={index}
              className="rounded-2xl border-gray-200 border transition duration-300 overflow-hidden"
            >
              <img
                src={uni.image}
                alt={uni.name}
                className="w-full h-48 sm:h-56 md:h-64 object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}