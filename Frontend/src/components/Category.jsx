import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Category.css';

const URL = 'https://greenloop-nw0w.onrender.com/api/v1/search/category';
const CATEGORIES_PER_PAGE = 10; // Set the limit for categories per page

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Track if more categories are available
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async (page) => {
    if (loading) return;
    setLoading(true);
    
    try {
      const response = await axios.get(URL, {
        params: {
          page,
          limit: CATEGORIES_PER_PAGE
        }
      });
      
      // Append new categories to existing ones
      setCategories((prevCategories) => [...prevCategories, ...response.data.data]);

      // Check if there are more categories to load
      setHasMore(response.data.data.length === CATEGORIES_PER_PAGE);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment page to load more categories
  };

  const handleCategoryClick = (category) => {
    navigate(`/category-grid/category=${category}`);
  };

  return (
    <>
      <h3> Explore Your Category --</h3>
      <div className="category-list">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="category-item" 
            onClick={() => handleCategoryClick(category.category)}
          >
            <img src={category.image} alt="" style={{ height: '130px' }} />
            {category.category}
          </div>
        ))}
      </div>
      {hasMore && !loading && (
        <button onClick={handleLoadMore} className="load-more-btn">
          Load More
        </button>
      )}
      {loading && <p>Loading...</p>}
    </>
  );
};

export default CategoryGrid;
