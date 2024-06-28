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
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      console.log("token", token);
      if (token) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://signyards.in/getProducts.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page: "homepage" }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        const filteredServices = data.filter((item) => item.type === "Service");
        const filteredProducts = data.filter((item) => item.type === "Product");
        setServices(filteredServices);
        setProducts(filteredProducts);
        console.log(products);
        console.log(services);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleAuthComplete = (accessToken) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
      setIsAuthenticated(true);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <HeroSection isAuthenticated={isAuthenticated} authRef={authRef} />
      <Trend />
      <Products products={products} />
      <AboutUsSection />
      <ServiceSection services={services} />
      <MainBlogPage />
      <Footer />
    </div>
  );
}
