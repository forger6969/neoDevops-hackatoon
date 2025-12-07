import React, { useState } from "react";
import { FiUser, FiHeart, FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const RizoHeader = () => {
  const navigate = useNavigate();
  const [openSelect, setOpenSelect] = useState(false);

  // E'lon qo'shish selectdan biror narsa tanlanganda
  const handleSelect = (type) => {
    setOpenSelect(false);
    navigate(`/create?type=${type}`);
  };

  return (
    <header className="w-full bg-[#002f33] py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 text-white">

        {/* LOGO */}
        <img
          src={logo}
          alt="logo"
          className="h-10 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-8 text-lg relative">

          {/* LANGUAGE */}
          <select className="bg-transparent border border-white px-2 py-1 rounded-md">
            <option className="text-black">O‘Z</option>
            <option className="text-black">Рус</option>
          </select>

          {/* FAVORITES */}
          <button
            onClick={() => navigate("/favorites")}
            className="flex items-center gap-2"
          >
            <FiHeart size={24} />
          </button>

          {/* PROFILE */}
          <button
            onClick={() => navigate("/auth")}
            className="flex items-center gap-2"
          >
            <FiUser size={24} />
            Profil
          </button>

          {/* ADD POST BUTTON */}
          <div className="relative">
            <button
              onClick={() => setOpenSelect(!openSelect)}
              className="flex items-center gap-2 bg-white text-[#002f33] px-4 py-2 rounded-lg font-semibold"
            >
              <FiPlusCircle size={22} />
              E'lon qo‘shish
            </button>

            {/* DROPDOWN SELECT */}
            {openSelect && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={() => handleSelect("found")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Topib oldim
                </button>

                <button
                  onClick={() => handleSelect("lost")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Yo‘qotib qo‘ydim
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default RizoHeader;
