'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUser, getPosts, logoutUser, deletePost } from '../../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    avatar_url?: string;
  };
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    // Fetch user data
    getUser()
      .then(data => setUser(data))
      .catch(() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      });

    // Fetch user's own posts
    getPosts()
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logoutUser();
    } finally {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  const handleDelete = async (postId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
      return;
    }

    try {
      await deletePost(postId);
      // Refresh posts
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Terjadi kesalahan saat menghapus postingan');
    }
  };


  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => window.location.href = '/profile'}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
              >
                Profile
              </button>
              <button
                onClick={() => window.location.href = '/create'}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Buat Postingan
              </button>
              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-md flex items-center"
              >
                {logoutLoading ? (
                  <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {logoutLoading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {user && (
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg mb-6">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center space-x-4">
                  <Image
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                    src={user.avatar_url || 'https://via.placeholder.com/64?text=No+Avatar'}
                    alt="Avatar"
                  />
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Selamat datang, {user.name}!
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                      Email: {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Blog Posts
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Semua postingan blog dari semua pengguna.
              </p>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <li key={post.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {post.title}
                        </p>
                        <div className="ml-2 shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Published
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            {post.content.substring(0, 100)}...
                          </p>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                          <div className="flex items-center space-x-2">
                            <Image
                              width={24}
                              height={24}
                              className="h-6 w-6 rounded-full object-cover"
                              src={post.user.avatar_url || 'https://via.placeholder.com/24?text=No+Avatar'}
                              alt={post.user.name}
                            />
                            <span>By {post.user.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <p>
                              {new Date(post.created_at).toLocaleDateString()}
                            </p>
                            <button
                              onClick={() => window.location.href = `/create?id=${post.id}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li>
                  <div className="px-4 py-4 sm:px-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada postingan.</p>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}