import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const YoqotibQoydim = () => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    color: "",
    location: "",
    phone: "",
    description: ""
  });

  const { t } = useTranslation()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Yoqotilgan hayvon:", form);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">🐾 {t("lostOption")}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          name="name"
          placeholder="Hayvon nomi (mushuk, it...)"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="type"
          placeholder="Zoti (agar bilsang)"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="color"
          placeholder="Rangi"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="location"
          placeholder="Qayerda yo‘qotding?"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="phone"
          placeholder="Telefon raqaming"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Qo‘shimcha ma'lumot..."
          onChange={handleChange}
          className="border p-3 rounded-lg h-28"
        />

        <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          E'lonni joylash
        </button>
      </form>
    </div>
  );
};

export default YoqotibQoydim;
