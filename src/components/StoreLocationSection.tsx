import React from 'react';
import { MapPin, Phone, Clock, Mail, Navigation, ExternalLink } from 'lucide-react';

const StoreLocationSection = () => {
  const storeDetails = {
    name: 'Nikzone Mens Beautiq',
    address: 'Shop No. 15, Ground Floor, Kalpataru Complex, Near City Mall, Nashik, Maharashtra 422001',
    phone: '+91 9876543210',
    email: 'info@nikzone.in',
    hours: {
      weekdays: 'Mon - Sat: 10:00 AM - 9:00 PM',
      sunday: 'Sunday: 11:00 AM - 8:00 PM'
    },
    coordinates: {
      lat: 19.2178555,
      lng: 73.143845
    }
  };

  const handleGetDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${storeDetails.coordinates.lat},${storeDetails.coordinates.lng}`, '_blank');
  };

  const handleCallStore = () => {
    window.open(`tel:${storeDetails.phone}`);
  };

  const handleOpenInMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${storeDetails.coordinates.lat},${storeDetails.coordinates.lng}`, '_blank');
  };

  // OpenStreetMap embed URL - this always works without API keys
  const osmMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${storeDetails.coordinates.lng-0.01},${storeDetails.coordinates.lat-0.01},${storeDetails.coordinates.lng+0.01},${storeDetails.coordinates.lat+0.01}&layer=mapnik&marker=${storeDetails.coordinates.lat},${storeDetails.coordinates.lng}`;

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Visit Our Store</h2>
          <div className="w-16 h-1 bg-red-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Interactive Map */}
          <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-video relative">
              {/* OpenStreetMap Embed */}
              <iframe
                src={osmMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                title="Nikzone Mens Beautiq Location"
                className="rounded-lg"
                loading="lazy"
              />
              
              {/* Map Overlay with Store Info */}
              <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <h4 className="font-semibold text-sm text-gray-900">Nikzone Mens Beautiq</h4>
                </div>
                <p className="text-xs text-gray-600">Kalpataru Complex, Nashik</p>
              </div>
            </div>
            
            {/* Map Action Buttons */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={handleOpenInMaps}
                className="bg-white text-gray-700 px-3 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-all duration-200 flex items-center space-x-1 shadow-lg border border-gray-200"
                title="Open in Google Maps"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">View Larger</span>
              </button>
              <button
                onClick={handleGetDirections}
                className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <Navigation className="w-4 h-4" />
                <span>Directions</span>
              </button>
            </div>
          </div>
          
          {/* Store Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{storeDetails.name}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-red-500" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900">Address</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{storeDetails.address}</p>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-500" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900">Phone</h4>
                  <button 
                    onClick={handleCallStore}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                  >
                    {storeDetails.phone}
                  </button>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-green-500" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900">Email</h4>
                  <a 
                    href={`mailto:${storeDetails.email}`}
                    className="text-sm text-green-600 hover:text-green-800 transition-colors duration-200 font-medium"
                  >
                    {storeDetails.email}
                  </a>
                </div>
              </div>
              
              {/* Store Hours */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-500" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900">Hours</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">{storeDetails.hours.weekdays}</p>
                    <p className="text-sm text-gray-600">{storeDetails.hours.sunday}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={handleGetDirections}
                className="flex-1 bg-black text-white px-4 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Directions</span>
              </button>
              <button
                onClick={handleCallStore}
                className="flex-1 border border-black text-black px-4 py-3 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleOpenInMaps}
                className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Maps</span>
              </button>
            </div>
            
            {/* Visit Us Today Section */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Visit Us Today!</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Experience our premium collection in person. Our expert staff is ready to help you find the perfect style that suits your personality.
              </p>
            </div>
          </div>
        </div>
        
        {/* Additional Map Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Can't see the map? <button 
              onClick={handleOpenInMaps}
              className="text-blue-600 hover:text-blue-800 underline font-medium"
            >
              Click here to open in Google Maps
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default StoreLocationSection;