import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const TopibOldim = ({ ownerId }) => {
  const [form, setForm] = useState({
    title: "",
    type: "",
    name: "",
    color: "",
    lastSeenLocation: "",
    description: "",
    price: "",
    status: "sell",
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
    formData.append("title", form.title);
    formData.append("type", form.type);
    formData.append("name", form.name);
    formData.append("color", form.color);
    formData.append("lastSeenLocation", form.lastSeenLocation);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("status", form.status);
    formData.append("owner", ownerId); // передаём ID владельца
    if (form.image) formData.append("images", form.image); // backend ожидает массив, можно обработать как single file

    try {
      const res = await axios.post(
        "https://hakaton-api-2.onrender.com/post/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Успешно отправлено:", res.data);
      alert("E'lon muvaffaqiyatli joylandi!");
      setForm({
        title: "",
        type: "",
        name: "",
        color: "",
        lastSeenLocation: "",
        description: "",
        price: "",
        status: "sell",
        image: null
      });

      // Optional: postni localStorage ga saqlash
      const savedPosts = JSON.parse(localStorage.getItem("myPosts") || "[]");
      localStorage.setItem("myPosts", JSON.stringify([...savedPosts, res.data]));

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
          name="title"
          placeholder="E'lon sarlavhasi"
          value={form.title}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

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
          name="name"
          placeholder="Hayvon ismi"
          value={form.name}
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
          type="number"
          name="price"
          placeholder="Narxi (so'mda)"
          value={form.price}
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
