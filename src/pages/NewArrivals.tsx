import React from 'react';
import Header from '../components/Header';
import ProductFilter from '../components/ProductFilter';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../contexts/ProductContext';
import { useProductFilters } from '../hooks/useProductFilters';
import { ArrowLeft } from 'lucide-react';

const NewArrivals = () => {
  const { products } = useProducts();
  const allNewArrivals = products.filter(p => p.isNewArrival);
  
  const {
    filteredProducts,
    activeFilters,
    setActiveFilters,
    sortOption,
    setSortOption,
    resetFilters
  } = useProductFilters({ products: allNewArrivals });

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
                Home / <span className="text-gray-900 font-medium">New Arrivals</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {allNewArrivals.length} products
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
              showSleeves={true}
            />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">New Arrivals</h1>
                <p className="text-gray-600">Discover the latest additions to our collection</p>
              </div>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="default">Sort by: Default</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No new arrival products found matching your filters.</p>
                <button
                  onClick={resetFilters}
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

export default NewArrivals;