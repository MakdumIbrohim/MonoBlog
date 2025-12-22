'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPost, createPost, updatePost } from '../../services/api';
import { useToast } from '../components/ToastContext';

export default function CreatePost() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');
  const isEditing = !!postId;
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    if (isEditing && postId) {
      getPost(Number(postId))
        .then(data => {
          setTitle(data.title);
          setContent(data.content);
          setFetchLoading(false);
        })
        .catch(() => {
          showToast('Failed to load post', 'error');
          window.location.href = '/dashboard';
        });
    }
  }, [isEditing, postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing && postId) {
        await updatePost(Number(postId), title, content);
        showToast('Post updated successfully!', 'success');
      } else {
        await createPost(title, content);
        showToast('Post created successfully!', 'success');
      }
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} post:`, error);
      showToast(error instanceof Error ? error.message : `An error occurred while ${isEditing ? 'updating' : 'creating'} the post`, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {isEditing ? 'Edit Postingan' : 'Buat Postingan Baru'}
        </h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Judul
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Masukkan judul postingan"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Konten
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Tulis konten postingan Anda di sini..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {loading ? (isEditing ? 'Memperbarui Postingan...' : 'Membuat Postingan...') : (isEditing ? 'Perbarui Postingan' : 'Buat Postingan')}
          </button>
        </form>
      </div>
    </div>
  );
}