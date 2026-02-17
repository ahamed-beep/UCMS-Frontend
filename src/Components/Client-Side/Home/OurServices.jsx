import React, { useState, useRef, useEffect } from "react";
import axiosinstance from '../../Connection/Api';


export default function ServicesSection() {
  const scrollContainerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axiosinstance.get('/homeservice');
        
        if (response.data.success) {
          setServices(response.data.data);
        } else {
          setError('Failed to load services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Check scroll position for desktop horizontal scroll only
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container && window.innerWidth >= 1024) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
      
      if (scrollPercentage < 0.5) {
        setCurrentPage(0);
      } else {
        setCurrentPage(1);
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [services]);

 

  const scrollToPage = (pageIndex) => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollWidth, clientWidth } = container;
      const scrollPosition = pageIndex === 0 ? 0 : scrollWidth - clientWidth;
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-[#FFFFFF] py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <div className="text-center mb-14">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 animate-pulse">
                <div className="bg-gray-200 h-72 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#FFFFFF] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] py-20">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900">
            <span className="text-[30px] md:text-[40px]">Our </span>
            <span className="text-orange-500 font-Praise font-light">Services</span>
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            Comprehensive support for your international education journey
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative">
          
          {/* Mobile: Vertical Stack, Desktop: Horizontal Scroll */}
          <div
            ref={scrollContainerRef}
            className="flex flex-col lg:flex-row gap-5 pb-4 lg:overflow-x-auto lg:snap-x lg:snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {services.map((service, index) => (
              <div
                key={service._id || index}
                className="w-full lg:flex-shrink-0 lg:w-[290px] lg:snap-start bg-white border border-gray-100 rounded-2xl shadow-md px-5 py-6 hover:shadow-lg transition duration-300 cursor-pointer"
              >
                {/* Icon Container */}
                <div 
                  className="w-14 h-14 flex items-center justify-center rounded-xl mb-4"
                  style={{ 
                    backgroundColor: service.iconColor || '#E5E7EB'
                  }}
                >
                  {service.icon && service.icon.startsWith('http') ? (
                    <img 
                      src={service.icon} 
                      alt={service.title}
                      className="w-7 h-7 object-contain"
                    />
                  ) : (
                    <span 
                      className="text-2xl font-bold text-white"
                    >
                      {service.icon?.charAt(0)?.toUpperCase() || '📚'}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                
                {service.subtitle && (
                  <p className="text-sm font-bold text-gray-700">
                    {service.subtitle}
                  </p>
                )}
                
                <p className="mt-2 text-gray-700 leading-relaxed">
                  {service.description.slice(0,100)}..
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Navigation Dots - Desktop Only */}
        {services.length > 4 && (
          <div className="hidden lg:flex justify-center mt-12 space-x-3">
            {[0, 1].map((i) => (
              <button
                key={i}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentPage === i ? "bg-orange-500 w-8" : "bg-gray-300 w-3"
                }`}
                onClick={() => scrollToPage(i)}
                aria-label={`Go to page ${i + 1}`}
              ></button>
            ))}
          </div>
        )}

     

      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}