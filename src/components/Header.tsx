import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { navigateToPage } from '../utils/navigation';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();

  const navigationItems = [
    'SUMMER 2025',
    'NEW ARRIVALS',
    'T-SHIRTS',
    'SHIRTS',
    'BOTTOMS',
    'JACKETS',
    'ACCESSORIES'
  ];

  const handleNavClick = (item: string) => {
    navigateToPage(item);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
    // Placeholder for search logic
  };

  const handleCartClick = () => {
    navigateToPage('cart');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 whitespace-nowrap">
            <button 
              onClick={() => navigateToPage('home')}
              className="w-8 h-8 bg-black rounded-sm flex items-center justify-center hover:bg-gray-800 transition-colors duration-200"
            >
              <span className="text-white font-bold text-sm">N</span>
            </button>
            <button 
              onClick={() => navigateToPage('home')}
              className="text-xl font-bold text-black tracking-wider hover:text-gray-700 transition-colors duration-200 whitespace-nowrap"
            >
              NIKZONE&nbsp;FASHION
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200 tracking-wide whitespace-nowrap"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-72 px-4 py-2 pl-10 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>

            {/* Mobile Search Icon */}
            <button className="md:hidden p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            {/* Cart */}
            <button
              onClick={handleCartClick}
              className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="py-4 space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    handleNavClick(item);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap"
                >
                  {item}
                </button>
              ))}
              <div className="px-4 pt-3 border-t border-gray-100">
                <input
                  type="text"
                  placeholder="Search for products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;