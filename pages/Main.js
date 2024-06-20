import React, { useRef, useState, useEffect } from "react";
import Trend from "../components/Trend";
import Products from "../components/Products";
import Service from "../components/Service";

import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutUsSection from "@/components/AboutSection";
import MainBlogPage from "@/components/BlogSection";
import ServiceSection from "@/components/ServiceSection";

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
      {/* <Marketplace /> */}
      <AboutUsSection />
      <ServiceSection />
      {/* <Service /> */}
      {/* <Discount /> */}
      {/* <Ceo /> */}
      {/* <Products /> */}
      <MainBlogPage />
      <Footer />
    </div>
  );
}
