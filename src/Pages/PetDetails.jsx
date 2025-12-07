import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

const PetDetails = () => {
  const { t, i18n } = useTranslation();
  const { petId } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const BASE_URL = 'https://hakaton-api-2.onrender.com/api'; // Render server URL

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/pets`); // Render URL ishlatildi
        const pets = res.data;

        const foundPet = pets.find(p => p._id === petId);
        if (!foundPet) {
          throw new Error('Pet not found');
        }
        setPet(foundPet);
      } catch (err) {
        console.error('Error fetching pet:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [petId]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('petFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('petFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // toggleFavorite
  const toggleFavorite = (pet) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav._id === pet._id);
      if (exists) {
        return prev.filter(fav => fav._id !== pet._id);
      } else {
        return [...prev, pet]; // object saqlash
      }
    });
  };

  const getTypeLabel = (type) => {
    const labels = {
      dog: { uz: 'It', ru: 'Собака' },
      cat: { uz: 'Mushuk', ru: 'Кошка' },
      bird: { uz: 'Qush', ru: 'Птица' }
    };
    return labels[type]?.[i18n.language] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002f33] mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loading') || 'Yuklanmoqda...'}</p>
        </div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{t('error') || 'Xatolik yuz berdi'}: {error || 'Pet not found'}</p>
          <button
            onClick={() => navigate('/pets')}
            className="px-4 py-2 bg-[#002f33] text-white rounded-lg hover:bg-[#004044]"
          >
            {t('backToList') || 'Ro\'yxatga qaytish'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/pets')}
            className="flex items-center gap-2 text-[#002f33] hover:text-[#004044] font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('backToList') || 'Ro\'yxatga qaytish'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={pet.images && pet.images.length > 0
                ? `${BASE_URL}${pet.images[0]}` // Render server bilan to'g'rilandi
                : 'https://via.placeholder.com/800x400?text=No+Image'}
              alt={pet.name}
              className="w-full h-96 object-cover"
            />
            <span className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium ${pet.status === 'lost'
              ? 'bg-red-100 text-red-800'
              : 'bg-green-100 text-green-800'
              }`}>
              {pet.status === 'lost' ? t('lost') : t('found')}
            </span>
            <button
              onClick={() => toggleFavorite(pet)}
              className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <Heart
                className={`w-6 h-6 ${favorites.find(fav => fav._id === pet._id)
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600'
                  }`}
              />
            </button>
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-[#002f33]">{pet.title}</h1>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t('name') || 'Ism'}</p>
                <p className="font-semibold text-lg">{pet.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t('type') || 'Turi'}</p>
                <p className="font-semibold text-lg">{getTypeLabel(pet.type)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t('color') || 'Rang'}</p>
                <p className="font-semibold text-lg">{pet.color}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t('location') || 'Joylashuv'}</p>
                <p className="font-semibold text-lg">{pet.lastSeenLocation}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-[#002f33]">{t('description') || 'Ta\'rif'}</h3>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{pet.description}</p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-[#002f33]">{t('ownerInfo') || 'Egasi haqida'}</h3>
              <div className="bg-[#002f33] text-white rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-300 text-sm mb-1">{t('ownerName') || 'Ism'}</p>
                    <p className="font-medium text-lg">{pet.owner.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Email</p>
                    <p className="font-medium text-lg">{pet.owner.email}</p>
                  </div>
                </div>
                <a href={`mailto:${pet.owner.email}`}>
                  <button className="mt-6 mx-auto justify-center flex py-2  bg-white text-[#002f33] px-6  rounded-lg font-semibold hover:bg-gray-100 transition">
                    {t('contactOwner') || 'Egasi bilan bog\'lanish'}
                  </button>
                </a>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500 text-center">
              {t('published') || 'E\'lon qilingan'}: {new Date(pet.createdAt).toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'uz-UZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
