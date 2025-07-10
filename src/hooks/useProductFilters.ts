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
}

interface UseProductFiltersProps {
  products: Product[];
  filterOptions: FilterOptions;
}

export const useProductFilters = ({ products, filterOptions }: UseProductFiltersProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedSleeves, setSelectedSleeves] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('default');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

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

    // Price range filter (supports multiple selections)
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
    products,
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
  };

  return {
    filteredProducts,
    selectedColors,
    selectedSizes,
    selectedSleeves,
    selectedPriceRanges,
    sortOption,
    hoveredProduct,
    setSortOption,
    setHoveredProduct,
    handleColorToggle,
    handleSizeToggle,
    handleSleevesToggle,
    handlePriceRangeToggle,
    removeFilter,
    resetFilters
  };
};