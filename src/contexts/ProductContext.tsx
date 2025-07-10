import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, '_id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductsByCategory: (category: string) => Product[];
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize with some sample products
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        _id: '1',
        name: 'Light Blue Plain Regular Fit Shirt',
        price: 1299,
        image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        category: 'shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Light Blue'],
        sleeves: 'full-sleeves',
        isNewArrival: true,
        rating: 4.0,
        reviews: 2,
        inStock: true
      },
      {
        _id: '2',
        name: 'Blue Ombre Structured Shirt',
        price: 999,
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        category: 'shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blue'],
        sleeves: 'half-sleeves',
        isNewArrival: true,
        inStock: true
      },
      {
        _id: '3',
        name: 'Rust Lightweight Oxford Shirt',
        price: 1199,
        image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        category: 'shirts',
        sizes: ['M', 'L', 'XL'],
        colors: ['Rust', 'Orange'],
        sleeves: 'full-sleeves',
        isNewArrival: true,
        inStock: true
      },
      {
        _id: '4',
        name: 'Navy Flannel Checks Shirt',
        price: 1199,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        category: 'shirts',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Navy Blue', 'Black'],
        sleeves: 'full-sleeves',
        isNewArrival: true,
        inStock: true
      }
    ];

    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(sampleProducts);
      localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
  }, []);

  const addProduct = async (product: Omit<Product, '_id'>) => {
    setLoading(true);
    const newProduct: Product = {
      ...product,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setLoading(false);
  };

  const updateProduct = async (id: string, productUpdate: Partial<Product>) => {
    setLoading(true);
    const updatedProducts = products.map(product =>
      product._id === id 
        ? { ...product, ...productUpdate, updatedAt: new Date() }
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setLoading(false);
  };

  const deleteProduct = async (id: string) => {
    setLoading(true);
    const updatedProducts = products.filter(product => product._id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setLoading(false);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductsByCategory,
      loading
    }}>
      {children}
    </ProductContext.Provider>
  );
};