import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const YoqotibQoydim = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    type: "",
    color: "",
    location: "",
    phone: "",
    description: "",
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Token olish
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Iltimos, avval login qiling!");
      return;
    }

    // FormData yaratish
    const formData = new FormData();
    for (let key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }

    try {
      const res = await axios.post(
        "https://hakaton-api-2.onrender.com/api/post/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}` // Token bilan yuborish
          }
        }
      );

      alert("E'lon muvaffaqiyatli joylandi!");
      console.log("Yoqotilgan hayvon:", res.data);

      // Formni tozalash
      setForm({
        name: "",
        type: "",
        color: "",
        location: "",
        phone: "",
        description: "",
        image: null
      });

      // Postni localStorage ga saqlash
      const savedPosts = JSON.parse(localStorage.getItem("lostPosts") || "[]");
      localStorage.setItem("lostPosts", JSON.stringify([...savedPosts, res.data]));

    } catch (err) {
      console.error("Xatolik yuz berdi:", err.response?.data || err);
      alert(err.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">🐾 {t("lostOption")}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Hayvon nomi (mushuk, it...)" value={form.name} onChange={handleChange} className="border p-3 rounded-lg" />
        <input type="text" name="type" placeholder="Zoti (agar bilsang)" value={form.type} onChange={handleChange} className="border p-3 rounded-lg" />
        <input type="text" name="color" placeholder="Rangi" value={form.color} onChange={handleChange} className="border p-3 rounded-lg" />
        <input type="text" name="location" placeholder="Qayerda yo‘qotding?" value={form.location} onChange={handleChange} className="border p-3 rounded-lg" />
        <input type="text" name="phone" placeholder="Telefon raqaming" value={form.phone} onChange={handleChange} className="border p-3 rounded-lg" />
        <textarea name="description" placeholder="Qo‘shimcha ma'lumot..." value={form.description} onChange={handleChange} className="border p-3 rounded-lg h-28" />
        <input type="file" name="image" accept="image/*" onChange={handleChange} className="border p-3 rounded-lg" />

        <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          E'lonni joylash
        </button>
      </form>
    </div>
  );
};

export default YoqotibQoydim;
