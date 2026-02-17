import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a2472] text-white">
      {/* Main Footer Content */}
      <div className="w-full  mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1 - Logo & Description */}
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-full border border-white flex items-center justify-center">
              <img 
                src="/Images/Rectangle 1.webp" 
                alt="UCMS Logo" 
                className="w-16 h-16"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              Your trusted partner for study abroad, visa services, and English language training. Making global education accessible.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-[#1a3f8f] rounded-lg flex items-center justify-center hover:bg-[#2a4f9f] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-[#1a3f8f] rounded-lg flex items-center justify-center hover:bg-[#2a4f9f] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9      bg-[#1a3f8f] rounded-lg flex items-center justify-center hover:bg-[#2a4f9f] transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-9 h-9   bg-[#1a3f8f] rounded-lg flex items-center justify-center hover:bg-[#2a4f9f] transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 - Our Services */}
          <div>
            <h3 className="text-md font-semibold mb-6">Our Services</h3>
            <ul className="space-y-2  ">
              <li className=''>
                <a href="#" className="text-gray-300   hover:text-white transition-colors">
                  ILETS / TOFEL Preparation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300  hover:text-white transition-colors">
                  O / A Level Academy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Visa Consultant
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  PTE Preparation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Career Counseling
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Quick Links */}
          <div>
            <h3 className="text-md font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  University
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Us */}
          <div>
            <h3 className="text-md font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <div className="text-[#ff7b54] mt-1 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <span className="text-gray-300">
                  Level 1,225 Y Block<br />
                  Phase 3 DHA, Lahore
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="text-[#ff7b54] flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                  </svg>
                </div>
                <span className="text-gray-300">+92 300-8483375</span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="text-[#ff7b54] flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <span className="text-gray-300 break-all">ucmsacademy1@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#1a3f8f]">
        <div className="w-full   pt-4  pb-6 px-10  flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-300 text-center md:text-left">© 2026 UCMS. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-center">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;