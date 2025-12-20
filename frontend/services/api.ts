const API_BASE_URL = 'http://localhost:8000/api';

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