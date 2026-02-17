import React, { useState } from 'react';
import axiosinstance from '../../Connection/Api';

export default function StudentSubmissionForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    serviceInterested: '',
    preferredStudyDestination: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axiosinstance.post('/student-submission', formData);

      if (response.data.success) {
        // Show thank you message
        setSubmitted(true);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          country: '',
          serviceInterested: '',
          preferredStudyDestination: '',
          message: ''
        });
      } else {
        setError(response.data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setError(error.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If submitted, show Thank You message
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-white mb-5 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#002366] mb-4">
              Start Your Journey Today
            </h1>
            <p className="text-[#4A5565] text-lg">
              Fill out the form below and our expert counselors will contact you within 24 hours
            </p>
          </div>

          {/* Thank You Card */}
          <div className="bg-white rounded-3xl shadow-xl p-12 md:p-16">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              {/* Success Icon */}
              <div className="relative">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.801 10A10 10 0 1 1 17 3.335"/>
                    <path d="m9 11 3 3L22 4"/>
                  </svg>
                </div>
              </div>

              {/* Thank You Message */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Thank You!
                </h2>
                <p className="text-gray-600 text-lg max-w-md mx-auto">
                  We've received your inquiry. Our counseling team will reach out to you shortly.
                </p>
              </div>

              {/* Optional: Button to submit another form */}
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-3 bg-[#002366] hover:bg-blue-800 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise show the form
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white mb-5 py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#002366] mb-4">
            Start Your Journey Today
          </h1>
          <p className="text-[#4A5565] text-lg">
            Fill out the form below and our expert counselors will contact you within 24 hours
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* First Name and Last Name */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-[#364153] mb-2">
                  First Name <span className="text-black">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Ali"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-[#364153] mb-2">
                  Last Name <span className="text-black">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Shah"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#364153] mb-2">
                  Email Address <span className="text-black">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alishah@gmail.com"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-[#364153] mb-2">
                  Phone Number <span className="text-black">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+92 3333 45678902"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Country and Service */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-[#364153] mb-2">
                  Your Country <span className="text-black">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder=""
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="serviceInterested" className="block text-sm font-semibold text-[#364153] mb-2">
                  Service Interested In <span className="text-black">*</span>
                </label>
                <input
                  type="text"
                  id="serviceInterested"
                  name="serviceInterested"
                  value={formData.serviceInterested}
                  onChange={handleChange}
                  placeholder=""
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Preferred Study Destination */}
            <div>
              <label htmlFor="preferredStudyDestination" className="block text-sm font-semibold text-[#364153] mb-2">
                Preferred Study Destination <span className="text-black">*</span>
              </label>
              <input
                type="text"
                id="preferredStudyDestination"
                name="preferredStudyDestination"
                value={formData.preferredStudyDestination}
                onChange={handleChange}
                placeholder=""
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-[#364153] mb-2">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your educational goals and any specific questions..."
                rows="5"
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF6B35] hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>

            {/* Terms Text */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                By submitting this form, you agree to our{' '}
                Terms of Service
                {' '}and{' '}
                Privacy Policy
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}