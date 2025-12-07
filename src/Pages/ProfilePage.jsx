import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiMail, FiPhone, FiFileText } from "react-icons/fi";

const BASE_URL = "https://hakaton-api-2.onrender.com/api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [postsCount, setPostsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Login qilishingiz kerak!");
      window.location.href = "/auth"; // login sahifasiga redirect
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        // 1. Foydalanuvchi malumotlarini olish
        const userRes = await axios.get(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        // 2. Foydalanuvchining postlarini olish
        const postsRes = await axios.get(`${BASE_URL}/post/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPostsCount(postsRes.data.length);
      } catch (err) {
        console.error(err);
        alert("Profile malumotlarini olishda xato yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <div className="flex justify-center items-center h-screen text-teal-900 font-bold">Yuklanmoqda...</div>;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-teal-600 flex justify-center items-center px-4 py-8">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-teal-900 text-center">Profil</h1>

        <div className="flex items-center gap-4">
          <FiUser size={30} className="text-teal-900" />
          <div>
            <p className="font-semibold text-gray-700">Ism</p>
            <p className="text-gray-500">{user.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <FiMail size={30} className="text-teal-900" />
          <div>
            <p className="font-semibold text-gray-700">Email</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <FiPhone size={30} className="text-teal-900" />
          <div>
            <p className="font-semibold text-gray-700">Telefon</p>
            <p className="text-gray-500">{user.phone || "Mavjud emas"}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <FiFileText size={30} className="text-teal-900" />
          <div>
            <p className="font-semibold text-gray-700">Postlar soni</p>
            <p className="text-gray-500">{postsCount}</p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/auth";
          }}
          className="w-full bg-teal-900 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition"
        >
          Chiqish
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
