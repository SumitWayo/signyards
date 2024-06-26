import React, { useRef, useState, useEffect } from "react";
import Trend from "../components/sections/Trend";
import Products from "../components/Products";
import Footer from "../components/sections/Footer";
import Header from "../components/sections/Header";
import HeroSection from "../components/sections/HeroSection";
import AboutUsSection from "@/components/sections/AboutSection";
import MainBlogPage from "@/components/sections/BlogSection";
import ServiceSection from "@/components/sections/ServiceSection";

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
      <Trend />
      <Products />
      <AboutUsSection />
      <ServiceSection />
      <MainBlogPage />
      <Footer />
    </div>
  );
}
