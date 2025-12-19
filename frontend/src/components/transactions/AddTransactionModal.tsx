import React, { useState } from 'react';
import {
    LuTrendingUp,
    LuTrendingDown,
    LuCalendar,
    LuShapes,
    LuCheck,
    LuX,
    LuPenLine
} from "react-icons/lu";

interface AddTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (data: any) => void;
}

type TransactionType = 'expense' | 'income';

const EXPENSE_CATEGORIES = [
    'Gıda',
    'Ulaşım',
    'Kira',
    'Eğlence',
    'Giyim',
    'Fatura',
    'Akaryakıt',
];

const INCOME_CATEGORIES = [
    'Maaş',
    'Freelance',
    'Prim',
    'Yatırım',
    'Kira Geliri',
    'Diğer',
];

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onSave }) => {
    // Form State'leri
    const [type, setType] = useState<TransactionType>('expense');
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [date, setDate] = useState<string>(Intl.DateTimeFormat('en-CA').format(new Date()));
    const [description, setDescription] = useState<string>('');

    // Yeni State: Özel kategori modu açık mı?
    const [isCustomCategory, setIsCustomCategory] = useState<boolean>(false);

    // Modal kapalıysa hiçbir şey render etme
    if (!isOpen) return null;

    const handleSave = () => {
        if (!amount || !category || !date) {
            alert('Lütfen zorunlu alanları doldurun.');
            return;
        }

        const payload = {
            type,
            category,
            amount: Number(amount),
            date, // YYYY-MM-DD
            note: description || undefined,
        };

        onSave?.(payload);
        onClose();
    };

    const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    return (
        // Overlay
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-all">

            {/* Modal Container */}
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">

                {/* Kapatma Butonu */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <LuX size={24} />
                </button>

                <div className="p-8">

                    {/* Gelir / Gider Tabları */}
                    <div className="flex bg-gray-100 p-1 rounded-full mb-8">
                        <button
                            onClick={() => setType('expense')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 cursor-pointer rounded-full text-sm font-bold transition-all duration-300 ${type === 'expense'
                                ? 'bg-red-500 text-white shadow-md'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <LuTrendingDown size={18} />
                            Gider
                        </button>
                        <button
                            onClick={() => setType('income')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 cursor-pointer rounded-full text-sm font-bold transition-all duration-300 ${type === 'income'
                                ? 'bg-emerald-500 text-white shadow-md'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <LuTrendingUp size={18} />
                            Gelir
                        </button>
                    </div>

                    {/* Form Alanları */}
                    <div className="space-y-6">

                        {/* Tutar Alanı */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tutar</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">₺</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-10 pr-4 py-4 text-3xl font-bold text-gray-800 border border-gray-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-gray-300"
                                />
                            </div>
                        </div>

                        {/* Kategori ve Tarih */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Kategori Alanı */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Kategori</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                        <LuShapes size={20} />
                                    </div>

                                    {/* Select veya Input kontrolü */}
                                    {!isCustomCategory ? (
                                        // Select Box
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full pl-12 pr-8 py-3.5 cursor-pointer bg-white border border-gray-200 rounded-2xl text-gray-700 font-semibold outline-none focus:border-emerald-500 transition-all appearance-none"
                                        >
                                            <option value="" disabled>Seçiniz</option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        // Input Box
                                        <input
                                            type="text"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            placeholder="Yeni kategori adı girin..."
                                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-700 font-semibold outline-none focus:border-emerald-500 transition-all placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal"
                                        />
                                    )}

                                    {/* Sadece select modunda görünür */}
                                    {!isCustomCategory && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                                            ▼
                                        </div>
                                    )}
                                </div>

                                {/* Checkbox Alanı */}
                                <div className="mt-2 flex items-center gap-2 pl-1">
                                    <input
                                        type="checkbox"
                                        id="customCategory"
                                        checked={isCustomCategory}
                                        onChange={(e) => {
                                            setIsCustomCategory(e.target.checked);
                                            setCategory(''); // Mod değişince içeriği temizle
                                        }}
                                        className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                                    />
                                    <label
                                        htmlFor="customCategory"
                                        className="text-xs font-medium text-gray-500 cursor-pointer select-none hover:text-gray-700"
                                    >
                                        Özel Kategori
                                    </label>
                                </div>
                            </div>

                            {/* Tarih */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tarih</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                        <LuCalendar size={20} />
                                    </div>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 cursor-pointer bg-white border border-gray-200 rounded-2xl text-gray-700 font-semibold outline-none focus:border-emerald-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Açıklama */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                Açıklama <span className="text-gray-300 font-normal normal-case">(İsteğe bağlı)</span>
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Not ekleyin..."
                                rows={3}
                                className="w-full p-4 border border-gray-200 rounded-2xl text-sm font-medium outline-none focus:border-emerald-500 transition-all resize-none placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Footer Butonları */}
                    <div className="flex items-center gap-4 mt-8">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3.5 cursor-pointer rounded-full border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                        >
                            İptal
                        </button>
                        <button
                            onClick={handleSave}
                            className={`flex-1 py-3.5 cursor-pointer rounded-full text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 bg-emerald-500 hover:bg-emerald-600`}
                        >
                            <LuCheck size={20} />
                            Kaydet
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddTransactionModal;