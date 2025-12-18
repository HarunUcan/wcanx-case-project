import Navbar from "@/components/layout/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans">
      <main className="w-full"  >
        <Navbar />

      </main>
    </div>
  );
}
