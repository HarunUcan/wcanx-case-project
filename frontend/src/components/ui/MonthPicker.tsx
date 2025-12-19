'use client'
import React, { useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface MonthPickerProps {
    initialDate?: Date;
    onChange?: (date: Date) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ initialDate = new Date(), onChange }) => {
    // State tipini açıkça <Date> olarak belirtiyoruz
    const [currentDate, setCurrentDate] = useState<Date>(initialDate);

    const changeMonth = (offset: number): void => {
        const newDate = new Date(currentDate.getTime()); // Mevcut tarihin kopyasını alıyoruz
        newDate.setMonth(currentDate.getMonth() + offset);

        setCurrentDate(newDate);

        // Eğer dışarıdan bir onChange fonksiyonu geldiyse, yeni tarihi bildiriyoruz
        if (onChange) {
            onChange(newDate);
        }
    };

    // Opsiyonel: Ay isminin baş harfini büyük yapmak için yardımcı fonksiyon
    const formatMonth = (date: Date): string => {
        return date.toLocaleDateString('tr-TR', {
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className='flex justify-between items-center bg-gray-100 rounded-full w-48 px-2 h-12 shadow-sm'>
            <button
                onClick={() => changeMonth(-1)}
                className='cursor-pointer font-semibold hover:bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full transition-all'
                aria-label="Önceki Ay"
            >
                <IoIosArrowBack />
            </button>

            <span className='text-sm font-bold text-gray-700 capitalize'>
                {formatMonth(currentDate)}
            </span>

            <button
                onClick={() => changeMonth(1)}
                className='cursor-pointer font-semibold hover:bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full transition-all'
                aria-label="Sonraki Ay"
            >
                <IoIosArrowForward />
            </button>
        </div>
    );
};

export default MonthPicker;