import { Business } from '../types/business';

const categories = [
  'Electronics',
  'Clothing',
  'Grocery',
  'Books',
  'Furniture',
  'Medical Store',
  'Restaurant',
  'Hardware',
  'Stationery',
  'Mobile Shop',
];

// Specific businesses that should always be included
const specificBusinesses: Omit<Business, 'id'>[] = [
  {
    name: "ABC Electronics",
    category: "Electronics",
    location: "123 Main St, Muradnagar",
    description: "Your one-stop shop for all electronic needs",
    contact: "999-123-4567",
    email: "abc.electronics@gmail.com",
    website: "",
    rating: 4.5,
    reviews: 87,
    images: ["https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Sharma Clothing Store",
    category: "Clothing",
    location: "Gali No. 4, Muradnagar",
    description: "Latest fashion trends and traditional wear",
    contact: "999-234-5678",
    email: "sharma.clothing@gmail.com",
    website: "",
    rating: 4.3,
    reviews: 65,
    images: ["https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Muradnagar Grocery Mart",
    category: "Grocery",
    location: "25 Market Rd, Muradnagar",
    description: "Fresh groceries and daily essentials",
    contact: "999-345-6789",
    email: "muradnagar.grocery@gmail.com",
    website: "",
    rating: 4.4,
    reviews: 92,
    images: ["https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Soni Bookstore",
    category: "Books",
    location: "48 Gandhi Road, Muradnagar",
    description: "Books, stationery, and educational supplies",
    contact: "999-456-7890",
    email: "soni.books@gmail.com",
    website: "",
    rating: 4.6,
    reviews: 73,
    images: ["https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Raj Furniture & Decor",
    category: "Furniture",
    location: "12 New Colony, Muradnagar",
    description: "Quality furniture and home decor solutions",
    contact: "999-567-8901",
    email: "raj.furniture@gmail.com",
    website: "",
    rating: 4.2,
    reviews: 58,
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]
  }
];

// Generate additional businesses
export const initialBusinesses: Omit<Business, 'id'>[] = [
  ...specificBusinesses, // Add specific businesses first
  // ... rest of the generated businesses
];

// Generate more businesses to reach 500 total
const remainingCount = 495; // 500 - 5 specific businesses
for (let i = 0; i < remainingCount; i++) {
  const categoryIndex = i % categories.length;
  const shopNumber = Math.floor(Math.random() * 200) + 1;
  
  const business = {
    name: `${['New', 'Super', 'Royal', 'Modern', 'Classic'][Math.floor(Math.random() * 5)]} ${
      categories[categoryIndex]} ${Math.floor(i / 5) + 1}`,
    category: categories[categoryIndex],
    location: `${shopNumber}, ${
      ['Main Market', 'Station Road', 'Gandhi Nagar', 'Shastri Nagar', 'New Market'][Math.floor(Math.random() * 5)]
    }, Muradnagar`,
    description: `Quality ${categories[categoryIndex].toLowerCase()} services in Muradnagar`,
    contact: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    email: `shop${i + 1}@gmail.com`,
    website: "",
    rating: Number((Math.random() * 2 + 3).toFixed(1)),
    reviews: Math.floor(Math.random() * 100) + 1,
    images: [`https://images.unsplash.com/photo-${1550000000 + i}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`]
  };
  
  initialBusinesses.push(business);
}