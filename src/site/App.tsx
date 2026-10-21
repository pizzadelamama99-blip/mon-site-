import { CoffretProvider } from "./context/CoffretContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Collections from "./components/Collections";
import DiamondShowcase from "./components/DiamondShowcase";
import RubySignature from "./components/RubySignature";
import Promises from "./components/Promises";
import SavoirFaire from "./components/SavoirFaire";
import Catalog from "./components/Catalog";
import Editorial from "./components/Editorial";
import Press from "./components/Press";
import Appointment from "./components/Appointment";
import Cercle from "./components/Cercle";
import Footer from "./components/Footer";
import CoffretDrawer from "./components/CoffretDrawer";

export default function AurelisApp() {
  return (
    <CoffretProvider>
      <div className="aurelis-root aurelis-grain relative min-h-screen overflow-x-hidden">
        <a
          href="#collections"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:border focus:border-j-gold focus:bg-j-noir focus:px-5 focus:py-3 focus:font-jost focus:text-[10px] focus:tracking-[0.3em] focus:text-j-gold focus:uppercase"
        >
          Aller au contenu
        </a>
        <Header />
        <main>
          <Hero />
          <Marquee />
          <Collections />
          <RubySignature />
          <Promises />
          <DiamondShowcase />
          <SavoirFaire />
          <Catalog />
          <Editorial />
          <Press />
          <Appointment />
          <Cercle />
        </main>
        <Footer />
        <CoffretDrawer />
      </div>
    </CoffretProvider>
  );
}
