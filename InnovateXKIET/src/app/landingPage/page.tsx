"use client"
import CTA from "@/components/landingPage/CTA";
import Footer from "@/components/landingPage/Footer";
import Header from "@/components/landingPage/Header";
import Hero from "@/components/landingPage/Hero";
import ProductCard from "@/components/landingPage/ProductCard";
import ProductShowcase from "@/components/landingPage/ProductShowcase";
import Testimonials from "@/components/landingPage/Testimonials";

const LandingPage = () => {
    return (
      <div>
        <Header />
        <Hero />
        <ProductShowcase/>
        <ProductCard/>
        <Testimonials/>
        <CTA/>
        <Footer/>
      </div>
    );
    };
  
  export default LandingPage;