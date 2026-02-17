// src/LoginPage.jsx
import React, { useState } from "react";
import { ArrowLeftToLine, Eye, EyeOff, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosinstance from "../Connection/Api";

export default function SignIn() {  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosinstance.post('/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        // Token ko localStorage mein save karein
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        // Dashboard ya admin page par redirect karein
        navigate('/admin'); // apna route yahan daalein
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-200 flex items-center justify-center px-4">
      {/* Back Arrow - Top Left */}
      <Link to="/">
        <button className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-gray-50 transition-colors">
            <ArrowLeftToLine size={20} />
          </div>
          <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
        </button>
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#4F39F6] text-white rounded-full p-4">
            <LogIn size={24} />
          </div>
        </div>

        {/* Header */}
        <h2 className="text-center text-xl font-semibold mb-2">Admin Dashboard</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign in to manage your platform
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@admin.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 bottom-2.5 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4F39F6] text-white py-2 rounded-lg hover:bg-[#3a2a9c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}