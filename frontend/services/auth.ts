const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  return data;
};

export const registerUser = async (name: string, email: string, password: string, password_confirmation: string) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ name, email, password, password_confirmation }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  return data;
};