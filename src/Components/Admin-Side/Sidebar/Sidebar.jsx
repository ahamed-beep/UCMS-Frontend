import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Plus, 
  Settings, 
  MessageSquare, 
  LogOut,
} from 'lucide-react';
import ManageServices from '../ManageServices/MangeServices';
import Navbar from '../Navbar/Navbar';
import StudentApplications from '../StudentApplications/StudentApplication';
import AddService from '../AddService/AddServicePage';
import DashboardOverview from '../DashBoard/DashBoardOverview';
import ContactMessages from '../Contact/Contact';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Load activeView from localStorage or default to 'dashboard'
  const [activeView, setActiveView] = useState(() => {
    return localStorage.getItem('activeAdminView') || 'dashboard';
  });
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', view: 'dashboard' },
    { icon: Users, text: 'Student Applications', view: 'applications' },
    { icon: Plus, text: 'Add Service', view: 'add-service' },
    { icon: Settings, text: 'Manage Services', view: 'manage-services' },
    { icon: MessageSquare, text: 'Contact Messages', view: 'messages' },
  ];

  // Save activeView to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activeAdminView', activeView);
  }, [activeView]);

  const handleMenuClick = (view) => {
    setActiveView(view);
    setIsOpen(false);
  };

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    
    if (confirmed) {
      // Remove token and user data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('activeAdminView'); // Also remove saved view
      
      console.log('✅ Logged out successfully');
      
      // Redirect to login page
      navigate('/signin');
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'applications':
        return <StudentApplications />;
      case 'add-service':
        return <AddService/>;
      case 'manage-services':
        return <ManageServices />;
      case 'messages':
        return <ContactMessages />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 
          text-white z-40 transition-all duration-300 ease-in-out shadow-2xl
          lg:w-64
          ${isOpen ? 'w-64' : 'w-20 lg:w-64'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="md:p-7 p-5 border-b border-indigo-700">
            <h2 className={`
              md:text-xl text-sm  font-bold transition-opacity duration-300
              ${isOpen ? 'opacity-100 ' : 'opacity-100  lg:opacity-100 '}
            `}>
              Admin Panel
            </h2>
          </div>

          {/* Menu Items */}
          <nav className="flex-1  py-6">
            <ul className="space-y-2 px-3">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const active = activeView === item.view;
                
                return (
                  <li key={index}>
                    <button
                      onClick={() => handleMenuClick(item.view)}
                      className={`
                        w-full flex items-center  gap-4 px-4 py-4 rounded-lg 
                        transition-all duration-200 group relative
                        ${active 
                          ? 'bg-indigo-700 shadow-lg' 
                          : 'hover:bg-indigo-700'
                        }
                      `}
                    >
                      <Icon 
                        size={20} 
                        className="flex-shrink-0 group-hover:scale-110 transition-transform"
                      />
                      
                      <span className={`
                        whitespace-nowrap transition-all duration-300
                        ${isOpen ? 'opacity-100 block' : 'hidden lg:block lg:opacity-100'}
                      `}>
                        {item.text}
                      </span>

                      {/* Tooltip for mobile icon-only view */}
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm 
                        rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 
                        transition-opacity duration-200 whitespace-nowrap z-50 lg:hidden"
                        style={{ display: isOpen ? 'none' : undefined }}
                      >
                        {item.text}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button - Bottom of Sidebar */}
          <div className="p-3 border-t border-indigo-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-lg 
                transition-all duration-200 group relative hover:bg-red-600"
            >
              <LogOut 
                size={20} 
                className="flex-shrink-0 group-hover:scale-110 transition-transform"
              />
              
              <span className={`
                whitespace-nowrap transition-all duration-300
                ${isOpen ? 'opacity-100 block' : 'hidden lg:block lg:opacity-100'}
              `}>
                Logout
              </span>

              {/* Tooltip for mobile icon-only view */}
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm 
                rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 
                transition-opacity duration-200 whitespace-nowrap z-50 lg:hidden"
                style={{ display: isOpen ? 'none' : undefined }}
              >
                Logout
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`
        transition-all duration-300
        lg:ml-64
        ${isOpen ? 'ml-64' : 'ml-16 lg:ml-64'}
        min-h-screen bg-gray-50
      `}>
        {/* Fixed Navbar */}
        <div className="fixed top-0 right-0 left-0 lg:left-64 z-30 bg-white shadow-sm">
          <Navbar />
        </div>

        {/* Page Content with padding-top to avoid navbar overlap */}
        <div className="pt-20 p-6">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;