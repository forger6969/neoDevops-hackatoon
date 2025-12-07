import React from "react";
import { FiMapPin, FiBriefcase, FiClock, FiHeart } from "react-icons/fi";

const ForgerFavorites = () => {
    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Заголовок и кнопка */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Избранные объявления</h2>
                <button className="px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-100 transition">
                    Очистить избранные
                </button>
            </div>

            {/* Таб меню */}
            <div className="flex gap-6 border-b border-gray-300 mb-6 text-gray-600">
                <button className="pb-2 border-b-2 border-blue-900 font-medium text-blue-900">
                    Избранные объявления (1/150)
                </button>
                <button className="pb-2 hover:text-gray-900 transition">
                    Сохраненные поиски (0/50)
                </button>
                <button className="pb-2 hover:text-gray-900 transition">
                    Недавно просмотренные
                </button>
            </div>

            {/* Вид списка */}
            <div className="flex justify-end mb-4 text-gray-500 gap-2">
                <span>Вид списка:</span>
                <button className="p-1 hover:text-gray-800">
                    {/* иконка списка */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <button className="p-1 hover:text-gray-800">
                    {/* иконка сетки */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 4h8v8H4V4zm10 0h8v8h-8V4zm-10 10h8v8H4v-8zm10 0h8v8h-8v-8z" />
                    </svg>
                </button>
            </div>

            {/* Карточки объявлений */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition relative">
                    {/* Иконка избранного */}
                    <FiHeart className="absolute top-4 right-4 text-gray-800 cursor-pointer" size={20} />

                    <h3 className="font-semibold text-gray-800 mb-2">
                        Kuryerlarga Dostavkada Zo'r Ish bor - Qulay va Foydali shartlarda!
                    </h3>

                    {/* Информация */}
                    <div className="text-gray-600 text-sm space-y-1 mb-4">
                        <div className="flex items-center gap-2">
                            <span>💰</span> 7 000 000 - 9 000 000 сум
                        </div>
                        <div className="flex items-center gap-2">
                            <FiMapPin /> Бухара
                        </div>
                        <div className="flex items-center gap-2">
                            <FiBriefcase /> Постоянная работа
                        </div>
                        <div className="flex items-center gap-2">
                            <FiClock /> Неполная занятость
                        </div>
                    </div>

                    <p className="text-gray-400 text-xs">05 декабря 2025 г.</p>
                </div>

                {/* Можно дублировать карточку для примера */}
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition relative">
                    <FiHeart className="absolute top-4 right-4 text-gray-800 cursor-pointer" size={20} />
                    <h3 className="font-semibold text-gray-800 mb-2">
                        Пример объявления №2
                    </h3>
                    <div className="text-gray-600 text-sm space-y-1 mb-4">
                        <div className="flex items-center gap-2">💰 5 000 000 - 7 000 000 сум</div>
                        <div className="flex items-center gap-2"><FiMapPin /> Ташкент</div>
                        <div className="flex items-center gap-2"><FiBriefcase /> Временная работа</div>
                        <div className="flex items-center gap-2"><FiClock /> Полная занятость</div>
                    </div>
                    <p className="text-gray-400 text-xs">06 декабря 2025 г.</p>
                </div>
            </div>
        </div>
    );
};

export default ForgerFavorites;
