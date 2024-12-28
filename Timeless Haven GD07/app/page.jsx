/* eslint-disable @next/next/no-img-element */
"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Home = () => {
  const images = [
    "/hp1.jpg",
    "/p1.webp",
    "/bt1.jpg",
    "/Velvet new _page-0001.jpg",
    "/img23.jpg",
    "/p5.jpg",
    "/bt4.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search
  const [priceRange, setPriceRange] = useState([0, 10000]); // State for price range filter
  const [category, setCategory] = useState(""); // State for category filter
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    const fetchProducts = async () => {
      const res = await fetch("/products.json");
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data); // Initialize with all products
    };

    fetchProducts();
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    // Filter products based on search query, price range, and category
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory =
        category ? product.category.toLowerCase() === category.toLowerCase() : true;

      return matchesSearch && matchesPrice && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchQuery, priceRange, category, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
    router.push("/cart");
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    router.push("/cart");
  };

  // Function to navigate to the previous image
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Function to navigate to the next image
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="h-auto w-auto bg-gray-200 flex flex-col justify-center items-center py-10">
      {/* Hero Image Section */}
      <div className="bg-black flex mx-auto w-[80vw] h-[70vh] justify-center overflow-hidden relative">
        <img
          src={images[currentIndex]}
          className="w-full h-full object-cover"
          alt={`Slide ${currentIndex + 1}`}
        />
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700 transition"
        >
          &#8249;
        </button>
        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700 transition"
        >
          &#8250;
        </button>
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 space-x-4">
          <button
            onClick={() => handleBuyNow(products[0])} // You can set a specific product for Buy Now
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Slogan Section */}
      <div className="mt-8 text-center">
        <h2 className="text-4xl font-extrabold text-red-600">
          Feel the Luxury, Love the Comfort.
        </h2>
        <p className="text-xl text-gray-700 mt-2 font-medium">
          Discover the perfect blend of comfort and elegance with our premium collection.
        </p>
      </div>

      {/* Search Section */}
      <div className="w-[80vw] max-w-8xl mt-8 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Filter Section */}
      <div className="w-[80vw] max-w-8xl mt-4 mb-8 flex flex-wrap justify-between gap-4">
        {/* Price Range Filter */}
        <div className="flex flex-col w-full sm:w-[45%] md:w-[30%] lg:w-[22%]">
          <label className="text-lg font-medium mb-2">Price Range</label>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="mb-2"
          />
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
          <p>
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col w-full sm:w-[45%] md:w-[30%] lg:w-[22%]">
          <label className="text-lg font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">All Categories</option>
            <option value="Mattress">Mattress</option>
            <option value="Pillow">Pillow</option>
            <option value="Bed">Bed</option>
            <option value="Bedding">Bedding</option>
          </select>
        </div>
      </div>

      {/* Card Section */}
      <div className="w-[80vw] max-w-8xl mt-8 flex flex-wrap justify-center gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white w-full sm:w-[45%] md:w-[30%] lg:w-[22%] p-5 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[200px] object-cover mb-4 rounded-md"
            />
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">Price: ₹{product.price}</p>
            <p className="text-gray-600 mb-4 text-center">{product.description}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;





