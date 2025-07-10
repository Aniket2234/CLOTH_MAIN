export interface Product {
  _id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  images?: string[];
  category: 't-shirts' | 'shirts' | 'bottoms' | 'jackets' | 'accessories';
  description?: string;
  sizes: string[];
  colors: string[];
  sleeves?: 'full-sleeves' | 'half-sleeves';
  isNewArrival?: boolean;
  rating?: number;
  reviews?: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductFilter {
  colors: string[];
  priceRanges: string[];
  sizes: string[];
  sleeves: string[];
}