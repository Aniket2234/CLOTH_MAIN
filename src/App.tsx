import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import AdminButton from './components/AdminButton';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import CategoryCollections from './components/CategoryCollections';
import AppPromotion from './components/AppPromotion';
import NewDealsSection from './components/NewDealsSection';
import NewArrivalsSection from './components/NewArrivalsSection';
import HappyCustomers from './components/HappyCustomers';
import StoreLocationSection from './components/StoreLocationSection';
import Footer from './components/Footer';
import TShirts from './pages/TShirts';
import Shirts from './pages/Shirts';
import Bottoms from './pages/Bottoms';
import Jackets from './pages/Jackets';
import Accessories from './pages/Accessories';
import NewArrivals from './pages/NewArrivals';
import Summer2025 from './pages/Summer2025';
import Cart from './pages/Cart';
import { getPageFromHash } from './utils/navigation';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPage(getPageFromHash());
    };

    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };

    // Listen for custom navigation events
    window.addEventListener('navigate', handleNavigation);
    window.addEventListener('hashchange', handleHashChange);

    // Set initial page based on current hash
    setCurrentPage(getPageFromHash());

    return () => {
      window.removeEventListener('navigate', handleNavigation);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 't-shirts':
        return <TShirts />;
      case 'shirts':
        return <Shirts />;
      case 'bottoms':
        return <Bottoms />;
      case 'jackets':
        return <Jackets />;
      case 'accessories':
        return <Accessories />;
      case 'new-arrivals':
        return <NewArrivals />;
      case 'summer-2025':
        return <Summer2025 />;
      case 'cart':
        return <Cart />;
      default:
        return (
          <>
            <Header />
            <HeroCarousel />
            <CategoryCollections />
            <AppPromotion />
            <NewDealsSection />
            <NewArrivalsSection />
            <HappyCustomers />
            <StoreLocationSection />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <ProductProvider>
        <div className="min-h-screen flex flex-col">
          <AdminButton />
          <div className="flex-1">
            {renderPage()}
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;