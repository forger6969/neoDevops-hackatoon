import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const Auth = () => {
  const [step, setStep] = useState('login'); 
  const [loading, setLoading] = useState(false);

  // Login, register va reset formlari
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', surname: '', email: '', password: '' });
  const [resetForm, setResetForm] = useState({ email: '', code: '', newPassword: '' });
  const [codeSent, setCodeSent] = useState(false);

  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  const handleResetChange = (e) => setResetForm({ ...resetForm, [e.target.name]: e.target.value });

  // LOGIN
// LOGIN
const handleLoginSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, loginForm);

    // Token va user ma'lumotlarini olish
    const token = res.data.token;
    localStorage.setItem('token', token);

    // User ma'lumotlarini olish
    const userRes = await axios.get(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.setItem('user', JSON.stringify(userRes.data));

    alert('Login muvaffaqiyatli!');
    window.location.href = '/';
  } catch (err) {
    alert(err.response?.data?.message || 'Login xatosi');
  } finally {
    setLoading(false);
  }
};


  // REGISTER
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/auth/register`, registerForm);
      alert('Ro\'yxatdan o\'tish muvaffaqiyatli! Endi kirishingiz mumkin.');
      setStep('login');
    } catch (err) {
      alert(err.response?.data?.message || 'Register xatosi');
    } finally {
      setLoading(false);
    }
  };

  // SEND RESET CODE
  const sendResetCode = async () => {
    if (!resetForm.email) return alert('Email kiriting!');
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/send-code`, { email: resetForm.email });
      alert('Code emailingizga yuborildi!');
      setCodeSent(true);
      // Agar test uchun code frontendga avtomatik kelishi kerak bo‘lsa:
      // setResetForm(prev => ({ ...prev, code: res.data.code }));
    } catch (err) {
      alert(err.response?.data?.message || 'Code yuborishda xato');
    } finally {
      setLoading(false);
    }
  };

  // RESET PASSWORD
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/auth/reset-password`, {
        email: resetForm.email,
        code: resetForm.code,
        newPassword: resetForm.newPassword
      });
      alert('Parol muvaffaqiyatli o‘zgartirildi!');
      setStep('login');
      setResetForm({ email: '', code: '', newPassword: '' });
      setCodeSent(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Reset xatosi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-teal-600 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-8">

        {/* Step toggle */}
        <div className="flex mb-6">
          <button
            onClick={() => setStep('login')}
            className={`flex-1 py-3 font-semibold ${step === 'login' ? 'bg-teal-900 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Kirish
          </button>
          <button
            onClick={() => setStep('register')}
            className={`flex-1 py-3 font-semibold ${step === 'register' ? 'bg-teal-900 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Ro'yxatdan o'tish
          </button>
          <button
            onClick={() => setStep('reset')}
            className={`flex-1 py-3 font-semibold ${step === 'reset' ? 'bg-teal-900 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Reset parol
          </button>
        </div>

        {/* LOGIN FORM */}
        {step === 'login' && (
          <form className="space-y-5" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={handleLoginChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Parol"
              value={loginForm.password}
              onChange={handleLoginChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
              required
            />
            <button type="submit" disabled={loading} className="w-full bg-teal-900 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition">
              {loading ? 'Yuklanmoqda...' : 'Kirish'}
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {step === 'register' && (
          <form className="space-y-5" onSubmit={handleRegisterSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Ism"
              value={registerForm.name}
              onChange={handleRegisterChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
              required
            />
            <input
              type="text"
              name="surname"
              placeholder="Familiya"
              value={registerForm.surname}
              onChange={handleRegisterChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Parol"
              value={registerForm.password}
              onChange={handleRegisterChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
              required
            />
            <button type="submit" disabled={loading} className="w-full bg-teal-900 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition">
              {loading ? 'Yuklanmoqda...' : 'Ro\'yxatdan o\'tish'}
            </button>
          </form>
        )}

        {/* RESET PASSWORD FORM */}
        {step === 'reset' && (
          <form className="space-y-5" onSubmit={handleResetSubmit}>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={resetForm.email}
                onChange={handleResetChange}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
                required
              />
              <button type="button" onClick={sendResetCode} disabled={loading} className="bg-teal-900 text-white px-4 rounded-lg hover:bg-teal-800 transition">
                {loading ? 'Yuklanmoqda...' : 'Send Code'}
              </button>
            </div>
            <input
              type="text"
              name="code"
              placeholder="Code"
              value={resetForm.code}
              onChange={handleResetChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
              required
            />
            <input
              type="password"
              name="newPassword"
              placeholder="Yangi parol"
              value={resetForm.newPassword}
              onChange={handleResetChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
              required
            />
            <button type="submit" disabled={loading} className="w-full bg-teal-900 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition">
              {loading ? 'Yuklanmoqda...' : 'Parolni tiklash'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default Auth;
