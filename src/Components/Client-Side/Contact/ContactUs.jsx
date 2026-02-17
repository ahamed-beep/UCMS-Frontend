import React, { useState } from "react";
import axiosinstance from "../../Connection/Api";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await axiosinstance.post(
        "/contact-message",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }
      );

      if (response.data.success) {
        setIsSuccess(true);
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        setError(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      if (err.response) {
        // Server responded with error
        setError(err.response.data.message || "Server error. Please try again.");
      } else if (err.request) {
        // Request made but no response
        setError("Failed to connect to server. Please check your connection.");
      } else {
        // Something else happened
        setError("Failed to send message. Please try again.");
      }
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setIsSuccess(false);
    setError("");
  };

  return (
    <div className="w-full py-16 px-6 bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a2472] mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-[#4A5565]">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side - Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Contact Information Box */}
            <div>
              <h3 className="text-xl font-bold text-[#0a2472] mb-6">
                Contact Information
              </h3>

              {/* Visit Us */}
              <div className="flex gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#ff7b54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#0a2472] mb-1">Visit Us</h4>
                  <p className="text-sm text-[#4A5565]">123 Education Lane</p>
                  <p className="text-sm text-[#4A5565]">Downtown, New York</p>
                  <p className="text-sm text-[#4A5565]">NY 10001, USA</p>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#0a2472] mb-1">Call Us</h4>
                  <p className="text-sm text-[#4A5565]">+1 (555) 123-4567</p>
                  <p className="text-sm text-[#4A5565]">+1 (555) 987-6543</p>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#0a2472] mb-1">Email Us</h4>
                  <p className="text-sm text-[#4A5565]">info@ucms.com</p>
                  <p className="text-sm text-[#4A5565]">support@ucms.com</p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#0a2472] mb-1">Office Hours</h4>
                  <p className="text-sm text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-sm text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-sm text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Need Immediate Help Box */}
            <div className="bg-gradient-to-r from-[#1A2942] to-[#2A3952] text-[#FFFFFF] rounded-2xl p-6">
              <h4 className="text-lg font-bold mb-3">Need Immediate Help?</h4>
              <p className="text-sm text-[#D1D5DC] mb-4">
                Call our 24/7 student support hotline for urgent queries.
              </p>
              <button className="bg-[#ff7b54] hover:bg-[#ff6b44] text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </button>
            </div>
          </div>

          {/* Right Side - Contact Form or Success Message */}
          <div className="lg:col-span-2">
            {!isSuccess ? (
              // Contact Form
              <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#F9FAFB] to-[#FFFFFF] rounded-2xl p-8 shadow-xl border border-[#E5E7EB]">
                
                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7b54] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7b54] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7b54] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7b54] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7b54] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    required
                    rows="6"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7b54] focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FF6B35] hover:bg-[#ff6b44] text-white font-semibold px-8 py-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            ) : (
              // Success Message
              <div className="bg-gradient-to-br from-[#F9FAFB] to-[#FFFFFF] rounded-2xl p-12 md:p-16 shadow-xl border border-[#E5E7EB] min-h-[500px] flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-md">
                  {/* Success Icon with pulse animation */}
                  <div className="relative">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"/>
                        <path d="m9 11 3 3L22 4"/>
                      </svg>
                    </div>
                  </div>

                  {/* Message Sent Text */}
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0a2472]">
                      Message Sent!
                    </h2>
                    <p className="text-[#4A5565] text-lg">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>

                  {/* Send Another Message Button */}
                  <button
                    onClick={handleSendAnother}
                    className="bg-[#FF6B35] hover:bg-[#ff6b44] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}