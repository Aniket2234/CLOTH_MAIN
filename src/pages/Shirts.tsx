import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { ArrowLeft, X, ChevronDown, ChevronUp, Heart, Star } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';

type FilterOptions = {
  colors: string[];
  sizes: string[];
  sleeves: string[];
  priceRanges: {
    min: number;
    max: number;
    label: string;
  }[];
};

const Shirts = () => {
  const { getProductsByCategory } = useProducts();
  const allProducts = getProductsByCategory('shirts');
  
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [loading, setLoading] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedSleeves, setSelectedSleeves] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('default');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [showAllColors, setShowAllColors] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // All available colors (7 shown by default, +15 more)
  const allColors = ['Brown', 'Blue', 'Navy Blue', 'Light Blue', 'Black', 'Orange', 'Yellow', 
                    'Red', 'Green', 'Purple', 'Pink', 'Gray', 'Maroon', 'Teal', 'Olive', 
                    'Lime', 'Aqua', 'Silver', 'Navy', 'Fuchsia', 'Coral', 'Indigo', 'White'];
  
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    colors: allColors.slice(0, 7), // Show first 7 colors by default
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
    sleeves: ['Full Sleeves', 'Half Sleeves'],
    priceRanges: [
      { min: 0, max: 499.99, label: '₹0.00 - ₹499.99' },
      { min: 500, max: 999.99, label: '₹500.00 - ₹999.99' },
      { min: 1000, max: 1499.99, label: '₹1000.00 - ₹1499.99' },
      { min: 1500, max: 1999.99, label: '₹1500.00 - ₹1999.99' },
    ]
  });

  // Toggle showing all colors
  const toggleShowAllColors = () => {
    setShowAllColors(!showAllColors);
    setFilterOptions(prev => ({
      ...prev,
      colors: showAllColors ? allColors.slice(0, 7) : allColors
    }));
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...allProducts];
    
    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter(product => 
        product.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Sleeves filter
    if (selectedSleeves.length > 0) {
      result = result.filter(product => {
        const sleeveMap: { [key: string]: string } = {
          'Full Sleeves': 'full-sleeves',
          'Half Sleeves': 'half-sleeves'
        };
        return selectedSleeves.some(sleeve => 
          product.sleeves === sleeveMap[sleeve]
        );
      });
    }
    
    // Price range filter (now supports multiple selections)
    if (selectedPriceRanges.length > 0) {
      result = result.filter(product => {
        return selectedPriceRanges.some(rangeLabel => {
          const range = filterOptions.priceRanges.find(r => r.label === rangeLabel);
          return range && product.price >= range.min && product.price <= range.max;
        });
      });
    }
    
    // Sorting
    switch(sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b._id || '').localeCompare(a._id || ''));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [
    selectedColors, 
    selectedSizes, 
    selectedSleeves, 
    selectedPriceRanges, 
    sortOption, 
    allProducts, 
    filterOptions.priceRanges
  ]);

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  const handleSleevesToggle = (sleeveType: string) => {
    setSelectedSleeves(prev => 
      prev.includes(sleeveType) 
        ? prev.filter(s => s !== sleeveType) 
        : [...prev, sleeveType]
    );
  };

  const handlePriceRangeToggle = (rangeLabel: string) => {
    setSelectedPriceRanges(prev => 
      prev.includes(rangeLabel)
        ? prev.filter(r => r !== rangeLabel)
        : [...prev, rangeLabel]
    );
  };

  const removeFilter = (type: string, value: string) => {
    switch(type) {
      case 'color':
        setSelectedColors(prev => prev.filter(c => c !== value));
        break;
      case 'size':
        setSelectedSizes(prev => prev.filter(s => s !== value));
        break;
      case 'sleeves':
        setSelectedSleeves(prev => prev.filter(s => s !== value));
        break;
      case 'price':
        setSelectedPriceRanges(prev => prev.filter(r => r !== value));
        break;
    }
  };

  const resetFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedSleeves([]);
    setSelectedPriceRanges([]);
    setSortOption('default');
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleGoBack = () => {
    window.history.back();
  };

  // Helper function to get color hex values
  const getColorHex = (color: string): string => {
    const colorMap: Record<string, string> = {
      'Brown': '#964B00',
      'Blue': '#0000FF',
      'Navy Blue': '#000080',
      'Light Blue': '#ADD8E6',
      'Black': '#000000',
      'Orange': '#FFA500',
      'Yellow': '#FFFF00',
      'White': '#FFFFFF',
      'Red': '#FF0000',
      'Green': '#008000',
      'Purple': '#800080',
      'Pink': '#FFC0CB',
      'Gray': '#808080',
      'Maroon': '#800000',
      'Teal': '#008080',
      'Olive': '#808000',
      'Lime': '#00FF00',
      'Aqua': '#00FFFF',
      'Silver': '#C0C0C0',
      'Navy': '#000080',
      'Fuchsia': '#FF00FF',
      'Coral': '#FF7F50',
      'Indigo': '#4B0082'
    };
    return colorMap[color] || '#CCCCCC';
  };

  return (
    <div className="min-h-screen bg-white">
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
                Home / <span className="text-gray-900 font-medium">Shirts</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {allProducts.length} products
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-gray-50 p-4 rounded-lg sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">FILTERS</h2>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-red-600 hover:text-red-800 font-bold"
                >
                  RESET
                </button>
              </div>
              
              {/* Color Filter with checkboxes and color swatches */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">COLOR</h3>
                <div className="space-y-2">
                  {filterOptions.colors.map(color => (
                    <div key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`color-${color}`}
                        checked={selectedColors.includes(color)}
                        onChange={() => handleColorToggle(color)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div className="flex items-center ml-2">
                        <span 
                          className="w-4 h-4 rounded-full border border-gray-300 mr-2"
                          style={{ backgroundColor: getColorHex(color) }}
                        />
                        <label htmlFor={`color-${color}`} className="text-sm text-gray-700">
                          {color}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                {allColors.length > 7 && (
                  <button 
                    onClick={toggleShowAllColors}
                    className="text-sm text-blue-600 hover:text-blue-800 mt-2 flex items-center"
                  >
                    {showAllColors ? (
                      <>
                        <ChevronUp size={16} className="mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} className="mr-1" />
                        +{allColors.length - 7} more
                      </>
                    )}
                  </button>
                )}
              </div>
              
              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">SIZE</h3>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`px-3 py-1 text-sm border rounded-md ${selectedSizes.includes(size) ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sleeves Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">SLEEVES</h3>
                <div className="space-y-1">
                  {filterOptions.sleeves.map(sleeveType => (
                    <div key={sleeveType} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`sleeves-${sleeveType}`}
                        checked={selectedSleeves.includes(sleeveType)}
                        onChange={() => handleSleevesToggle(sleeveType)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={`sleeves-${sleeveType}`} className="ml-2 text-sm text-gray-700">
                        {sleeveType}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Filter with Checkboxes (now supports multiple selection) */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">PRICE</h3>
                <div className="space-y-1">
                  {filterOptions.priceRanges.map(range => (
                    <div key={range.label} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`price-${range.label}`}
                        checked={selectedPriceRanges.includes(range.label)}
                        onChange={() => handlePriceRangeToggle(range.label)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={`price-${range.label}`} className="ml-2 text-sm text-gray-700">
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Selected Filters */}
            {(selectedColors.length > 0 || selectedSizes.length > 0 || selectedSleeves.length > 0 || selectedPriceRanges.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedColors.map(color => (
                  <div key={`color-${color}`} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    {color}
                    <button 
                      onClick={() => removeFilter('color', color)}
                      className="ml-1 text-gray-500 hover:text-black"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {selectedSizes.map(size => (
                  <div key={`size-${size}`} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    {size}
                    <button 
                      onClick={() => removeFilter('size', size)}
                      className="ml-1 text-gray-500 hover:text-black"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {selectedSleeves.map(sleeveType => (
                  <div key={`sleeves-${sleeveType}`} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    {sleeveType}
                    <button 
                      onClick={() => removeFilter('sleeves', sleeveType)}
                      className="ml-1 text-gray-500 hover:text-black"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {selectedPriceRanges.map(range => (
                  <div key={`price-${range}`} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    {range}
                    <button 
                      onClick={() => removeFilter('price', range)}
                      className="ml-1 text-gray-500 hover:text-black"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">SHIRTS</h1>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="default">Sort by: Select...</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-gray-100 rounded-lg p-12 text-center">
                <p className="text-gray-500">No products match your filters</p>
                <button 
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div
                    key={product._id}
                    className="group relative"
                    onMouseEnter={() => setHoveredProduct(product._id!)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="aspect-[3/4] bg-gray-100 mb-2 overflow-hidden rounded-md relative">
                      {/* New Arrival Badge */}
                      {product.isNewArrival && (
                        <div className="absolute top-2 left-2 z-10">
                          <span className="bg-black text-white px-2 py-1 text-xs font-bold rounded">
                            NEW ARRIVAL
                          </span>
                        </div>
                      )}
                      
                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(product._id!)}
                        className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            favorites.includes(product._id!) 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-600'
                          }`} 
                        />
                      </button>

                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-300 ${hoveredProduct === product._id ? 'scale-110' : 'scale-100'}`}
                      />
                    </div>
                    
                    <div className="mt-4">
                      {/* Rating */}
                      {product.rating && (
                        <div className="flex items-center space-x-1 mb-2">
                          <div className="flex items-center">
                            {renderStars(product.rating)}
                          </div>
                          <span className="text-sm text-gray-600">
                            {product.rating} ({product.reviews || 0})
                          </span>
                        </div>
                      )}
                      
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                        {product.originalPrice && (
                          <>
                            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                            {product.discount && (
                              <span className="text-sm text-green-600 font-medium">{product.discount}</span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shirts;