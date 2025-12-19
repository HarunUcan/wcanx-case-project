import React from "react";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { RiWallet3Line } from "react-icons/ri";

export enum CardType {
    INCOME,
    EXPEND,
    TOTAL,
}

type InfoCardProps = {
    title: string;
    amount: number;
    percentage: string; // "+12%" gibi
    cardType: CardType;
};

function InfoCard({ title, amount, percentage, cardType }: InfoCardProps) {
    const config = {
        [CardType.INCOME]: {
            cardBg: "",
            iconWrapBg: "bg-green-200",
            icon: <IoIosTrendingUp className="text-green-600 text-xl" />,
            badgeBg: "bg-green-200",
            badgeText: "text-green-600",
            titleText: "text-gray-400",
            amountText: "text-gray-900",
        },
        [CardType.EXPEND]: {
            cardBg: "",
            iconWrapBg: "bg-red-200",
            icon: <IoIosTrendingDown className="text-red-600 text-xl" />,
            badgeBg: "bg-red-200",
            badgeText: "text-red-600",
            titleText: "text-gray-400",
            amountText: "text-gray-900",
        },
        [CardType.TOTAL]: {
            cardBg: "bg-green-950",
            iconWrapBg: "bg-green-300",
            icon: <RiWallet3Line className="text-green-900 text-xl" />,
            badgeBg: "bg-green-300",
            badgeText: "text-green-900",
            titleText: "text-green-300",
            amountText: "text-gray-100",
        },
    }[cardType];

    return (
        <div
            className={`flex flex-col gap-6 w-1/3 shadow-[0px_8px_30px_8px_rgba(0,_0,_0,_0.1)] border border-gray-200 rounded-[50px] px-12 py-4 ${config.cardBg}`}
        >
            <div className="flex justify-between items-center">
                <div
                    className={`flex justify-center items-center rounded-full w-12 h-12 ${config.iconWrapBg}`}
                >
                    {config.icon}
                </div>

                <div
                    className={`flex justify-center items-center rounded-full text-[10px] p-1 w-10 ${config.badgeBg} ${config.badgeText}`}
                >
                    {percentage}
                </div>
            </div>

            <div className="flex flex-col mt-2">
                <span className={config.titleText}>{title}</span>
                <span className={`font-bold text-3xl ${config.amountText}`}>
                    {amount.toLocaleString("tr-TR")}₺
                </span>
            </div>
        </div>
    );
}

export default InfoCard;
