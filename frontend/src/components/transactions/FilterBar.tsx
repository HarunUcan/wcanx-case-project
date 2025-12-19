import React from 'react';
import {
    LuCalendar,
    LuFilter,
    LuLayers,
    LuSearch,
    LuChevronDown
} from "react-icons/lu";

const FilterBar: React.FC = () => {
    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-gray-100 shadow-sm w-full gap-4">

            {/* Sol Taraf: Filtreler */}
            <div className="flex items-center gap-3">

                {/* Tarih Filtresi */}
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors cursor-pointer group">
                    <LuCalendar className="text-gray-400 group-hover:text-blue-500" size={18} />
                    <span className="text-sm font-bold text-gray-700">Ekim 2023</span>
                    <LuChevronDown className="text-gray-400" size={16} />
                </button>

                {/* Tür Filtresi */}
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors cursor-pointer group">
                    <LuFilter className="text-gray-400 group-hover:text-blue-500" size={18} />
                    <span className="text-sm font-bold text-gray-700 whitespace-nowrap">Tür: Tümü</span>
                    <LuChevronDown className="text-gray-400" size={16} />
                </button>

                {/* Kategori Filtresi */}
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors cursor-pointer group">
                    <LuLayers className="text-gray-400 group-hover:text-blue-500" size={18} />
                    <span className="text-sm font-bold text-gray-700 whitespace-nowrap">Kategori: Tümü</span>
                    <LuChevronDown className="text-gray-400" size={16} />
                </button>

            </div>

            {/* Sağ Taraf: Arama Inputu */}
            <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <LuSearch className="text-blue-500" size={20} />
                </div>
                <input
                    type="text"
                    placeholder="Ara..."
                    className="w-full pl-12 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-full text-sm outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-gray-400 font-medium"
                />
            </div>

        </div>
    );
};

export default FilterBar;