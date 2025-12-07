import React, { useState, useEffect } from "react";

const Yoqotibqoydim = () => {
  const [form, setForm] = useState({
    title: "",
    name: "",
    type: "",
    color: "",
    location: "",
    phone: "",
    description: "",
    status: "lost",
    price: 0
  });

  const [token, setToken] = useState(""); // login token  
  const [posts, setPosts] = useState([]);
  const API = "https://hakaton-api-2.onrender.com/api";

  // Login tokenni localStorage’dan olish
  useEffect(() => {
    const t = localStorage.getItem("token"); 
    if (t) setToken(t);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.location) {
      alert("Hayvon nomi va joyini kiriting!");
      return;
    }

    if (!token) {
      alert("Avval login qiling!");
      return;
    }

    const body = {
      title: form.title,
      name: form.name,
      type: form.type,
      color: form.color,
      lastSeenLocation: form.location,
      description: form.description,
      status: form.status,
      price: form.price
    };

    try {
      const res = await fetch(API + "/pets/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (res.ok) {
        alert("Post yaratildi!");
        setPosts([...posts, data]);
        setForm({
          title: "",
          name: "",
          type: "",
          color: "",
          location: "",
          phone: "",
          description: "",
          status: "lost",
          price: 0
        });
      } else {
        alert("Xato: " + (data.message || JSON.stringify(data)));
      }
    } catch (err) {
      alert("Server xatosi: " + err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">🐾 Yo'qotilgan Hayvonlar</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <input type="text" name="title" placeholder="Sarlavha" value={form.title} onChange={handleChange} className="border p-3 rounded-lg" />
        <input type="text" name="name" placeholder="Hayvon nomi" value={form.name} onChange={handleChange} className="border p-3 rounded-lg" />
        <input type="text" name="type" placeholder="Zoti" value={form.type} onChange={handleChange} className="border p-3 rounded-lg" />
        <input type="text" name="color" placeholder="Rangi" value={form.color} onChange={handleChange} className="border p-3 rounded-lg" />
        <input type="text" name="location" placeholder="Qayerda yo‘qotding?" value={form.location} onChange={handleChange} className="border p-3 rounded-lg" />
        <input type="text" name="phone" placeholder="Telefon raqam" value={form.phone} onChange={handleChange} className="border p-3 rounded-lg" />
        <textarea name="description" placeholder="Qo‘shimcha ma'lumot" value={form.description} onChange={handleChange} className="border p-3 rounded-lg h-28" />
        <select name="status" value={form.status} onChange={handleChange} className="border p-3 rounded-lg">
          <option value="lost">Lost</option>
          <option value="found">Found</option>
          <option value="sell">Sell</option>
        </select>
        {form.status === "sell" && (
          <input type="number" name="price" value={form.price} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Price" />
        )}
        <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">E'lonni joylash</button>
      </form>

      <div className="space-y-4">
        {posts.length === 0 && <p className="text-center text-gray-500">Hech qanday e'lon yo'q</p>}
        {posts.map(post => (
          <div key={post._id || post.id} className="border p-4 rounded-lg shadow flex flex-col gap-2">
            <h2 className="font-bold text-lg">{post.name} ({post.type})</h2>
            <p><strong>Rangi:</strong> {post.color}</p>
            <p><strong>Qayerda yo‘qotildi:</strong> {post.lastSeenLocation}</p>
            <p><strong>Telefon:</strong> {post.phone}</p>
            <p><strong>Izoh:</strong> {post.description}</p>
            <p><strong>Status:</strong> {post.status}</p>
            {post.status === "sell" && <p><strong>Price:</strong> {post.price}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Yoqotibqoydim;
