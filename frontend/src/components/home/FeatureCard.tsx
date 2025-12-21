import { IconType } from "react-icons";

interface FeatureCardProps {
    title: string;
    description: string;
    icon: IconType; // React-icons tip tanımlaması
}

export default function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-slate-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
                {/* İkonu dinamik olarak render ediyoruz */}
                <Icon className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {title}
            </h3>
            <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
}