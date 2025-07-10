import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import AdminPanel from './AdminPanel';

const AdminButton = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowAdminPanel(true)}
        className="fixed top-4 right-4 z-40 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-200"
        title="Admin Panel"
      >
        <Settings className="w-5 h-5" />
      </button>
      
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </>
  );
};

export default AdminButton;