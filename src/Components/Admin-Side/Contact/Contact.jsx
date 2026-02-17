import React, { useState, useEffect } from 'react';
import { Search, Calendar, Mail, Phone, Trash2 } from 'lucide-react';
import axiosinstance from '../../Connection/Api';

const ContactMessages = () => {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await axiosinstance.get('/contact-message');
            
            if (response.data.success) {
                console.log('💬 Contact Messages:', response.data.data);
                setMessages(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
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

    // Filter messages based on search term and dates
    const filteredMessages = messages.filter((message) => {
        const fullName = `${message.firstName} ${message.lastName}`;
        const matchesSearch =
            fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.message.toLowerCase().includes(searchTerm.toLowerCase());

        const messageDate = new Date(message.createdAt);
        const matchesFromDate = fromDate ? messageDate >= new Date(fromDate) : true;
        const matchesToDate = toDate ? messageDate <= new Date(toDate) : true;

        return matchesSearch && matchesFromDate && matchesToDate;
    });

    const handleRowClick = async (message) => {
        setSelectedMessage(message);
        
        // Mark as read if unread
        if (message.status === 'unread') {
            try {
                const response = await axiosinstance.patch(`/contact-message-read/${message._id}`);
                
                if (response.data.success) {
                    // Update local state
                    setMessages(messages.map(msg =>
                        msg._id === message._id ? { ...msg, status: 'read' } : msg
                    ));
                    setSelectedMessage({ ...message, status: 'read' });
                }
            } catch (error) {
                console.error('Error marking as read:', error);
            }
        }
    };

    const handleDeleteMessage = async (messageId, e) => {
        e.stopPropagation();
        
        const messageToDelete = messages.find(msg => msg._id === messageId);
        const fullName = `${messageToDelete.firstName} ${messageToDelete.lastName}`;
        
        const confirmed = window.confirm(
            `Are you sure you want to delete the message from ${fullName}? This action cannot be undone.`
        );

        if (confirmed) {
            try {
                const response = await axiosinstance.delete(`/contact-message/${messageId}`);
                
                if (response.data.success) {
                    setMessages(messages.filter(msg => msg._id !== messageId));
                    if (selectedMessage?._id === messageId) {
                        setSelectedMessage(null);
                    }
                    alert('Message deleted successfully!');
                }
            } catch (error) {
                console.error('Error deleting message:', error);
                alert('Failed to delete message');
            }
        }
    };

    const handleReset = () => {
        setSearchTerm('');
        setFromDate('');
        setToDate('');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading messages...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="w-full">
                {/* Header */}
                <div className="mb-4 sm:mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Contact Messages</h1>
                        <p className="text-sm sm:text-base text-gray-600">View and manage messages from users</p>
                    </div>
                    
                   
                 
                </div>

                {/* Search Section */}
                <div className="w-full lg:w-[80%] mb-6">
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-4 sm:p-6 border-b border-gray-200">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Search Messages
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Search by name, email, or message content..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full sm:w-[70%] lg:w-[50%] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
                                    {/* From Date */}
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            From Date
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type="date"
                                                value={fromDate}
                                                onChange={(e) => setFromDate(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* To Date */}
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            To Date
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type="date"
                                                value={toDate}
                                                onChange={(e) => setToDate(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table and Details Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left Side - Messages Table */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-md">
                            <div className="overflow-x-auto rounded-lg">
                                <table className="w-full min-w-[800px]">
                                    <thead className="bg-gray-100 border-b border-gray-200">
                                        <tr>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Phone
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Subject
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date & Time
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredMessages.length > 0 ? (
                                            filteredMessages.map((message) => (
                                                <tr
                                                    key={message._id}
                                                    onClick={() => handleRowClick(message)}
                                                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                                                        selectedMessage?._id === message._id ? 'bg-indigo-50' : ''
                                                    }`}
                                                >
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                        <span className={`relative px-2 sm:px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            message.status === 'unread'
                                                                ? 'bg-orange-100 text-orange-800'
                                                                : 'bg-green-100 text-green-800'
                                                        }`}>
                                                            {message.status === 'unread' ? 'New' : 'Read'}
                                                            {message.status === 'unread' && (
                                                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                                                </span>
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {message.firstName} {message.lastName}
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {message.email}
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {message.phoneNumber}
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                                                        {message.subject}
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar size={16} className="hidden sm:block" />
                                                            <span className="text-xs sm:text-sm">{formatDate(message.createdAt)}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <button
                                                            onClick={(e) => handleDeleteMessage(message._id, e)}
                                                            className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete message"
                                                        >
                                                            <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-8 text-center text-gray-500 text-sm">
                                                    No messages found matching your search criteria
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Message Details */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 lg:sticky lg:top-6">
                            {selectedMessage ? (
                                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                                    {/* Header */}
                                    <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200">
                                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Message Details</h2>
                                        <span className={`relative px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${
                                            selectedMessage.status === 'unread'
                                                ? 'bg-orange-100 text-orange-800'
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                            {selectedMessage.status === 'unread' ? 'New' : 'Read'}
                                            {selectedMessage.status === 'unread' && (
                                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                                </span>
                                            )}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-3 sm:space-y-4">
                                        {/* From */}
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">From</label>
                                            <p className="text-sm sm:text-base text-gray-900 font-medium mt-1">
                                                {selectedMessage.firstName} {selectedMessage.lastName}
                                            </p>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Mail size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                                                <a href={`mailto:${selectedMessage.email}`} className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 break-all">
                                                    {selectedMessage.email}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Phone size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                                                <a href={`tel:${selectedMessage.phoneNumber}`} className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700">
                                                    {selectedMessage.phoneNumber}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Subject</label>
                                            <p className="text-sm sm:text-base text-gray-900 mt-1 font-medium">{selectedMessage.subject}</p>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Message</label>
                                            <div className="mt-2 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                                    {selectedMessage.message}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Date & Time */}
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date & Time</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Calendar size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                                                <p className="text-xs sm:text-sm text-gray-900">{formatDate(selectedMessage.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-3 sm:pt-4 border-t border-gray-200">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteMessage(selectedMessage._id, e);
                                            }}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                        >
                                            <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                                            Delete Message
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-6 text-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                                        <Mail size={24} className="text-gray-400 sm:w-8 sm:h-8" />
                                    </div>
                                    <p className="text-sm sm:text-base text-gray-500 font-medium">Select a message to view details</p>
                                    <p className="text-xs sm:text-sm text-gray-400 mt-1">Click on any message from the table</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactMessages;