import React, { useRef, useState, useEffect } from "react";
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
import Authent from "../components/Authent";

export default function Main() {
  const authRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      console.log("token", token);
      if (token) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleAuthComplete = (accessToken) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
      setIsAuthenticated(true);
    }
  };

  return (
    <div>
      <Header />
      <HeroSection isAuthenticated={isAuthenticated} authRef={authRef} />
      {/* <HeroSection /> */}
      <Trend />
      <Products />
      <Service />
      <Work />
      <Ceo />
      <Discount />
      <Marketplace />
      {/* <div ref={authRef}>
        <Authent onAuthComplete={handleAuthComplete} />
      </div> */}
      <Authent />
      <Footer />
    </div>
  );
}
