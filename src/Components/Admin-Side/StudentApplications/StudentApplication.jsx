import React, { useEffect, useState } from 'react';
import { User, Trash2 } from 'lucide-react';
import axiosinstance from '../../Connection/Api';

export default function StudentApplications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [allApplications, setAllApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axiosinstance.get('/student-submission');

      if (response.data.success) {
        console.log('📚 Students Data:', response.data.data);
        setAllApplications(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}'s application? This action cannot be undone.`
    );

    if (confirmed) {
      try {
        const response = await axiosinstance.delete(`/student-submission/${id}`);

        if (response.data.success) {
          // Remove from state
          setAllApplications(allApplications.filter(app => app._id !== id));
          alert('Application deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting application:', error);
        alert('Failed to delete application');
      }
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const response = await axiosinstance.patch(`/student-submission/${id}/read`);

      if (response.data.success) {
        // Update status in state
        setAllApplications(allApplications.map(app =>
          app._id === id ? { ...app, status: 'read' } : app
        ));
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const filteredApplications = allApplications.filter((app) => {
    const matchesSearch = searchQuery === '' ||
      app.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.serviceInterested?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.country?.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesDateRange = true;
    if (fromDate) {
      const from = new Date(fromDate);
      from.setHours(0, 0, 0, 0);
      const appDate = new Date(app.createdAt);
      matchesDateRange = matchesDateRange && appDate >= from;
    }
    if (toDate) {
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      const appDate = new Date(app.createdAt);
      matchesDateRange = matchesDateRange && appDate <= to;
    }

    return matchesSearch && matchesDateRange;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setFromDate('');
    setToDate('');
  };

  const hasActiveFilters = searchQuery || fromDate || toDate;

  const getInitial = (firstName) => {
    return firstName ? firstName.charAt(0).toUpperCase() : '?';
  };

  const getAvatarColor = (index) => {
    const colors = ['orange', 'purple', 'blue', 'green', 'pink'];
    return colors[index % colors.length];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Student Applications
            </h1>
            <p className="text-gray-600">
              View and manage all student form submissions
            </p>
          </div>


        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 max-w-4xl">
          {/* Search Bar */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Search Applications
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by name, email, phone, service, or country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Date Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 transition-all duration-300 max-w-full">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  From Date
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  To Date
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        {hasActiveFilters && (
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredApplications.length} of {allApplications.length} applications
          </div>
        )}

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                    Interested Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                    Country
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                    Submission Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>



              <tbody className="divide-y divide-gray-200">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app, index) => (
                    <tr
                      key={app._id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => app.status === 'unread' && handleMarkAsRead(app._id)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                        
                          <div className="relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarColor(index) === 'orange' ? 'bg-orange-100' :
                                getAvatarColor(index) === 'purple' ? 'bg-purple-100' :
                                  getAvatarColor(index) === 'blue' ? 'bg-blue-100' :
                                    getAvatarColor(index) === 'green' ? 'bg-green-100' :
                                      getAvatarColor(index) === 'pink' ? 'bg-pink-100' :
                                        'bg-gray-100'
                              }`}>
                              <User className={`w-5 h-5 ${getAvatarColor(index) === 'orange' ? 'text-orange-600' :
                                  getAvatarColor(index) === 'purple' ? 'text-purple-600' :
                                    getAvatarColor(index) === 'blue' ? 'text-blue-600' :
                                      getAvatarColor(index) === 'green' ? 'text-green-600' :
                                        getAvatarColor(index) === 'pink' ? 'text-pink-600' :
                                          'text-gray-600'
                                }`} />
                            </div>

                            
                            {app.status === 'unread' && (
                              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                              </span>
                            )}
                          </div>

                          <span className="font-medium text-gray-800">
                            {app.firstName} {app.lastName}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">{app.email}</td>
                      <td className="px-6 py-4 text-gray-600">{app.phoneNumber}</td>
                      <td className="px-6 py-4 text-gray-600">{app.serviceInterested}</td>
                      <td className="px-6 py-4 text-gray-600">{app.country}</td>
                      <td className="px-6 py-4 text-gray-600">{formatDate(app.createdAt)}</td>

                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); 
                            handleDelete(app._id, `${app.firstName} ${app.lastName}`);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete application"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-500 font-medium">No applications found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}