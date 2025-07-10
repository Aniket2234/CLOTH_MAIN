import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ProductFilter as FilterType } from '../types/Product';

interface ProductFilterProps {
  onFilterChange: (filters: FilterType) => void;
  activeFilters: FilterType;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange, activeFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    color: true,
    price: true,
    size: true,
    sleeves: true
  });

  const colors = [
    { name: 'Brown', color: '#8B4513' },
    { name: 'Blue', color: '#0066CC' },
    { name: 'Navy Blue', color: '#000080' },
    { name: 'Light Blue', color: '#87CEEB' },
    { name: 'Black', color: '#000000' },
    { name: 'Orange', color: '#FFA500' },
    { name: 'Yellow', color: '#FFFF00' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Red', color: '#FF0000' },
    { name: 'Green', color: '#008000' },
    { name: 'Purple', color: '#800080' },
    { name: 'Pink', color: '#FFC0CB' },
    { name: 'Grey', color: '#808080' },
    { name: 'Beige', color: '#F5F5DC' }
  ];

  const priceRanges = [
    '₹0.00 - ₹499.99',
    '₹500.00 - ₹999.99',
    '₹1,000.00 - ₹1,499.99',
    '₹1,500.00 - ₹1,999.99'
  ];

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

  return (
    <div className="w-64 bg-white p-6 space-y-6">
      {/* Color Filter */}
      <FilterSection title="COLOR" sectionKey="color">
        <div className="space-y-2">
          {colors.map((colorItem) => (
            <label key={colorItem.name} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.colors.includes(colorItem.name)}
                onChange={() => handleColorChange(colorItem.name)}
                className="sr-only"
              />
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    colorItem.name === 'White' ? 'border-gray-300' : 'border-gray-200'
                  } ${
                    activeFilters.colors.includes(colorItem.name) 
                      ? 'ring-2 ring-black ring-offset-1' 
                      : ''
                  }`}
                  style={{ backgroundColor: colorItem.color }}
                />
                <span className="text-sm text-gray-700">{colorItem.name}</span>
              </div>
            </label>
          ))}
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            +15 more
          </button>
        </div>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection title="PRICE" sectionKey="price">
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.priceRanges.includes(range)}
                onChange={() => handlePriceChange(range)}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="ml-3 text-sm text-gray-700">{range}</span>
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
    </div>
  );
};

export default ProductFilter;