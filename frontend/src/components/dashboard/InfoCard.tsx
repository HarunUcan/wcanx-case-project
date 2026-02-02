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
    percentageTooltip?: string; // hover açıklaması
    cardType: CardType;
};

function InfoCard({ title, amount, percentage, percentageTooltip, cardType }: InfoCardProps) {
    const config = {
        [CardType.INCOME]: {
            cardBg: "bg-white dark:bg-gray-800",
            iconWrapBg: "bg-green-200 dark:bg-green-900/40",
            icon: <IoIosTrendingUp className="text-green-600 dark:text-green-400 text-xl 2xl:text-5xl" />,
            badgeBg: "bg-green-200 dark:bg-green-900/40",
            badgeText: "text-green-600 dark:text-green-400",
            titleText: "text-gray-400 dark:text-gray-400 2xl:text-2xl",
            amountText: "text-gray-900 dark:text-white",
        },
        [CardType.EXPEND]: {
            cardBg: "bg-white dark:bg-gray-800",
            iconWrapBg: "bg-red-200 dark:bg-red-900/40",
            icon: <IoIosTrendingDown className="text-red-600 dark:text-red-400 text-xl 2xl:text-5xl" />,
            badgeBg: "bg-red-200 dark:bg-red-900/40",
            badgeText: "text-red-600 dark:text-red-400",
            titleText: "text-gray-400 dark:text-gray-400 2xl:text-2xl",
            amountText: "text-gray-900 dark:text-white",
        },
        [CardType.TOTAL]: {
            cardBg: "bg-green-950 dark:bg-green-900",
            iconWrapBg: "bg-green-300 dark:bg-green-800",
            icon: <RiWallet3Line className="text-green-900 dark:text-green-100 text-xl 2xl:text-5xl" />,
            badgeBg: "bg-green-300 dark:bg-green-800",
            badgeText: "text-green-900 dark:text-green-100",
            titleText: "text-green-300 dark:text-green-200 2xl:text-2xl",
            amountText: "text-gray-100",
        },
    }[cardType];

    const showBadge = (percentage ?? "").trim().length > 0;

    return (
        <div
            className={`flex flex-col gap-6 w-full lg:w-1/3 shadow-xl dark:shadow-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-[50px] px-12 py-4 2xl:py-16 ${config.cardBg}`}
        >
            <div className="flex justify-between items-center">
                <div className={`flex justify-center items-center rounded-full w-12 2xl:w-20 h-12 2xl:h-20 ${config.iconWrapBg}`}>
                    {config.icon}
                </div>

                {showBadge ? (
                    <div className="relative group">
                        <div
                            className={`flex justify-center items-center rounded-full text-[10px] 2xl:text-sm px-2 py-1 min-w-12 ${config.badgeBg} ${config.badgeText}`}
                        >
                            {percentage}
                        </div>

                        {/* Tooltip */}
                        {percentageTooltip ? (
                            <div
                                className="pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
                            >
                                {percentageTooltip}
                                <div className="absolute -top-1 right-3 h-2 w-2 rotate-45 bg-gray-900" />
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div className="w-10" />
                )}
            </div>

            <div className="flex flex-col mt-2">
                <span className={config.titleText}>{title}</span>
                <span className={`font-bold text-3xl 2xl:text-6xl ${config.amountText}`}>
                    {amount.toLocaleString("tr-TR")}₺
                </span>
            </div>
        </div>
    );
}

export default InfoCard;
