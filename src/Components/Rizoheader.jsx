import React, { useState } from "react";
import { FiUser, FiHeart, FiPlusCircle } from "react-icons/fi";
import { Link, useNavigate, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { useTranslation } from "react-i18next";

const RizoHeader = () => {
  const navigate = useNavigate();
  const [openSelect, setOpenSelect] = useState(false);
  const { i18n, t } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <header className="w-full bg-[#002f33] py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 text-white">

          {/* LOGO */}
          <img
            src={logo}
            alt="logo"
            className="h-20 cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-8 text-lg relative">

            {/* LANGUAGE */}
            <select
              className="bg-transparent border border-white px-2 py-1 rounded-md text-black cursor-pointer"
              value={i18n.language}
              onChange={changeLanguage}
            >
              <option value="uz">O‘Z</option>
              <option value="ru">Рус</option>
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
              {t("profilItem")}
            </button>

            {/* ADD POST BUTTON */}
            <div className="relative">
              <button
                onClick={() => setOpenSelect(!openSelect)}
                className="flex items-center gap-2 bg-white text-[#002f33] px-4 py-2 rounded-lg font-semibold"
              >
                <FiPlusCircle size={22} />
                {t("postItem")}
              </button>

              {/* DROPDOWN SELECT */}
              {openSelect && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow-lg overflow-hidden">
                  <Link
                    to="/topiboldim"
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpenSelect(false)}
                  >
                    Topib oldim
                  </Link>

                  <Link
                    to="/yoqotibqoydim"
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpenSelect(false)}
                  >
                    Yo‘qotib qo‘ydim
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ROUTE CONTENT */}
      <main className="max-w-7xl mx-auto px-6 mt-6">
        <Outlet />
      </main>
    </>
  );
};

export default RizoHeader;
