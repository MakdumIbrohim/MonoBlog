import { useState } from 'react';
import { registerUser } from '../services/auth';

export const useRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password tidak cocok');
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser(name, email, password, confirmPassword);
      localStorage.setItem('token', data.token);
      alert('Registrasi berhasil!');
      window.location.href = '/blogs';
    } catch (error) {
      console.error('Register error:', error);
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan saat registrasi');
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    handleSubmit,
  };
};