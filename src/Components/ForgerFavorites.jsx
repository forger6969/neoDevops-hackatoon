import React, { useState, useEffect } from "react";
import { FiMapPin, FiBriefcase, FiClock, FiHeart } from "react-icons/fi";
import axios from "axios";

const ForgerFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "https://hakaton-api-2.onrender.com/api";

  // GET favorites from server or localStorage
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        // Agar serverdan olish kerak bo‘lsa
        // const response = await axios.get(`${BASE_URL}/favorites`);
        // setFavorites(response.data);

        // Hozir localStorage orqali olish
        const savedFavorites = localStorage.getItem("petBasket");
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const clearFavorites = () => {
    localStorage.removeItem("petFavorites");
    setFavorites([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Заголовок и кнопка */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Избранные объявления
        </h2>
        <button
          onClick={clearFavorites}
          className="px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-100 transition"
        >
          Очистить избранные
        </button>
      </div>

      {/* Карточки объявлений */}
      {favorites.length === 0 ? (
        <p className="text-gray-500">У вас пока нет избранных объявлений.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favorites.map((pet) => (
            <div
              key={pet._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition relative"
            >
              <FiHeart
                className="absolute top-4 right-4 text-red-500 cursor-pointer"
                size={20}
                onClick={() => {
                  const updated = favorites.filter((f) => f._id !== pet._id);
                  setFavorites(updated);
                  localStorage.setItem("petFavorites", JSON.stringify(updated));
                }}
              />

              <h3 className="font-semibold text-gray-800 mb-2">{pet.title}</h3>

              <div className="text-gray-600 text-sm space-y-1 mb-4">
                <div className="flex items-center gap-2">
                  💰 {pet.salary || "Ma'lumot yo'q"}
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin /> {pet.lastSeenLocation || "Joylashuv yo'q"}
                </div>
                <div className="flex items-center gap-2">
                  <FiBriefcase /> {pet.type || "Turi yo'q"}
                </div>
                <div className="flex items-center gap-2">
                  <FiClock /> {pet.status || "Status yo'q"}
                </div>
              </div>

              <p className="text-gray-400 text-xs">
                {new Date(pet.createdAt).toLocaleDateString("ru-RU")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForgerFavorites;
