import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import ServiceArea from "./components/ServiceArea";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <ServiceArea />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
