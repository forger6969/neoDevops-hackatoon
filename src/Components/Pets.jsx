import React, { useState, useEffect } from 'react';
import { Heart, Grid, List } from 'lucide-react';

const Pets = () => {
  const initialPets = [
    {
      id: 1,
      name: "Mila",
      type: "cat",
      category: "Mushuklar",
      status: "lost",
      price: "1200000",
      location: "Chilonzor",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Barsik",
      type: "cat",
      category: "Mushuklar",
      status: "found",
      price: "800000",
      location: "Yunusobod",
      image: "https://images.unsplash.com/photo-1573865526739-10c1de0ad0ac?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Sharik",
      type: "dog",
      category: "Itlar",
      status: "lost",
      price: "1500000",
      location: "Sergeli",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Rex",
      type: "dog",
      category: "Itlar",
      status: "found",
      price: "2000000",
      location: "Mirobod",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Polly",
      type: "parrot",
      category: "Qushlar",
      status: "lost",
      price: "500000",
      location: "Olmazor",
      image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Tweety",
      type: "parrot",
      category: "Qushlar",
      status: "found",
      price: "600000",
      location: "Yakkasaroy",
      image: "https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=400&h=300&fit=crop"
    }
  ];

  const [pets, setPets] = useState(initialPets);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Hamma e\'lonlar');
  const [selectedPrice, setSelectedPrice] = useState('dan');
  const [selectedStatus, setSelectedStatus] = useState('gacha');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('Tanlangan');

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
    setFavorites(prev => {
      if (prev.includes(petId)) {
        return prev.filter(id => id !== petId);
      } else {
        return [...prev, petId];
      }
    });
  };

  const getFilteredPets = () => {
    let filtered = pets;

    // Filter by category
    if (selectedCategory !== 'Hamma e\'lonlar') {
      filtered = filtered.filter(pet => pet.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'gacha') {
      filtered = filtered.filter(pet => pet.status === selectedStatus);
    }

    // Filter by tab (all or favorites)
    if (activeTab === 'favorites') {
      filtered = filtered.filter(pet => favorites.includes(pet.id));
    }

    return filtered;
  };

  const filteredPets = getFilteredPets();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Filtrlar</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rukn</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Hamma e'lonlar</option>
                <option>Mushuklar</option>
                <option>Itlar</option>
                <option>Qushlar</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Narx</label>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>dan</option>
                <option>500000</option>
                <option>1000000</option>
                <option>1500000</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zoti</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="lost">Yo'qolgan</option>
                <option value="found">Topilgan</option>
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
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Hamma e'lonlar
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'favorites'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Sevimlilar ({favorites.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Mushuklar savdosi
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Saralash:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option>Tanlangan</option>
              <option>Narx bo'yicha</option>
              <option>Yangi e'lonlar</option>
            </select>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100' : 'bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100' : 'bg-gray-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
            <span className="text-sm text-gray-600">valyuta: so'm</span>
          </div>
        </div>

        {/* Results Count */}
        <h2 className="text-2xl font-bold mb-6">
          Biz {filteredPets.length.toLocaleString()} ta e'lon topdik
        </h2>

        {/* Pet Cards Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredPets.map(pet => (
            <div
              key={pet.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(pet.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(pet.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                  pet.status === 'lost'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {pet.status === 'lost' ? "Yo'qolgan" : 'Topilgan'}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{pet.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{pet.location}</p>
                <p className="text-xl font-bold text-blue-600">
                  {parseInt(pet.price).toLocaleString()} so'm
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {activeTab === 'favorites'
                ? "Hali sevimlilar ro'yxati bo'sh"
                : "Hech qanday e'lon topilmadi"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pets;