import React from "react";
import { FiUser, FiPlusCircle } from "react-icons/fi";
import logo from "../assets/logo.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Rizoheader = () => {

  const { i18n, t } = useTranslation()

  return (
    <header className="w-full bg-[#002f33] py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Link to="/">
            <img src={logo} alt="logo" className="h-[100px] h-[100px]" />
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-8 text-white text-lg">

          {/* LANGUAGE SELECT */}
          <select
            className="bg-transparent border border-white text-white px-2 py-1 rounded-md outline-none cursor-pointer"
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language} // чтобы select знал текущий язык
          >
            <option value="uz" className="text-black">O‘Z</option>
            <option value="ru" className="text-black">Рус</option>
          </select>

          {/* PROFILE */}
          <button className="flex items-center gap-2">
            <FiUser size={22} />
            <span>{t("profilItem")}</span>
          </button>

          {/* ADD POST BUTTON */}
          <button className="flex items-center gap-2 bg-white text-[#002f33] px-4 py-2 rounded-lg font-semibold">
            <FiPlusCircle size={22} />
            {t("postItem")}
          </button>

        </div>

      </div>
    </header>
  );
};

export default Rizoheader;
