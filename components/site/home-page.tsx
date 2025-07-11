import Header from "./header";
import Hero from "./hero";
import Footer from "./footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Hero />
        {/* Aquí podrías añadir secciones extra (features, FAQs, etc.) */}
      </div>
      <Footer />
    </main>
  );
}
