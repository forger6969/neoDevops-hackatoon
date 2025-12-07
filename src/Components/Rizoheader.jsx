import React from "react";
import { FiUser, FiPlusCircle } from "react-icons/fi";
import logo from "../assets/logo.png";

const Rizoheader = () => {
  return (
    <header className="w-full bg-[#002f33] py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={logo} alt="logo" className="h-[100px] h-[100px]" />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-8 text-white text-lg">

          {/* LANGUAGE SELECT */}
          <select
            className="bg-transparent border border-white text-white px-2 py-1 rounded-md outline-none cursor-pointer"
          >
            <option value="oz" className="text-black">O‘Z</option>
            <option value="ru" className="text-black">Рус</option>
          </select>

          {/* PROFILE */}
          <button className="flex items-center gap-2">
            <FiUser size={22} />
            <span>Profil</span>
          </button>

          {/* ADD POST BUTTON */}
          <button className="flex items-center gap-2 bg-white text-[#002f33] px-4 py-2 rounded-lg font-semibold">
            <FiPlusCircle size={22} />
            E'lon qo‘shish
          </button>

        </div>

      </div>
    </header>
  );
};

export default Rizoheader;
