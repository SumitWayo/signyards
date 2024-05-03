import Trend from "../components/Trend";
import Products from "../components/Products";
import Service from "../components/Service";
import Work from "../components/Work";
import Ceo from "../components/Ceo";
import Discount from "../components/Discount";
import Marketplace from "../components/Marketplace";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Auth from "@/components/Authent";
import Authent from "@/components/Authent";

export default function Main() {
  return (
    <div>
      <Header />
      <HeroSection />
      <Trend />
      <Products />
      <Service />
      <Work />
      <Ceo />
      <Discount />
      <Marketplace />
      <Authent />
      <Footer />
    </div>
  );
}
