import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axiosinstance from '../../Connection/Api';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const emptyForm = { 
    id: null, 
    title: '', 
    subTitle: '',
    description: '', 
    color: '#3B82F6',
    iconImage: '',
    iconFile: null,
    iconPreview: '',
    serviceImage: '',
    serviceFile: null,
    servicePreview: '',
    bullets: [{ title: '', description: '' }]
  };
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axiosinstance.get('/homeservice');
      
      if (response.data.success) {
        console.log('📚 Services Data:', response.data.data);
        setServices(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      alert('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

 
  const openEdit = (srv) => {
    setForm({ 
      id: srv._id,
      title: srv.title,
      subTitle: srv.subtitle,
      description: srv.description,
      color: srv.iconColor,
      iconImage: srv.icon || '',
      iconFile: null,
      iconPreview: srv.icon || '',
      serviceImage: srv.servicePageImage || '',
      serviceFile: null,
      servicePreview: srv.servicePageImage || '',
      bullets: srv.bulletPoints?.length > 0 ? srv.bulletPoints : [{ title: '', description: '' }]
    });
    setOpen(true);
  };

  const handleIconUpload = (e) => {
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
        setForm(prev => ({
          ...prev,
          iconFile: file,
          iconPreview: reader.result,
          iconImage: ''
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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
        setForm(prev => ({
          ...prev,
          serviceFile: file,
          servicePreview: reader.result,
          serviceImage: ''
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeIconImage = () => {
    setForm(prev => ({
      ...prev,
      iconFile: null,
      iconPreview: '',
      iconImage: ''
    }));
  };

  const removeServiceImage = () => {
    setForm(prev => ({
      ...prev,
      serviceFile: null,
      servicePreview: '',
      serviceImage: ''
    }));
  };

  const saveService = async () => {
    if (!form.title.trim()) {
      alert('Title is required');
      return;
    }
   

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('subtitle', form.subTitle);
      formData.append('description', form.description);
      formData.append('iconColor', form.color);
      
      // Add icon file if uploaded
      if (form.iconFile) {
        formData.append('icon', form.iconFile);
      }
      
      // Add service image file if uploaded
      if (form.serviceFile) {
        formData.append('servicePageImage', form.serviceFile);
      }
      
      // Filter out empty bullet points
      const validBulletPoints = form.bullets.filter(
        b => b.title.trim() !== '' && b.description.trim() !== ''
      );
      
      if (validBulletPoints.length > 0) {
        formData.append('bulletPoints', JSON.stringify(validBulletPoints));
      }

      console.log('📤 Updating service:', form.id);

      const response = await axiosinstance.put(
        `/updateHomeService/${form.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('✅ Update response:', response.data);

      if (response.data.success) {
        alert('Service updated successfully!');
        setOpen(false);
        setForm(emptyForm);
        fetchServices(); // Refresh list
      } else {
        alert(response.data.message || 'Failed to update service');
      }

    } catch (error) {
      console.error('❌ Error updating service:', error);
      alert(error.response?.data?.message || 'Failed to update service');
    } finally {
      setSaving(false);
    }
  };

  const addBullet = () => {
    setForm(prev => ({
      ...prev,
      bullets: [...prev.bullets, { title: '', description: '' }]
    }));
  };

  const updateBullet = (index, field, value) => {
    const newBullets = [...form.bullets];
    newBullets[index][field] = value;
    setForm(prev => ({ ...prev, bullets: newBullets }));
  };

  const removeBullet = (index) => {
    if (form.bullets.length > 1) {
      setForm(prev => ({
        ...prev,
        bullets: prev.bullets.filter((_, i) => i !== index)
      }));
    }
  };

  const deleteService = async (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"? This action cannot be undone.`
    );

    if (confirmed) {
      try {
        const response = await axiosinstance.delete(`/deletehomeservice/${id}`);
        
        if (response.data.success) {
          alert('Service deleted successfully!');
          fetchServices(); // Refresh list
        } else {
          alert(response.data.message || 'Failed to delete service');
        }
      } catch (error) {
        console.error('Error deleting service:', error);
        alert(error.response?.data?.message || 'Failed to delete service');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eef2f6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef2f6] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Manage Services</h1>
            <p className="text-gray-500 text-sm">View, edit, or delete existing services</p>
          </div>
          
          {/* Refresh Button */}
         
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className=" w-full text-sm">
              <thead className="bg-gray-50  whitespace-nowrap text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left border-b border-gray-200">Service Title</th>
                  <th className="px-6 py-4 text-left border-b border-gray-200">Sub Title</th>
                  <th className="px-6 py-4 text-left border-b border-gray-200">Description</th>
                  <th className="px-6 py-4 text-left border-b border-gray-200">Color</th>
                  <th className="px-6 py-4 text-left border-b border-gray-200">Icon/Image</th>
                  <th className="px-6 py-4 text-left border-b border-gray-200">Service Image</th>
                  <th className="px-6 py-4 text-left border-b border-gray-200">Bullet Points</th>
                  <th className="px-6 py-4 text-left border-b border-gray-200">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {services.length > 0 ? (
                  services.map((service) => (
                    <tr key={service._id} className="hover:bg-gray-50">
                      {/* Service Title */}
                      <td className="px-6 py-6 font-medium text-gray-800">{service.title}</td>

                      {/* Sub Title */}
                      <td className="px-6 py-6 text-gray-600">{service.subtitle}</td>

                      {/* Description */}
                      <td className="px-6 py-6 text-gray-600 max-w-xs">
                        {service.description.substring(0, 100)}
                        {service.description.length > 100 && '...'}
                      </td>

                      {/* Color */}
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-8 h-8 rounded border border-gray-300"
                            style={{ backgroundColor: service.iconColor }}
                          />
                          <span className="text-xs text-gray-500">{service.iconColor}</span>
                        </div>
                      </td>

                      {/* Icon/Image */}
                      <td className="px-6 py-6">
                        {service.icon ? (
                          <img 
                            src={service.icon} 
                            alt="Icon" 
                            className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">No icon</span>
                        )}
                      </td>

                      {/* Service Image */}
                      <td className="px-6 py-6">
                        {service.servicePageImage ? (
                          <img 
                            src={service.servicePageImage} 
                            alt="Service" 
                            className="w-20 h-12 object-cover rounded-lg border border-gray-200"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">No image</span>
                        )}
                      </td>

                      {/* Bullet Points */}
                      <td className="px-6 py-6">
                        {service.bulletPoints?.length === 0 || !service.bulletPoints
                          ? <span className="text-gray-400 text-xs">None</span> 
                          : (
                            <div className="space-y-2 max-w-sm">
                              {service.bulletPoints.map((b, i) => (
                                <div key={i} className="border-l-2 pl-2" style={{ borderColor: service.iconColor }}>
                                  <div className="font-medium text-gray-800 text-xs">{b.title}</div>
                                  {b.description && (
                                    <div className="text-gray-600 text-xs mt-0.5">
                                      {b.description.substring(0, 50)}
                                      {b.description.length > 50 && '...'}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )
                        }
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-6">
                        <div className="flex gap-4">
                          <button 
                            onClick={() => openEdit(service)} 
                            className="text-indigo-500 hover:text-indigo-600 transition-colors"
                            title="Edit service"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => deleteService(service._id, service.title)} 
                            className="text-red-500 hover:text-red-600 transition-colors"
                            title="Delete service"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-500 font-medium">No services found</p>
                        <p className="text-gray-400 text-sm mt-1">Add a new service to get started</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

     {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800">Edit Service</h2>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
                placeholder="Service title" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle (optional)</label>
              <input 
                value={form.subTitle} 
                onChange={e => setForm({...form, subTitle: e.target.value})} 
                placeholder="Service subtitle" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})} 
                placeholder="Service description" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                rows="3"
              />
            </div>

            {/* Icon Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon Image</label>
              
              {/* URL Input */}
              <input 
                value={form.iconImage} 
                onChange={e => setForm({...form, iconImage: e.target.value})} 
                placeholder="https://example.com/icon.png or upload file below" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-2" 
              />
              
              {/* Preview and Upload */}
              <div className="flex items-start gap-3">
                {/* Image Preview */}
                {form.iconPreview && (
                  <div className="relative">
                    <img 
                      src={form.iconPreview} 
                      alt="Icon preview" 
                      className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeIconImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                
                {/* Upload Button - Always Show */}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleIconUpload}
                    className="hidden"
                    id="icon-upload"
                  />
                  <label
                    htmlFor="icon-upload"
                    className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600">
                      {form.iconPreview ? 'Change icon' : 'Click to upload icon'}
                    </span>
                    <span className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Service Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Image</label>
              
              {/* URL Input */}
              <input 
                value={form.serviceImage} 
                onChange={e => setForm({...form, serviceImage: e.target.value})} 
                placeholder="https://example.com/service-image.jpg or upload file below" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-2" 
              />
              
              {/* Preview and Upload */}
              <div className="space-y-3">
                {/* Image Preview */}
                {form.servicePreview && (
                  <div className="relative inline-block">
                    <img 
                      src={form.servicePreview} 
                      alt="Service preview" 
                      className="w-full max-w-md h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeServiceImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                
                {/* Upload Button - Always Show */}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleServiceImageUpload}
                    className="hidden"
                    id="service-upload"
                  />
                  <label
                    htmlFor="service-upload"
                    className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-600">
                      {form.servicePreview ? 'Change service image' : 'Click to upload service image'}
                    </span>
                    <span className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color"
                  value={form.color} 
                  onChange={e => setForm({...form, color: e.target.value})} 
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer" 
                />
                <input 
                  type="text"
                  value={form.color} 
                  onChange={e => setForm({...form, color: e.target.value})} 
                  placeholder="#3B82F6" 
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm" 
                />
              </div>
            </div>

            {/* Bullet Points */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bullet Points
              </label>
              <div className="space-y-3">
                {form.bullets.map((bullet, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600">Point {index + 1}</span>
                      {form.bullets.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeBullet(index)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <input 
                      value={bullet.title} 
                      onChange={e => updateBullet(index, 'title', e.target.value)} 
                      placeholder="Title" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm" 
                    />
                    <textarea 
                      value={bullet.description} 
                      onChange={e => updateBullet(index, 'description', e.target.value)} 
                      placeholder="Description" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm" 
                      rows="2"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addBullet}
                className="mt-3 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                + Add Bullet Point
              </button>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t">
              <button 
                onClick={() => {
                  setOpen(false);
                  setForm(emptyForm);
                }} 
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveService} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}