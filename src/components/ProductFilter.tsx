import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { ProductFilter as FilterType } from '../types/Product';

interface ProductFilterProps {
  onFilterChange: (filters: FilterType) => void;
  activeFilters: FilterType;
  showSleeves?: boolean;
  priceRanges?: Array<{ min: number; max: number; label: string }>;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  onFilterChange, 
  activeFilters, 
  showSleeves = true,
  priceRanges = [
    { min: 0, max: 499.99, label: '₹0.00 - ₹499.99' },
    { min: 500, max: 999.99, label: '₹500.00 - ₹999.99' },
    { min: 1000, max: 1499.99, label: '₹1000.00 - ₹1499.99' },
    { min: 1500, max: 1999.99, label: '₹1500.00 - ₹1999.99' },
  ]
}) => {
  const [expandedSections, setExpandedSections] = useState({
    color: true,
    price: true,
    size: true,
    sleeves: true
  });
  const [showAllColors, setShowAllColors] = useState(false);

  // All available colors
  const allColors = ['Brown', 'Blue', 'Navy Blue', 'Light Blue', 'Black', 'Orange', 'Yellow', 
                    'Red', 'Green', 'Purple', 'Pink', 'Grey', 'Maroon', 'Teal', 'Olive', 
                    'Lime', 'Aqua', 'Silver', 'Navy', 'Fuchsia', 'Coral', 'Indigo', 'White'];
  
  const displayColors = showAllColors ? allColors : allColors.slice(0, 7);
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];
  const sleeves = ['Full Sleeves', 'Half Sleeves'];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleColorChange = (color: string) => {
    const newColors = activeFilters.colors.includes(color)
      ? activeFilters.colors.filter(c => c !== color)
      : [...activeFilters.colors, color];
    
    onFilterChange({
      ...activeFilters,
      colors: newColors
    });
  };

  const handlePriceChange = (priceRange: string) => {
    const newPriceRanges = activeFilters.priceRanges.includes(priceRange)
      ? activeFilters.priceRanges.filter(p => p !== priceRange)
      : [...activeFilters.priceRanges, priceRange];
    
    onFilterChange({
      ...activeFilters,
      priceRanges: newPriceRanges
    });
  };

  const handleSizeChange = (size: string) => {
    const newSizes = activeFilters.sizes.includes(size)
      ? activeFilters.sizes.filter(s => s !== size)
      : [...activeFilters.sizes, size];
    
    onFilterChange({
      ...activeFilters,
      sizes: newSizes
    });
  };

  const handleSleeveChange = (sleeve: string) => {
    const newSleeves = activeFilters.sleeves.includes(sleeve)
      ? activeFilters.sleeves.filter(s => s !== sleeve)
      : [...activeFilters.sleeves, sleeve];
    
    onFilterChange({
      ...activeFilters,
      sleeves: newSleeves
    });
  };

  const resetFilters = () => {
    onFilterChange({
      colors: [],
      priceRanges: [],
      sizes: [],
      sleeves: []
    });
  };

  const removeFilter = (type: string, value: string) => {
    switch(type) {
      case 'color':
        handleColorChange(value);
        break;
      case 'price':
        handlePriceChange(value);
        break;
      case 'size':
        handleSizeChange(value);
        break;
      case 'sleeves':
        handleSleeveChange(value);
        break;
    }
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
      'Grey': '#808080',
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

  const FilterSection: React.FC<{
    title: string;
    sectionKey: keyof typeof expandedSections;
    children: React.ReactNode;
  }> = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
          {title}
        </h3>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-3">
          {children}
        </div>
      )}
    </div>
  );

  const hasActiveFilters = activeFilters.colors.length > 0 || 
                          activeFilters.priceRanges.length > 0 || 
                          activeFilters.sizes.length > 0 || 
                          activeFilters.sleeves.length > 0;

  return (
    <div className="w-64 bg-white p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">FILTERS</h2>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            RESET
          </button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {activeFilters.colors.map(color => (
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
            {activeFilters.priceRanges.map(range => (
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
            {activeFilters.sizes.map(size => (
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
            {activeFilters.sleeves.map(sleeve => (
              <div key={`sleeve-${sleeve}`} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                {sleeve}
                <button 
                  onClick={() => removeFilter('sleeves', sleeve)}
                  className="ml-1 text-gray-500 hover:text-black"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Color Filter */}
      <FilterSection title="COLOR" sectionKey="color">
        <div className="space-y-2">
          {displayColors.map((colorItem) => (
            <label key={colorItem} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.colors.includes(colorItem)}
                onChange={() => handleColorChange(colorItem)}
                className="sr-only"
              />
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    colorItem === 'White' ? 'border-gray-300' : 'border-gray-200'
                  } ${
                    activeFilters.colors.includes(colorItem) 
                      ? 'ring-2 ring-black ring-offset-1' 
                      : ''
                  }`}
                  style={{ backgroundColor: getColorHex(colorItem) }}
                />
                <span className="text-sm text-gray-700">{colorItem}</span>
              </div>
            </label>
          ))}
          {allColors.length > 7 && (
            <button 
              onClick={() => setShowAllColors(!showAllColors)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              {showAllColors ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  +{allColors.length - 7} more
                </>
              )}
            </button>
          )}
        </div>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection title="PRICE" sectionKey="price">
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.priceRanges.includes(range.label)}
                onChange={() => handlePriceChange(range.label)}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="ml-3 text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Size Filter */}
      <FilterSection title="SIZE" sectionKey="size">
        <div className="space-y-2">
          {sizes.map((size) => (
            <label key={size} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.sizes.includes(size)}
                onChange={() => handleSizeChange(size)}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="ml-3 text-sm text-gray-700">{size}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Sleeves Filter */}
      {showSleeves && (
        <FilterSection title="SLEEVES" sectionKey="sleeves">
          <div className="space-y-2">
            {sleeves.map((sleeve) => (
              <label key={sleeve} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.sleeves.includes(sleeve)}
                  onChange={() => handleSleeveChange(sleeve)}
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="ml-3 text-sm text-gray-700">{sleeve}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  );
};

export default ProductFilter;