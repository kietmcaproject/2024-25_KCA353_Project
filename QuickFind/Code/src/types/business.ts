export interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  contact: string;
  email: string;
  website: string;
  rating: number;
  reviews: number;
  images: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}