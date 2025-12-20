const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
};

export const getUser = async () => {
  const response = await fetch(`${API_BASE_URL}/user`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user');
  }
  return data;
};

export const getPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch posts');
  }
  return data || [];
};

export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Logout failed');
  }
};

export const deletePost = async (postId: number) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to delete post');
  }
};

export const getPublicPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts/public`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch public posts');
  }
  return data;
};

export const getPost = async (postId: number) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch post');
  }
  return data;
};

export const createPost = async (title: string, content: string) => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, content }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create post');
  }
  return data;
};

export const updatePost = async (postId: number, title: string, content: string) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, content }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update post');
  }
  return data;
};

export const updateProfile = async (name: string, email: string) => {
  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, email }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update profile');
  }
  return data;
};

export const updateAvatar = async (avatar: File) => {
  const formData = new FormData();
  formData.append('avatar', avatar);
  const response = await fetch(`${API_BASE_URL}/user/avatar`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update avatar');
  }
  return data;
};