import { CartProvider } from "./context/CartContext";
import Ticker from "./components/Ticker";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Flavors from "./components/Flavors";
import Why from "./components/Why";
import Campaign from "./components/Campaign";
import Story from "./components/Story";
import EffectsLab from "./components/EffectsLab";
import Shop from "./components/Shop";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <Ticker />
        <Navbar />
        <main>
          <Hero />
          <Flavors />
          <Why />
          <Campaign />
          <Story />
          <EffectsLab />
          <Shop />
          <Testimonials />
          <Newsletter />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
