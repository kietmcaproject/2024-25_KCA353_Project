import React,{ useState, useEffect,useRef,useCallback } from 'react';
import './ProductGridAuth.css';
import './ProductCardAuth.css';
import axios from "axios";

const URL = "https://greenloop-nw0w.onrender.com/api/v1";
// const URL = "https://greenloop-nw0w.onrender.com/api/v1"
const token = localStorage.getItem('token');

const useFetchData = (url, limit = 20) => {
  const [data, setData] = useState([]); // Store fetched data
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(false); // Track errors
  const [hasMore, setHasMore] = useState(true); // Track if there's more data to load
  const pageRef = useRef(1); // Use useRef to track the current page

  const fetchData = async (page) => {
    if (loading || !hasMore) return; // Prevent fetching when loading or no more data

    setLoading(true);
    try {
      const response = await axios.get(url, {
        params: { page, limit }, // Send current page and limit in the request
      });

      if (response.data.products.length === 0) {
        setHasMore(false); // No more data to load
      } else {
        setData((prevData) => [...prevData, ...response.data.products]); // Append new data to the existing data
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts or when the page changes
  useEffect(() => {
    fetchData(pageRef.current); // Fetch based on the ref value
  }, [url]); // Only refetch if the URL changes

  const handleScroll = useCallback(() => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentScrollPosition = window.scrollY;
  
    // Check if user has scrolled near the bottom and if more data is available
    if (currentScrollPosition >= scrollableHeight - 100 && !loading && hasMore) {
      pageRef.current += 1; // Increment the page using the ref
      fetchData(pageRef.current); // Fetch the next page
    }
  }, [loading, hasMore]);
  
  useEffect(() => {
    const onScroll = () => {
      if (hasMore) {
        handleScroll(); // Only call the scroll handler if more data is available
  

      }
    };
    if(hasMore){     window.addEventListener('scroll', onScroll);}
    else {window.removeEventListener('scroll', onScroll);} // Clean up event listener
    
  }, [handleScroll, hasMore]); // Re-run only if handleScroll or hasMore changes
  
  
  

  return { data, loading, error, hasMore };
};


const ProductGridAuth = () => {
  const { data: products, loading, error } = useFetchData(`${URL}/products`);


    const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  

 
  const startEditing = (product) => {
    setEditingProductId(product._id);
    setEditedProduct({ ...product });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e, index, type = 'default') => {
    if (type === 'default') {
      const updatedImages = [...(editedProduct.images || [])];
      updatedImages[index] = e.target.value;
      setEditedProduct(prevState => ({
        ...prevState,
        images: updatedImages
      }));
    } else {
      const updatedColorImages = [...(editedProduct.colors[type] || [])];
      updatedColorImages[index] = e.target.value;
      setEditedProduct(prevState => ({
        ...prevState,
        colors: {
          ...prevState.colors,
          [type]: updatedColorImages
        }
      }));
    }
  };

  const addImageField = (type = 'default') => {
    if (type === 'default') {
      setEditedProduct(prevState => ({
        ...prevState,
        images: [...(prevState.images || []), '']
      }));
    } else {
      setEditedProduct(prevState => ({
        ...prevState,
        colors: {
          ...prevState.colors,
          [type]: [...(prevState.colors[type] || []), '']
        }
      }));
    }
  };

  const handleImageRemove = (index, type = 'default') => {
    if (type === 'default') {
      const updatedImages = [...(editedProduct.images || [])];
      updatedImages.splice(index, 1);
      setEditedProduct(prevState => ({
        ...prevState,
        images: updatedImages
      }));
    } else {
      const updatedColorImages = [...(editedProduct.colors[type] || [])];
      updatedColorImages.splice(index, 1);
      setEditedProduct(prevState => ({
        ...prevState,
        colors: {
          ...prevState.colors,
          [type]: updatedColorImages
        }
      }));
    }
  };

  const addColorField = () => {
    setEditedProduct(prevState => ({
      ...prevState,
      colors: {
        ...prevState.colors,
        [`color${Object.keys(prevState.colors || {}).length + 1}`]: []
      }
    }));
  };

  const handleSizeRemove = (index) => {
    const updatedItemSet = [...(editedProduct.itemSet || [])];
    updatedItemSet.splice(index, 1);
    setEditedProduct(prevState => ({
      ...prevState,
      itemSet: updatedItemSet
    }));
  };

  const saveProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      // console.log(editedProduct._id);
      
      const response = await axios.patch(`${URL}/products/${editedProduct._id}`, editedProduct, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // setData(products.map(product => product._id === editedProduct._id ? response.data : product));
      setEditingProductId(null);
      console.log(response);
      
    } catch (error) {
      console.log(error)
      alert("Error saving product:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${URL}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // setData(products.filter((product) => product._id !== productId));
    } catch (error) {
      alert("Error deleting product:", error);
    }
  };

  const handleColorImageChange = (e, color, index) => {
    const updatedColorImages = [...(editedProduct.colors[color] || [])];
    updatedColorImages[index] = e.target.value;
    setEditedProduct(prevState => ({
      ...prevState,
      colors: {
        ...prevState.colors,
        [color]: updatedColorImages
      }
    }));
  };
  const handleColorNameChange = (e, oldColor) => {
    const newColor = e.target.value;

    if (!newColor.trim()) {
      // If the new color name is empty, do nothing or alert the user
      return;
    }
   

    setEditedProduct(prevState => {
      const newColors = { ...prevState.colors };

      // Rename the key for the color in the object
      newColors[newColor] = newColors[oldColor];
      delete newColors[oldColor];

      return {
        ...prevState,
        colors: newColors
      };
    });
  };
  const handleColorImageRemove = (color, index) => {
    setEditedProduct(prevState => {
      const updatedColorImages = [...(prevState.colors[color] || [])];
      updatedColorImages.splice(index, 1); // Remove the image at the specified index

      return {
        ...prevState,
        colors: {
          ...prevState.colors,
          [color]: updatedColorImages
        }
      };
    });
  };
  const handleRemoveColor = (color) => {
    setEditedProduct(prevState => {
      const updatedColors = { ...prevState.colors };

      // Delete the color from the colors object
      delete updatedColors[color];

      return {
        ...prevState,
        colors: updatedColors
      };
    });
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Something went wrong</h2>;
  }
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product._id} style={{ backgroundColor: '#000' }}>
          {editingProductId === product._id ? (
            <div className="edit-product-form">
              <input
                type="text"
                name="article"
                value={editedProduct.article || ''}
                onChange={handleEditChange}
                className="edit-input"
              />
              <input
                type="text"
                name="brand"
                value={editedProduct.brand || ''}
                onChange={handleEditChange}
                className="edit-input"
              />
              <input
                type="text"
                name="description"
                value={editedProduct.description || ''}
                onChange={handleEditChange}
                className="edit-input"
              />
              <input
                type="number"
                name="price"
                value={editedProduct.price || ''}
                onChange={handleEditChange}
                className="edit-input"
              />
              <input
                type="text"
                name="material"
                value={editedProduct.material || ''}
                onChange={handleEditChange}
                className="edit-input"
              />
              <input
                type="text"
                name="gender"
                value={editedProduct.gender || ''}
                onChange={handleEditChange}
                className="edit-input"
              />
              <input
                type="text"
                name="category"
                value={editedProduct.category || ''}
                onChange={handleEditChange}
                className="edit-input"
              />


              {/* Default Image URLs */}
              <h4>Default Images</h4>
              {(editedProduct.images || []).map((imgUrl, index) => (
                <div key={`${product._id}-image-${index}`}>
                  <input
                    type="text"
                    value={imgUrl}
                    onChange={(e) => handleImageChange(e, index)}
                    className="edit-input"
                  />
                  <button onClick={() => handleImageRemove(index)}>Remove</button>
                </div>
              ))}
              <button onClick={() => addImageField()} style={{ width: '50%' }}>Add Image</button>

              {/* Colors and their images */}
              <h4>Colors and Images</h4>
              {Object.keys(editedProduct.colors).map((color, colorIndex) => (
                <div key={`${product._id}-color-${colorIndex}`}>
                  <h5>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleColorNameChange(e, color)}
                      className="edit-input"
                    />
                    <button onClick={() => handleRemoveColor(color)}>Remove Color</button> {/* Call the function here */}
                  </h5>
                  {editedProduct.colors[color].map((imgUrl, index) => (
                    <div key={`${product._id}-${color}-${index}`}>
                      <input
                        type="text"
                        value={imgUrl}
                        onChange={(e) => handleColorImageChange(e, color, index)}
                        className="edit-input"
                      />
                      <button onClick={() => handleColorImageRemove(color, index)}>Remove Image</button>
                    </div>
                  ))}
                  <button onClick={() => addImageField(color)}>Add Image for {color}</button>
                </div>
              ))}

              <button onClick={addColorField} style={{ width: '50%' }}>Add Color</button>

              <button className="header-button save-button" onClick={saveProduct}>Save</button>
              <button className="header-button cancel-button" onClick={() => setEditingProductId(null)}>Cancel</button>
            </div>
          ) : (
            <>
              <div className="product-image-gallery">
                {(product.images || []).map((imgUrl, index) => (
                  <img key={`${product._id}-image-${index}`} src={imgUrl} alt={`${product.brand} ${product.article}`} className="product-image" />
                ))}
              </div>
              <div className="product-details">
                <h2 className="product-name">{product.article}</h2>
                <p className="product-brand">{product.brand}</p>
                <p className="product-description">{product.description}</p>
                <div className="product-info">
                  <p className="product-mrp">MRP: ₹{product.price}</p>
                  <p className="product-material">Material: {product.material}</p>
                  <p className="product-gender">Gender: {product.gender}</p>
                </div>
                <div className="product-buttons">
                  <button className="product-discount-edit" onClick={() => startEditing(product)}>Edit</button>
                  <button className='delete-button ' onClick={() => deleteProduct(product._id)}>Delete</button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductGridAuth;
