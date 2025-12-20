import React from 'react';
import {
    LuCalendar,
    LuFilter,
    LuLayers,
    LuSearch,
} from "react-icons/lu";

interface FilterBarProps {
    filters: {
        month: string | null;
        type: 'all' | 'income' | 'expense';
        category: string | null;
        search: string;
    };
    categories: string[];
    onChange: (filters: FilterBarProps['filters']) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, categories, onChange }) => {
    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-gray-100 shadow-sm w-full gap-4">

            {/* Sol Taraf */}
            <div className="flex items-center gap-3">

                {/* Tarih */}
                <div className="relative">
                    <LuCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="month"
                        value={filters.month ?? ''}
                        onChange={(e) =>
                            onChange({ ...filters, month: e.target.value || null })
                        }
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm font-bold cursor-pointer"
                    />
                </div>

                {/* Tür */}
                <select
                    value={filters.type}
                    onChange={(e) =>
                        onChange({ ...filters, type: e.target.value as any })
                    }
                    className="px-4 py-2 border border-gray-200 rounded-full text-sm font-bold cursor-pointer"
                >
                    <option value="all">Tür: Tümü</option>
                    <option value="income">Gelir</option>
                    <option value="expense">Gider</option>
                </select>

                {/* Kategori */}
                <select
                    value={filters.category ?? 'Tümü'}
                    onChange={(e) =>
                        onChange({
                            ...filters,
                            category: e.target.value === 'Tümü' ? null : e.target.value,
                        })
                    }
                    className="px-4 py-2 border border-gray-200 rounded-full text-sm font-bold cursor-pointer"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat === 'Tümü' ? 'Kategori: Tümü' : cat}
                        </option>
                    ))}
                </select>


            </div>

            {/* Sağ Taraf: Arama */}
            <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <LuSearch className="text-blue-500" size={20} />
                </div>
                <input
                    type="text"
                    value={filters.search}
                    onChange={(e) =>
                        onChange({ ...filters, search: e.target.value })
                    }
                    placeholder="Ara..."
                    className="w-full pl-12 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-full text-sm outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-gray-400 font-medium"
                />
            </div>

        </div>
    );
};

export default FilterBar;
