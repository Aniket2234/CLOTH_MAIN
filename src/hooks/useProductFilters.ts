import { useState, useEffect } from 'react';
import { Product, ProductFilter } from '../types/Product';

interface UseProductFiltersProps {
  products: Product[];
  initialFilters?: ProductFilter;
}

export const useProductFilters = ({ products, initialFilters }: UseProductFiltersProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeFilters, setActiveFilters] = useState<ProductFilter>(
    initialFilters || {
      colors: [],
      priceRanges: [],
      sizes: [],
      sleeves: []
    }
  );
  const [sortOption, setSortOption] = useState<string>('default');

  useEffect(() => {
    let result = [...products];

    // Apply color filter
    if (activeFilters.colors.length > 0) {
      result = result.filter(product =>
        product.colors.some(color => activeFilters.colors.includes(color))
      );
    }

    // Apply price range filter
    if (activeFilters.priceRanges.length > 0) {
      result = result.filter(product => {
        return activeFilters.priceRanges.some(rangeLabel => {
          const cleanRange = rangeLabel.replace(/₹|,/g, '');
          const [minStr, maxStr] = cleanRange.split(' - ');
          const min = parseFloat(minStr);
          const max = parseFloat(maxStr);
          return product.price >= min && product.price <= max;
        });
      });
    }

    // Apply size filter
    if (activeFilters.sizes.length > 0) {
      result = result.filter(product =>
        product.sizes.some(size => activeFilters.sizes.includes(size))
      );
    }

    // Apply sleeves filter
    if (activeFilters.sleeves.length > 0) {
      result = result.filter(product => {
        const sleeveMap: { [key: string]: string } = {
          'Full Sleeves': 'full-sleeves',
          'Half Sleeves': 'half-sleeves'
        };
        return activeFilters.sleeves.some(sleeve => 
          product.sleeves === sleeveMap[sleeve]
        );
      });
    }

    // Apply sorting
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
      case 'name-a-z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, activeFilters, sortOption]);

  const resetFilters = () => {
    setActiveFilters({
      colors: [],
      priceRanges: [],
      sizes: [],
      sleeves: []
    });
    setSortOption('default');
  };

  return {
    filteredProducts,
    activeFilters,
    setActiveFilters,
    sortOption,
    setSortOption,
    resetFilters
  };
};