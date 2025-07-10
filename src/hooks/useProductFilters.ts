import { useState, useEffect } from 'react';
import { Product } from '../types/Product';

interface FilterOptions {
  colors: string[];
  sizes: string[];
  sleeves: string[];
  priceRanges: {
    min: number;
    max: number;
    label: string;
  }[];
  minPrice: number;
  maxPrice: number;
}

interface UseProductFiltersProps {
  products: Product[];
}

export const useProductFilters = ({ products }: UseProductFiltersProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedSleeves, setSelectedSleeves] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortOption, setSortOption] = useState<string>('default');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Generate dynamic filter options based on products
  const filterOptions: FilterOptions = {
    colors: ['Brown', 'Blue', 'Navy Blue', 'Light Blue', 'Black', 'Orange', 'Yellow',
      'Red', 'Green', 'Purple', 'Pink', 'Gray', 'Maroon', 'Teal', 'Olive',
      'Lime', 'Aqua', 'Silver', 'Navy', 'Fuchsia', 'Coral', 'Indigo', 'White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '28', '30', '32', '34', '36', '38', '40', '42'],
    sleeves: ['Full Sleeves', 'Half Sleeves', 'Sleeveless'],
    priceRanges: generatePriceRanges(products),
    minPrice: Math.min(...products.map(p => p.price), 0),
    maxPrice: Math.max(...products.map(p => p.price), 10000)
  };

  // Initialize price range based on products
  useEffect(() => {
    if (products.length > 0) {
      const minPrice = Math.min(...products.map(p => p.price));
      const maxPrice = Math.max(...products.map(p => p.price));
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products]);

  // Generate dynamic price ranges based on product prices
  function generatePriceRanges(products: Product[]) {
    if (products.length === 0) {
      return [
        { min: 0, max: 999, label: '₹0 - ₹999' },
        { min: 1000, max: 1999, label: '₹1000 - ₹1999' },
        { min: 2000, max: 2999, label: '₹2000 - ₹2999' },
        { min: 3000, max: 4999, label: '₹3000 - ₹4999' },
        { min: 5000, max: Infinity, label: '₹5000 & Above' }
      ];
    }

    const prices = products.map(p => p.price).sort((a, b) => a - b);
    const minPrice = prices[0];
    const maxPrice = prices[prices.length - 1];
    
    const ranges = [];
    
    // Create ranges based on price distribution
    if (minPrice < 500) {
      ranges.push({ min: 0, max: 499, label: '₹0 - ₹499' });
    }
    if (maxPrice >= 500) {
      ranges.push({ min: 500, max: 999, label: '₹500 - ₹999' });
    }
    if (maxPrice >= 1000) {
      ranges.push({ min: 1000, max: 1999, label: '₹1000 - ₹1999' });
    }
    if (maxPrice >= 2000) {
      ranges.push({ min: 2000, max: 2999, label: '₹2000 - ₹2999' });
    }
    if (maxPrice >= 3000) {
      ranges.push({ min: 3000, max: 4999, label: '₹3000 - ₹4999' });
    }
    if (maxPrice >= 5000) {
      ranges.push({ min: 5000, max: 7999, label: '₹5000 - ₹7999' });
    }
    if (maxPrice >= 8000) {
      ranges.push({ min: 8000, max: 14999, label: '₹8000 - ₹14999' });
    }
    if (maxPrice >= 15000) {
      ranges.push({ min: 15000, max: Infinity, label: '₹15000 & Above' });
    }
    
    // Always include an "& Above" option for the highest range
    const highestRange = Math.ceil(maxPrice / 1000) * 1000;
    if (highestRange > 15000) {
      ranges.push({ min: highestRange, max: Infinity, label: `₹${highestRange.toLocaleString()} & Above` });
    }

    return ranges;
  }

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

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
          'Half Sleeves': 'half-sleeves',
          'Sleeveless': 'sleeveless'
        };
        return selectedSleeves.some(sleeve => 
          product.sleeves === sleeveMap[sleeve]
        );
      });
    }

    // Price range filter (slider)
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Price range filter (predefined ranges)
    if (selectedPriceRanges.length > 0) {
      result = result.filter(product => {
        return selectedPriceRanges.some(rangeLabel => {
          const range = filterOptions.priceRanges.find(r => r.label === rangeLabel);
          if (!range) return false;
          
          if (range.max === Infinity) {
            return product.price >= range.min;
          }
          return product.price >= range.min && product.price <= range.max;
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
    priceRange,
    sortOption,
    products
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

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const removeFilter = (type: string, value: string) => {
    switch (type) {
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
    if (products.length > 0) {
      const minPrice = Math.min(...products.map(p => p.price));
      const maxPrice = Math.max(...products.map(p => p.price));
      setPriceRange([minPrice, maxPrice]);
    }
  };

  return {
    filteredProducts,
    selectedColors,
    selectedSizes,
    selectedSleeves,
    selectedPriceRanges,
    priceRange,
    sortOption,
    hoveredProduct,
    filterOptions,
    setSortOption,
    setHoveredProduct,
    handleColorToggle,
    handleSizeToggle,
    handleSleevesToggle,
    handlePriceRangeToggle,
    handlePriceRangeChange,
    removeFilter,
    resetFilters
  };
};