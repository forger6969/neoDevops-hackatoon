import React, { useState, useEffect } from 'react';
import { Heart, Grid, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Pets = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pets from db.json
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://hakaton-api-2.onrender.com/api/pets');
        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }
        const data = await response.json();
        setPets(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching pets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const [favorites, setFavorites] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');

  // Get unique types from pets
  const types = [...new Set(pets.map(pet => pet.type))];

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('petFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('petFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (petId) => {
    const pet = pets.find(p => p._id === petId);
    if (!pet) return;

    const petFavorites = JSON.parse(localStorage.getItem(`petFavorites`)) || []
    petFavorites.push(pet)
    localStorage.setItem('petFavorites', JSON.stringify(petFavorites))

  };

  const getFilteredPets = () => {
    let filtered = pets;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(pet => pet.type === selectedType);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(pet => pet.status === selectedStatus);
    }

    // Filter by tab (all or favorites)
    if (activeTab === 'favorites') {
      filtered = favorites;
    }

    return filtered;
  };

  const filteredPets = getFilteredPets();

  const getTypeLabel = (type) => {
    const labels = {
      dog: { uz: 'Itlar', ru: 'Собаки' },
      cat: { uz: 'Mushuklar', ru: 'Кошки' },
      bird: { uz: 'Qushlar', ru: 'Птицы' }
    };
    return labels[type]?.[i18n.language] || type;
  };

  const handlePetClick = (petId) => {
    navigate(`/pets/${petId}`);
  };

  // Loading state
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

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{t('error') || 'Xatolik yuz berdi'}: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#002f33] text-white rounded-lg hover:bg-[#004044]"
          >
            {t('retry') || 'Qayta urinish'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t('filters')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('category')}</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002f33] focus:border-[#002f33]"
              >
                <option value="all">{t('allCategories')}</option>
                {types.map(type => (
                  <option key={type} value={type}>
                    {getTypeLabel(type)}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('status')}</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002f33] focus:border-[#002f33]"
              >
                <option value="all">{t('allStatuses')}</option>
                <option value="lost">{t('lost')}</option>
                <option value="found">{t('found')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${activeTab === 'all'
                ? 'border-[#002f33] text-[#002f33]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {t('allAnnouncements')}
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${activeTab === 'favorites'
                ? 'border-[#002f33] text-[#002f33]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {t('favorites')} ({favorites.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            {selectedType === 'all' ? t('allAnimals') : getTypeLabel(selectedType)}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{t('sort')}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="default">{t('selected')}</option>
              <option value="new">{t('newAnnouncements')}</option>
            </select>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#002f33] text-white' : 'bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#002f33] text-white' : 'bg-gray-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <h2 className="text-2xl font-bold mb-6">
          {t('foundResults', { count: filteredPets.length })}
        </h2>

        {/* Pet Cards Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredPets.map(pet => (
            <div
              key={pet._id}
              onClick={() => handlePetClick(pet._id)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative">
                <img
                  src={pet.images && pet.images.length > 0
                    ? `http://localhost:3001${pet.images[0]}`
                    : 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(pet._id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${favorites.find(fav => fav._id === pet._id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-600'
                      }`}
                  />
                </button>
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${pet.status === 'lost'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
                  }`}>
                  {pet.status === 'lost' ? t('lost') : t('found')}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{pet.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{getTypeLabel(pet.type)}</p>
                <p className="text-sm text-gray-600">{pet.lastSeenLocation}</p>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {activeTab === 'favorites'
                ? t('noFavorites')
                : t('noResults')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pets;