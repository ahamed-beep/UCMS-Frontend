import React, { useState } from 'react';
import { Globe, Plus, CheckCircle, X, Upload, Image as ImageIcon } from 'lucide-react';
import axiosinstance from '../../Connection/Api';

const AddService = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const [servicesPageService, setServicesPageService] = useState({
        title: '',
        subTitle: '',
        description: '',
        iconFile: null,
        iconPreview: '',
        serviceImageFile: null,
        serviceImagePreview: '',
        bulletPoints: [{ title: '', description: '' }],
        color: '#10B981'
    });

    // Predefined color options
    const colorOptions = [
        { name: 'Blue', value: '#3B82F6' },
        { name: 'Green', value: '#10B981' },
        { name: 'Purple', value: '#8B5CF6' },
        { name: 'Red', value: '#EF4444' },
        { name: 'Orange', value: '#F97316' },
        { name: 'Pink', value: '#EC4899' },
        { name: 'Indigo', value: '#6366F1' },
        { name: 'Yellow', value: '#EAB308' },
    ];

    // Handle Services Page Service
    const handleServicesPageChange = (field, value) => {
        setServicesPageService(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setServicesPageService(prev => ({
                    ...prev,
                    iconFile: file,
                    iconPreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove uploaded image
    const removeImage = () => {
        setServicesPageService(prev => ({
            ...prev,
            iconFile: null,
            iconPreview: ''
        }));
    };

    // Handle Service Image Upload
    const handleServiceImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setServicesPageService(prev => ({
                    ...prev,
                    serviceImageFile: file,
                    serviceImagePreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove service image
    const removeServiceImage = () => {
        setServicesPageService(prev => ({
            ...prev,
            serviceImageFile: null,
            serviceImagePreview: ''
        }));
    };

    // Add bullet point
    const addBulletPoint = () => {
        setServicesPageService(prev => ({
            ...prev,
            bulletPoints: [...prev.bulletPoints, { title: '', description: '' }]
        }));
    };

    // Update bullet point
    const updateBulletPoint = (index, field, value) => {
        const newBulletPoints = [...servicesPageService.bulletPoints];
        newBulletPoints[index][field] = value;
        setServicesPageService(prev => ({
            ...prev,
            bulletPoints: newBulletPoints
        }));
    };

    // Remove bullet point
    const removeBulletPoint = (index) => {
        if (servicesPageService.bulletPoints.length > 1) {
            const newBulletPoints = servicesPageService.bulletPoints.filter((_, i) => i !== index);
            setServicesPageService(prev => ({
                ...prev,
                bulletPoints: newBulletPoints
            }));
        }
    };

    // Submit Services Page Service
    const handleServicesPageSubmit = async () => {
        // Validation
        if (!servicesPageService.title ||  !servicesPageService.description) {
            setErrorMessage('Please fill in all required fields');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }

        try {
            setLoading(true);
            setErrorMessage('');

            // Prepare FormData
            const formData = new FormData();
            formData.append('title', servicesPageService.title);
            formData.append('subtitle', servicesPageService.subTitle);
            formData.append('description', servicesPageService.description);
            formData.append('iconColor', servicesPageService.color);
            
            // Add icon file if exists
            if (servicesPageService.iconFile) {
                formData.append('icon', servicesPageService.iconFile);
            }
            
            // Add service page image file if exists
            if (servicesPageService.serviceImageFile) {
                formData.append('servicePageImage', servicesPageService.serviceImageFile);
            }
            
            // Filter out empty bullet points and add as JSON string
            const validBulletPoints = servicesPageService.bulletPoints.filter(
                point => point.title.trim() !== '' && point.description.trim() !== ''
            );
            
            if (validBulletPoints.length > 0) {
                formData.append('bulletPoints', JSON.stringify(validBulletPoints));
            }

            console.log('📤 Submitting service...');
            
            // API call
            const response = await axiosinstance.post('/createHomeService', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('✅ Response:', response.data);

            if (response.data.success) {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);

                
                
                // Reset form
                setServicesPageService({ 
                    title: '', 
                    subTitle: '',
                    description: '', 
                    iconFile: null,
                    iconPreview: '',
                    serviceImageFile: null,
                    serviceImagePreview: '',
                    bulletPoints: [{ title: '', description: '' }], 
                    color: '#10B981' 
                });
            } else {
                setErrorMessage(response.data.message || 'Failed to create service');
                setTimeout(() => setErrorMessage(''), 3000);
            }

        } catch (error) {
            console.error('❌ Error creating service:', error);
            setErrorMessage(error.response?.data?.message || 'Failed to create service');
            setTimeout(() => setErrorMessage(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Add New Service</h1>
                    <p className="text-gray-600">Add a new service to your Services Page</p>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-green-700 font-medium">Service added successfully!</span>
                    </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
                        <X className="text-red-500" size={20} />
                        <span className="text-red-700 font-medium">{errorMessage}</span>
                    </div>
                )}

                {/* Services Page Form */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                        <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: servicesPageService.color + '20' }}
                        >
                            <Globe style={{ color: servicesPageService.color }} size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Services Page</h2>
                            <p className="text-sm text-gray-600">Add a service for the services page</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Service Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Service Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter service title"
                                value={servicesPageService.title}
                                onChange={(e) => handleServicesPageChange('title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        {/* Sub Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sub Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter sub title"
                                value={servicesPageService.subTitle}
                                onChange={(e) => handleServicesPageChange('subTitle', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Enter service description"
                                value={servicesPageService.description}
                                onChange={(e) => handleServicesPageChange('description', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Icon Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Icon / Image (Optional)
                            </label>
                            
                            {!servicesPageService.iconPreview ? (
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2"
                                    >
                                        <Upload className="text-gray-400" size={32} />
                                        <span className="text-sm text-gray-600">Click to upload icon</span>
                                        <span className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</span>
                                    </label>
                                </div>
                            ) : (
                                <div className="relative inline-block">
                                    <img
                                        src={servicesPageService.iconPreview}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                                    />
                                    <button
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                        title="Remove image"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                            <p className="text-xs text-gray-500 mt-2">Upload an icon for your service</p>
                        </div>

                        {/* Service Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Service Image (Optional)
                            </label>
                            
                            {!servicesPageService.serviceImagePreview ? (
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleServiceImageUpload}
                                        className="hidden"
                                        id="service-image-upload"
                                    />
                                    <label
                                        htmlFor="service-image-upload"
                                        className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2"
                                    >
                                        <ImageIcon className="text-gray-400" size={32} />
                                        <span className="text-sm text-gray-600">Click to upload service image</span>
                                        <span className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</span>
                                    </label>
                                </div>
                            ) : (
                                <div className="relative inline-block">
                                    <img
                                        src={servicesPageService.serviceImagePreview}
                                        alt="Service Preview"
                                        className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-300"
                                    />
                                    <button
                                        onClick={removeServiceImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                        title="Remove image"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                            <p className="text-xs text-gray-500 mt-2">Upload a service image (separate from icon)</p>
                        </div>

                        {/* Color Picker */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Service Color
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => handleServicesPageChange('color', color.value)}
                                        className={`w-10 h-10 rounded-lg border-2 transition-all ${
                                            servicesPageService.color === color.value 
                                                ? 'border-gray-800 scale-110' 
                                                : 'border-gray-300 hover:scale-105'
                                        }`}
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    />
                                ))}
                                <div className="relative">
                                    <input
                                        type="color"
                                        value={servicesPageService.color}
                                        onChange={(e) => handleServicesPageChange('color', e.target.value)}
                                        className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                                        title="Custom color"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Selected: {servicesPageService.color}</p>
                        </div>

                        {/* Bullet Points */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bullet Points (Optional)
                            </label>
                            <div className="space-y-4">
                                {servicesPageService.bulletPoints.map((point, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-sm font-medium text-gray-700">
                                                Point {index + 1}
                                            </span>
                                            {servicesPageService.bulletPoints.length > 1 && (
                                                <button
                                                    onClick={() => removeBulletPoint(index)}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    title="Remove bullet point"
                                                >
                                                    <X size={18} />
                                                </button>
                                            )}
                                        </div>
                                        
                                        <div className="space-y-3">
                                            {/* Bullet Point Title */}
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter bullet point title"
                                                    value={point.title}
                                                    onChange={(e) => updateBulletPoint(index, 'title', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                                                />
                                            </div>
                                            
                                            {/* Bullet Point Description */}
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    rows="2"
                                                    placeholder="Enter bullet point description"
                                                    value={point.description}
                                                    onChange={(e) => updateBulletPoint(index, 'description', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={addBulletPoint}
                                className="mt-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
                                style={{ 
                                    color: servicesPageService.color,
                                    backgroundColor: servicesPageService.color + '10'
                                }}
                            >
                                <Plus size={16} />
                                Add bullet point
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleServicesPageSubmit}
                            disabled={loading}
                            className="w-full text-white py-2 px-4 rounded-lg hover:opacity-90 transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: servicesPageService.color }}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus size={20} />
                                    Add Service
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddService;