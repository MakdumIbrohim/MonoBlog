import { useState } from 'react';
import { registerUser } from '../services/auth';
import { useToast } from '../app/components/ToastContext';

export const useRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('Password tidak cocok', 'error');
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser(name, email, password, confirmPassword);
      localStorage.setItem('token', data.token);
      showToast('Registrasi berhasil!', 'success');
      window.location.href = '/blogs';
    } catch (error) {
      console.error('Register error:', error);
      showToast(error instanceof Error ? error.message : 'Terjadi kesalahan saat registrasi', 'error');
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