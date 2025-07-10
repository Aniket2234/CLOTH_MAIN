import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProductFilter from '../components/ProductFilter';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../contexts/ProductContext';
import { ProductFilter as FilterType } from '../types/Product';
import { ArrowLeft } from 'lucide-react';

const Bottoms = () => {
  const { getProductsByCategory } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(getProductsByCategory('bottoms'));
  const [activeFilters, setActiveFilters] = useState<FilterType>({
    colors: [],
    priceRanges: [],
    sizes: [],
    sleeves: []
  });

  const allProducts = getProductsByCategory('bottoms');

  useEffect(() => {
    let filtered = [...allProducts];

    // Filter by colors
    if (activeFilters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => activeFilters.colors.includes(color))
      );
    }

    // Filter by price ranges
    if (activeFilters.priceRanges.length > 0) {
      filtered = filtered.filter(product => {
        return activeFilters.priceRanges.some(range => {
          const cleanRange = range.replace(/₹|,/g, '');
          const [minStr, maxStr] = cleanRange.split(' - ');
          const min = parseFloat(minStr);
          const max = parseFloat(maxStr);
          return product.price >= min && product.price <= max;
        });
      });
    }

    // Filter by sizes
    if (activeFilters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => activeFilters.sizes.includes(size))
      );
    }

    setFilteredProducts(filtered);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-white">
      <Header />
      
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGoBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="text-sm text-gray-500">
                Home / <span className="text-gray-900 font-medium">Bottoms</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {allProducts.length} products
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className="hidden lg:block">
            <ProductFilter 
              onFilterChange={setActiveFilters}
              activeFilters={activeFilters}
            />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Bottoms</h1>
              <p className="text-gray-600">Complete your look with our bottom wear</p>
            </div>
            
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                <button
                  onClick={() => setActiveFilters({ colors: [], priceRanges: [], sizes: [], sleeves: [] })}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottoms;