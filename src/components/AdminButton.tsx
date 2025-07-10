import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import AdminPanel from './AdminPanel';

const AdminButton = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isInFooter, setIsInFooter] = useState(false);

  useEffect(() => {
    const checkFooterVisibility = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if footer is visible (at least partially)
        const isFooterVisible = footerRect.top < windowHeight && footerRect.bottom > 0;
        setIsInFooter(isFooterVisible);
      }
    };

    // Check on scroll
    window.addEventListener('scroll', checkFooterVisibility);
    // Check on initial load
    checkFooterVisibility();

    return () => {
      window.removeEventListener('scroll', checkFooterVisibility);
    };
  }, []);

  if (!isInFooter) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setShowAdminPanel(true)}
        className="fixed bottom-8 right-32 z-50 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-110"
        title="Admin Panel"
      >
        <Settings className="w-4 h-4" />
      </button>
      
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </>
  );
};

export default AdminButton;