import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="w-full bg-[#002f33] py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* ---- LOGO ---- */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={logo} alt="logo" className="h-10" />
        </div>

        {/* ---- NAV ---- */}
        <div className="flex items-center gap-8 text-white text-lg">

          <button className="flex items-center gap-2">
            <span>💬</span> <span>Chat</span>
          </button>

          <div className="flex items-center gap-2">
            <span>O‘Z</span> | <span>Рус</span>
          </div>

          <button className="text-2xl">♡</button>
          <button className="text-2xl">🔔</button>

          <button className="flex items-center gap-2">
            <span className="text-2xl">👤</span>
            <span>Profil</span>
          </button>

          <button className="bg-white text-[#002f33] px-4 py-2 rounded-lg font-semibold">
            E'lon qo‘shish
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
