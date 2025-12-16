'use client';

import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user: User;
}

export default function Blogs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:8000/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(() => localStorage.removeItem('token'));
    }

    fetch('http://localhost:8000/api/posts/public')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MonoBlog</h1>
            <div className="flex space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700 dark:text-gray-300">Halo, {user.name}</span>
                  <button
                    onClick={() => window.location.href = '/dashboard'}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => window.location.href = '/create'}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  >
                    Buat Postingan
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => window.location.href = '/login'}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => window.location.href = '/register'}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  >
                    Daftar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Blog Posts</h1>
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  By {post.user.name} on {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
              </article>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}