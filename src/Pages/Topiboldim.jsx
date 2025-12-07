import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const TopibOldim = () => {
  const [form, setForm] = useState({
    type: "",
    color: "",
    lastSeenLocation: "",
    email: "",
    description: "",
    status: "found",
    image: null
  });

  const { t } = useTranslation();

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", form.type);
    formData.append("color", form.color);
    formData.append("lastSeenLocation", form.lastSeenLocation);
    formData.append("email", form.email);
    formData.append("description", form.description);
    formData.append("status", form.status);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const res = await axios.post("http://localhost:3001/pets", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("Успешно отправлено:", res.data);
      alert("E'lon muvaffaqiyatli joylandi!");
      setForm({
        type: "",
        color: "",
        lastSeenLocation: "",
        email: "",
        description: "",
        status: "found",
        image: null
      });
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi");
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">🐶 {t("findOption")}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          name="type"
          placeholder="Hayvon turi (it, mushuk...)"
          value={form.type}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="color"
          placeholder="Rangi"
          value={form.color}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="lastSeenLocation"
          placeholder="Qayerdan topding?"
          value={form.lastSeenLocation}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="email"
          placeholder="Telefon yoki email"
          value={form.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Qo‘shimcha ma'lumot..."
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded-lg h-28"
        />

        {/* Файл для изображения */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <button type="submit" className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
          E'lonni joylash
        </button>
      </form>
    </div>
  );
};

export default TopibOldim;
