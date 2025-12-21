import React from 'react';
import {
    LuCalendar,
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
        /* CONTAINER:
           2xl:p-6 -> İç boşluk artırıldı.
           2xl:rounded-[2rem] -> Köşeler daha fazla yuvarlandı.
           2xl:gap-8 -> Sağ ve sol blok arası mesafe açıldı.
        */
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between bg-white dark:bg-gray-800 p-4 2xl:p-6 rounded-3xl 2xl:rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm w-full gap-4 2xl:gap-8 transition-colors duration-300">

            {/* SOL TARAF (FİLTRELER):
               2xl:gap-6 -> Filtre elemanları arası boşluk artırıldı.
            */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 2xl:gap-6 w-full lg:w-auto lg:flex lg:items-center">

                {/* TARİH */}
                <div className="relative w-full lg:w-auto">
                    {/* İkon: size prop yerine class kullanıldı. 2xl'de büyüyor (24px) */}
                    <LuCalendar className="absolute left-4 2xl:left-6 top-1/2 -translate-y-1/2 text-gray-400 w-[18px] h-[18px] 2xl:w-6 2xl:h-6" />

                    <input
                        type="month"
                        value={filters.month ?? ''}
                        onChange={(e) =>
                            onChange({ ...filters, month: e.target.value || null })
                        }
                        /* Input Stilleri:
                           2xl:py-3.5 -> Yükseklik artırıldı.
                           2xl:pl-14 -> İkon büyüdüğü için soldan boşluk artırıldı.
                           2xl:pr-6 -> Sağ boşluk artırıldı.
                           2xl:text-lg -> Yazı büyütüldü.
                        */
                        className="w-full lg:w-auto pl-10 2xl:pl-14 pr-4 2xl:pr-6 py-2 2xl:py-3.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full text-sm 2xl:text-lg font-bold cursor-pointer outline-none focus:border-green-400 transition-colors"
                    />
                </div>

                {/* TÜR SEÇİMİ */}
                <select
                    value={filters.type}
                    onChange={(e) =>
                        onChange({ ...filters, type: e.target.value as any })
                    }
                    /* Select Stilleri:
                       2xl:px-8 -> Yan boşluklar genişletildi.
                       2xl:py-3.5 -> Yükseklik artırıldı.
                       2xl:text-lg -> Yazı büyütüldü.
                    */
                    className="w-full lg:w-auto px-4 2xl:px-8 py-2 2xl:py-3.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full text-sm 2xl:text-lg font-bold cursor-pointer outline-none focus:border-green-400 transition-colors appearance-none"
                >
                    <option value="all">Tür: Tümü</option>
                    <option value="income">Gelir</option>
                    <option value="expense">Gider</option>
                </select>

                {/* KATEGORİ SEÇİMİ */}
                <select
                    value={filters.category ?? 'Tümü'}
                    onChange={(e) =>
                        onChange({
                            ...filters,
                            category: e.target.value === 'Tümü' ? null : e.target.value,
                        })
                    }
                    className="w-full lg:w-auto px-4 2xl:px-8 py-2 2xl:py-3.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full text-sm 2xl:text-lg font-bold cursor-pointer outline-none focus:border-green-400 transition-colors appearance-none"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat === 'Tümü' ? 'Kategori: Tümü' : cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* SAĞ TARAF: ARAMA */}
            <div className="relative w-full lg:w-auto lg:flex-1 lg:max-w-md 2xl:max-w-xl">
                <div className="absolute inset-y-0 left-4 2xl:left-6 flex items-center pointer-events-none">
                    {/* İkon: 2xl'de büyüyor (28px) */}
                    <LuSearch className="text-blue-500 w-5 h-5 2xl:w-7 2xl:h-7" />
                </div>
                <input
                    type="text"
                    value={filters.search}
                    onChange={(e) =>
                        onChange({ ...filters, search: e.target.value })
                    }
                    placeholder="Ara..."
                    /* Arama Input Stilleri:
                       2xl:py-4 -> Yükseklik artırıldı.
                       2xl:pl-16 -> İkon için yer açıldı.
                       2xl:text-lg -> Yazı büyütüldü.
                    */
                    className="w-full pl-12 2xl:pl-16 pr-4 py-2.5 2xl:py-4 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-full text-sm 2xl:text-lg outline-none focus:border-blue-400 focus:bg-white dark:focus:bg-gray-700 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium text-gray-800 dark:text-white"
                />
            </div>

        </div>
    );
};

export default FilterBar;