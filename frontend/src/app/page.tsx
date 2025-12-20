import Navbar from "@/components/layout/navbar";
import FeatureCard from "@/components/home/FeatureCard"; // Yeni oluşturduğumuz component
import { BiWallet, BiBarChartAlt, BiPieChartAlt } from "react-icons/bi";
import Link from "next/link";
import NavigationButton from "@/components/home/NavigationButton";

export default function Home() {

  // Kart verilerini burada tanımlıyoruz. 
  // İleride burayı bir API'den veya çeviri dosyasından da çekebilirsin.
  const features = [
    {
      id: 1,
      title: "Gelir & Gider Takibi",
      description: "Tüm harcamalarınızı ve gelirlerinizi anlık olarak kaydedin. Cüzdanınızı tek bir yerden kolayca yönetin.",
      icon: BiWallet,
    },
    {
      id: 2,
      title: "Aylık Grafikler",
      description: "Harcama alışkanlıklarınızı detaylı grafiklerle görselleştirin. Hangi aylarda ne kadar harcadığınızı görün.",
      icon: BiBarChartAlt,
    },
    {
      id: 3,
      title: "Kategori Bazlı Analiz",
      description: "Paranızın nereye gittiğini kategorilere ayırarak net bir şekilde görün. Gereksiz harcamaları tespit edin.",
      icon: BiPieChartAlt,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-slate-900">
      <Navbar />

      <main className="w-full flex-1">

        {/* --- HERO SECTION --- */}
        <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="flex flex-col items-center text-center lg:text-left lg:items-center mx-auto lg:mx-0">
            <h1 className="text-4xl text-center md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900">
              Gelir ve giderlerini <br className="hidden lg:block" />
              <span className="relative inline-block">
                <span className="relative z-10 text-emerald-600">kolayca takip et</span>
              </span>
            </h1>

            <p className="mt-6 text-lg text-center text-slate-600 max-w-2xl leading-relaxed">
              Paranızı yönetmenin en akıllı yolu. Harcamalarınızı kontrol altına alın,
              bütçenizi oluşturun ve tasarruf hedeflerinize daha hızlı ulaşın.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <NavigationButton href="/register" variant="primary">
                Kayıt Ol
              </NavigationButton>

              <NavigationButton href="/login" variant="secondary">
                Giriş Yap
              </NavigationButton>
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="py-20 bg-zinc-50">
          <div className="container mx-auto px-4">

            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-4">
                Özellikler
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Neden WcanX Case?
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Finansal özgürlüğünüze giden yolda size yardımcı olacak özellikler.
                Karmaşık tablolarla uğraşmayın, her şey net ve anlaşılır.
              </p>
            </div>

            {/* Kartlar*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>

          </div>
        </section>

        {/* --- Alt Section --- */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 opacity-50 z-0"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Paranızı Yönetmeye <span className="text-emerald-400">Bugün Başlayın</span>
              </h2>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                Hemen ücretsiz hesabınızı oluşturun ve bütçenizi kontrol altına alın.
                İlk ay premium özellikler bizden!
              </p>
              <NavigationButton
                href="/register"
                variant="primary"
                className="py-4 px-10 shadow-emerald-900/20 hover:bg-emerald-400 transform hover:scale-105"
              >
                Ücretsiz Kayıt Ol
              </NavigationButton>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}