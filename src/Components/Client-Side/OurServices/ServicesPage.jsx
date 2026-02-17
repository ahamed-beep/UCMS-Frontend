import { CircleCheckBig } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axiosinstance from '../../Connection/Api';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Make color 60% darker
  const darkenColor = (hex) => {
    if (!hex) return '#000000';
    
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    // Make 60% darker (multiply by 0.4 to keep 40% brightness)
    r = Math.floor(r * 0.6);
    g = Math.floor(g * 0.6);
    b = Math.floor(b * 0.6);
    
    // Convert back to hex
    const toHex = (num) => {
      const hex = num.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-white py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-[500px] mx-auto"></div>
            </div>
          </div>
          <div className="bg-[#FFFFFF] space-y-12 p-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid md:grid-cols-2 gap-8 animate-pulse">
                <div className="bg-gray-200 h-80 rounded-xl"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-32"></div>
                  <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-white py-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl text-blue-900 font-bold mb-4">
            Our <span className="text-orange-500 italic font-serif">Services</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Comprehensive support for your international education journey
          </p>
        </div>

        {/* Services Container */}
        <div className="bg-[#FFFFFF] overflow-hidden">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={service._id || index} className="grid md:grid-cols-2 gap-8 p-12">
                {/* Left Side - Image or Content */}
                {isEven ? (
                  <div className="flex items-center justify-center">
                    {service.servicePageImage ? (
                      <img 
                        src={service.servicePageImage} 
                        alt={`${service.title} Illustration`} 
                        className="w-full h-auto object-contain"
                      />
                    ) : (
                      <div className="w-full h-80 bg-gray-100 rounded-xl flex items-center justify-center">
                        <span className="text-gray-400 text-lg">No Image Available</span>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Content Side */}
                <div className="flex flex-col justify-center">
                  <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit"
                    style={{
                      backgroundColor: service.iconColor || '#E5E7EB',
                      color: darkenColor(service.iconColor) // 60% darker version
                    }}
                  >
                    {/* Icon from Backend */}
                    {service.icon && service.icon.startsWith('http') ? (
                      <img 
                        src={service.icon} 
                        alt="Service Icon"
                        className="w-4 h-4 object-contain"
                      />
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                      </svg>
                    )}
                    <div className=' font-bold' >
                    Service {String(service.serviceNumber || index + 1).padStart(2, '0')}
                      </div>
                  </div>

                  <h2 className="text-4xl font-bold text-blue-900 mb-2">
                    {service.title}
                  </h2>
                  
                  {service.subtitle && (
                    <p className="text-blue-900 font-semibold text-lg mb-6">
                      {service.subtitle}
                    </p>
                  )}

                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List from bulletPoints */}
                  {service.bulletPoints && service.bulletPoints.length > 0 && (
                    <div className="space-y-4">
                      {service.bulletPoints.map((bullet, bulletIndex) => (
                        <div key={bulletIndex} className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0 p-1 rounded-full bg-green-100 flex items-center justify-center">
                            <CircleCheckBig size={18} className='text-[#00A63E]' />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{bullet.title}</h3>
                            <p className="text-gray-600 text-sm">{bullet.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Side - Image (for odd index services) */}
                {!isEven ? (
                  <div className="flex items-center justify-center">
                    {service.servicePageImage ? (
                      <img 
                        src={service.servicePageImage} 
                        alt={`${service.title} Illustration`} 
                        className="w-full h-auto object-contain"
                      />
                    ) : (
                      <div className="w-full h-80 bg-gray-100 rounded-xl flex items-center justify-center">
                        <span className="text-gray-400 text-lg">No Image Available</span>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}