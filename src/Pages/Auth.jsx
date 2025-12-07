import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', loginForm);
    // Bu yerda API ga so'rov yuboriladi
    // Muvaffaqiyatli bo'lsa:
    // window.location.href = '/';
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Parollar mos kelmadi!');
      return;
    }
    console.log('Register:', registerForm);
    // Bu yerda API ga so'rov yuboriladi
    // Muvaffaqiyatli bo'lsa:
    // setIsLogin(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-teal-600 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Toggle Buttons */}
        <div className="flex">
          <button
            onClick={() => setIsLogin(true)}
            style={{ backgroundColor: isLogin ? '#002f33' : '#f3f4f6' }}
            className={`flex-1 py-4 font-semibold text-lg transition-all ${
              isLogin
                ? 'text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Kirish
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{ backgroundColor: !isLogin ? '#002f33' : '#f3f4f6' }}
            className={`flex-1 py-4 font-semibold text-lg transition-all ${
              !isLogin
                ? 'text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Ro'yxatdan o'tish
          </button>
        </div>

        {/* Forms */}
        <div className="p-8">
          {isLogin ? (
            // LOGIN FORM
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                Xush kelibsiz!
              </h2>

              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  style={{ borderColor: '#d1d5db' }}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  onFocus={(e) => e.target.style.ringColor = '#002f33'}
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="password"
                  placeholder="Parol"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  style={{ borderColor: '#d1d5db' }}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  onFocus={(e) => e.target.style.ringColor = '#002f33'}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-600">Eslab qolish</span>
                </label>
                <a href="#" style={{ color: '#002f33' }} className="hover:underline">
                  Parolni unutdingizmi?
                </a>
              </div>

              <button
                onClick={handleLoginSubmit}
                style={{ backgroundColor: '#002f33' }}
                className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
              >
                Kirish
              </button>
            </div>
          ) : (
            // REGISTER FORM
            <div className="space-y-5">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
                Ro'yxatdan o'ting
              </h2>

              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder="Ism va familiya"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon raqam (+998...)"
                  value={registerForm.phone}
                  onChange={handleRegisterChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="password"
                  placeholder="Parol"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Parolni tasdiqlang"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900 focus:border-transparent"
                />
              </div>

              <label className="flex items-start text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="mr-2 mt-1" />
                <span>
                  Men <a href="#" className="text-teal-900 hover:underline">foydalanish shartlari</a> va{' '}
                  <a href="#" className="text-teal-900 hover:underline">maxfiylik siyosati</a> bilan tanishdim
                </span>
              </label>

              <button
                onClick={handleRegisterSubmit}
                className="w-full bg-teal-900 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition-colors"
              >
                Ro'yxatdan o'tish
              </button>
            </div>
          )}

          {/* Social Login (Optional) */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">yoki</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>

              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-medium">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;