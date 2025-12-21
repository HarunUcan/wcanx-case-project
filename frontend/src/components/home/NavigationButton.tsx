import Link from "next/link";

// Buton türlerini kısıtlayarak hata yapmayı engelliyoruz
type ButtonVariant = "primary" | "secondary";

interface CustomButtonProps {
    href: string;
    children: React.ReactNode;
    variant?: ButtonVariant; // Opsiyonel, varsayılanı 'primary' olacak
    className?: string;      // Ekstra stil eklemek istersek diye
}

export default function NavigationButton({
    href,
    children,
    variant = "primary",
    className = ""
}: CustomButtonProps) {

    // Ortak stiller (padding, yuvarlaklık, font vb.)
    const baseStyles = "inline-flex items-center justify-center font-semibold py-3.5 px-8 rounded-full transition-all duration-200";

    // Varyantlara göre değişen renk stilleri
    const variantStyles = {
        primary: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 hover:shadow-xl",
        secondary: "bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700",
    };

    return (
        <Link
            href={href}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {children}
        </Link>
    );
}