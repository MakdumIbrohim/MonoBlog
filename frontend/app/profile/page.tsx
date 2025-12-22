'use client';


import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUser, updateProfile, updateAvatar } from '../../services/api';
import { useToast } from '../components/ToastContext';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  avatar_url?: string;
}

export default function Profile() {
  const { showToast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    getUser()
      .then(data => {
        setUser(data);
        setFormData({ name: data.name, email: data.email });
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async () => {
    setUpdatingProfile(true);

    try {
      const data = await updateProfile(formData.name, formData.email);
      setUser(data.user);
      setEditMode(false);
      showToast('Profile berhasil diperbarui', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast(error instanceof Error ? error.message : 'Terjadi kesalahan saat memperbarui profile', 'error');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleAvatarUpdate = async () => {
    if (!selectedFile) return;

    setUpdating(true);

    try {
      const data = await updateAvatar(selectedFile);
      setUser(prev => prev ? { ...prev, avatar: data.avatar, avatar_url: data.avatar_url } : null);
      setSelectedFile(null);
      setPreview(null);
      showToast('Avatar berhasil diperbarui', 'success');
    } catch (error) {
      console.error('Error updating avatar:', error);
      showToast(error instanceof Error ? error.message : 'Terjadi kesalahan saat memperbarui avatar', 'error');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                Informasi Profil
              </h3>

              <div className="flex items-center space-x-6 mb-6">
                <div className="shrink-0 relative">
                  <Image
                    className="rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 cursor-pointer hover:opacity-80 transition-opacity"
                    src={preview || user?.avatar_url || 'https://via.placeholder.com/96?text=No+Avatar'}
                    alt="Avatar"
                    width={96}
                    height={96}
                    onClick={() => document.getElementById('avatar-input')?.click()}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => document.getElementById('avatar-input')?.click()}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    type="file"
                    id="avatar-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  {editMode ? (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Nama
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={handleProfileUpdate}
                          disabled={updatingProfile}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md flex items-center"
                        >
                          {updatingProfile ? (
                            <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : null}
                          {updatingProfile ? 'Memperbarui...' : 'Perbarui Profile'}
                        </button>
                        <button
                          onClick={() => {
                            setEditMode(false);
                            setFormData({ name: user?.name || '', email: user?.email || '' });
                          }}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">{user?.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                      <button
                        onClick={() => setEditMode(true)}
                        className="mt-2 text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                      >
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {selectedFile && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                    Pratinjau Avatar Baru
                  </h4>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleAvatarUpdate}
                      disabled={updating}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md flex items-center"
                    >
                      {updating ? (
                        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : null}
                      {updating ? 'Memperbarui...' : 'Perbarui Avatar'}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreview(null);
                      }}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}