import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("Login qilishingiz kerak!");
      window.location.href = "/auth";
      return;
    }
    setUser(JSON.parse(userData));
  }, []);

  if (!user) return <div className="flex justify-center items-center h-screen">Yuklanmoqda...</div>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-8">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Profil</h1>

        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700">Ism:</span>
          <span className="text-gray-500">{user.name} {user.surname}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-500">{user.email}</span>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
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
