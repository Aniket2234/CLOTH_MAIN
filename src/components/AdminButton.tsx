import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import AdminPanel from './AdminPanel';

const AdminButton = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowAdminPanel(true)}
        className="fixed top-4 right-4 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-110"
        title="Admin Panel"
      >
        <Settings className="w-6 h-6" />
      </button>
      
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </>
  );
};

export default AdminButton;