// Simple navigation utility for handling page routing
export const navigateToPage = (pageName: string) => {
  // Create a simple hash-based routing system
  window.location.hash = `#/${pageName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  
  // Trigger a custom event to handle navigation
  window.dispatchEvent(new CustomEvent('navigate', { detail: { page: pageName } }));
};

export const getPageFromHash = (): string => {
  const hash = window.location.hash.slice(2); // Remove '#/'
  return hash || 'home';
};