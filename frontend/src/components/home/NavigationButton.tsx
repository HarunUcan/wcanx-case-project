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
        primary: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200 hover:shadow-xl",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
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