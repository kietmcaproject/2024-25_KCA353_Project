"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Home = () => {
  const images = [
    "/bt1.jpg",
    "/bt2.jpg",
    "/bt3.jpg",
    "/bt4.jpg",
    "/bt5.jpg",
    "/bt6.jpg",
    "/bt4.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]); // Example price range [min, max]
  const [fabric, setFabric] = useState("all");
  const [bedSize, setBedSize] = useState("all");
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    const fetchProducts = async () => {
      const res = await fetch("/productsbt.json");
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    };

    fetchProducts();
    return () => clearInterval(interval);
  }, [images.length]);

  const handleAddToCart = (product) => {
    addToCart(product);
    router.push("/cart");
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    router.push("/cart");
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") {
      setPriceRange([Number(value), priceRange[1]]);
    } else if (name === "maxPrice") {
      setPriceRange([priceRange[0], Number(value)]);
    }
  };

  const handleFabricChange = (e) => {
    setFabric(e.target.value);
  };

  const handleBedSizeChange = (e) => {
    setBedSize(e.target.value);
  };

  useEffect(() => {
    const filtered = products.filter((product) => {
      const isCategoryMatch =
        category === "all" || product.category === category;
      const isPriceInRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const isFabricMatch = fabric === "all" || product.fabric === fabric;
      const isBedSizeMatch = bedSize === "all" || product.bedSize === bedSize;

      return (
        isCategoryMatch && isPriceInRange && isFabricMatch && isBedSizeMatch
      );
    });

    setFilteredProducts(filtered);
  }, [category, priceRange, fabric, bedSize, products]);

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
        "Stay Warm, Stay Cozy, Stay Home."
        </h2>
        <p className="text-xl text-gray-700 mt-2 font-medium">
          Discover the perfect blend of comfort and elegance with our premium
          collection.
        </p>
      </div>

      {/* Filter Section */}
      <div className="w-[80vw] max-w-8xl mt-8 flex gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
          <h3 className="text-xl font-semibold mb-4">Filters</h3>

          {/* Category Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All</option>
              <option value="bedsheets">Bedsheets</option>
              <option value="pillow">Pillow</option>
              <option value="mattress">Mattress</option>
              <option value="blanket">Blanket</option>
            </select>
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Price Range
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                name="minPrice"
                value={priceRange[0]}
                onChange={handlePriceChange}
                className="w-1/2 p-2 border border-gray-300 rounded-md"
                placeholder="Min"
              />
              <input
                type="number"
                name="maxPrice"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-1/2 p-2 border border-gray-300 rounded-md"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Fabric Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Fabric</label>
            <select
              value={fabric}
              onChange={handleFabricChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All</option>
              <option value="cotton">Cotton</option>
              <option value="silk">Silk</option>
              <option value="polyester">Polyester</option>
              <option value="linen">Linen</option>
            </select>
          </div>

          {/* Bed Size Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Bed Size</label>
            <select
              value={bedSize}
              onChange={handleBedSizeChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
            </select>
          </div>
        </div>

        {/* Card Section with 3 Columns */}
        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[200px] object-cover mb-4 rounded-md"
              />
              <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">Price: ₹{product.price}</p>
              <p className="text-gray-600 mb-4 text-center">
                {product.description}
              </p>
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
    </div>
  );
};

export default Home;
