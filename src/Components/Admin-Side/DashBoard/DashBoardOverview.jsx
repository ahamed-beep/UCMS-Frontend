import React, { useEffect, useState } from 'react';
import axiosinstance from '../../Connection/Api';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalServices: 0,
    totalMessages: 0,
    unreadMessages: 0
  });
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

 const fetchDashboardData = async () => {
  try {
    setLoading(true);

    const [statsRes, studentsRes, messagesRes] = await Promise.all([
      axiosinstance.get('/dashboard-stats'),
      axiosinstance.get('/student-submission/recent'),
      axiosinstance.get('/contact-message/recent')
    ]);

    // ✅ DEBUG: Backend response dekho
    console.log('📊 Stats Response:', statsRes.data);
    console.log('👨‍🎓 Students Response:', studentsRes.data);
    console.log('💬 Messages Response:', messagesRes.data);

    if (statsRes.data.success) {
      setStats(statsRes.data.data);
    }

    if (studentsRes.data.success) {
      console.log('🔍 Recent Students Data:', studentsRes.data.data);
      setRecentStudents(studentsRes.data.data);
    }

    if (messagesRes.data.success) {
      console.log('🔍 Recent Messages Data:', messagesRes.data.data);
      setRecentMessages(messagesRes.data.data);
    }

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  } finally {
    setLoading(false);
  }
};

  // Get first letter for avatar
  const getInitial = (firstName) => {
    return firstName ? firstName.charAt(0).toUpperCase() : '?';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Welcome to your admin dashboard. Here's a quick overview of your platform activity.
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Students Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-lg mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Students</div>
            <div className="text-3xl font-bold text-blue-600">{stats.totalStudents}</div>
          </div>

          {/* Total Services Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-green-50 text-green-600 rounded-lg mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase-icon lucide-briefcase"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Services</div>
            <div className="text-3xl font-bold text-green-600">{stats.totalServices}</div>
          </div>

          {/* Total Messages Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-50 text-purple-600 rounded-lg mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-icon lucide-message-square"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Messages</div>
            <div className="text-3xl font-bold text-purple-600">{stats.totalMessages}</div>
          </div>

          {/* Unread Messages Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-50 rounded-lg mb-4">
              <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <div className="text-sm text-gray-600 mb-1">Unread Messages</div>
            <div className="text-3xl font-bold text-orange-600">{stats.unreadMessages}</div>
          </div>
        </div>

        {/* Bottom Section - Recent Applications and Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Recent Student Applications */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Recent Student Applications
            </h2>
            
            <div className="space-y-4">
              {recentStudents.length > 0 ? (
                recentStudents.map((student, index) => (
                  <div key={student._id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`flex-shrink-0 w-10 h-10 ${
                      index === 0 ? 'bg-blue-100' : index === 1 ? 'bg-purple-100' : 'bg-indigo-100'
                    } rounded-full flex items-center justify-center`}>
                      <span className={`${
                        index === 0 ? 'text-blue-600' : index === 1 ? 'text-purple-600' : 'text-indigo-600'
                      } font-semibold`}>
                        {getInitial(student.firstName)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {student.firstName} {student.lastName}
                        </h3>
                        {/* ✅ NEW BADGE for unread students */}
                        {student.status === 'unread' && (
                          <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate  break-words">{student.serviceInterested}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent applications</p>
              )}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Recent Messages
            </h2>
            
            <div className="space-y-4">
              {recentMessages.length > 0 ? (
                recentMessages.map((message) => (
                  <div key={message._id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-icon lucide-message-square"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {message.firstName} {message.lastName}
                        </h3>
                        {message.status === 'unread' && (
                          <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </div>

                      {/* ⭐ CHANGE truncate → break-words */}
                      <p className="text-sm text-gray-600 break-words">  {message.subject}
                      </p>

                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent messages</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}