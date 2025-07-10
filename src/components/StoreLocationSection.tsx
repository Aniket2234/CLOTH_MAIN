import React from 'react';
import { MapPin, Phone, Clock, Mail, Navigation, ExternalLink, Map } from 'lucide-react';

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

  const handleViewMap = () => {
    window.open(`https://www.google.com/maps/@${storeDetails.coordinates.lat},${storeDetails.coordinates.lng},17z`, '_blank');
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Visit Our Store</h2>
          <div className="w-16 h-1 bg-red-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Interactive Map Area */}
          <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-video relative bg-gradient-to-br from-blue-50 to-green-50">
              {/* Map Placeholder with Store Location Visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <MapPin className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Nikzone Mens Beautiq</h3>
                  <p className="text-sm text-gray-600 mb-4">Kalpataru Complex, Nashik</p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Map className="w-4 h-4" />
                    <span>Click below to view live map</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative Map Grid */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-gray-300"></div>
                  ))}
                </div>
              </div>
              
              {/* Store Location Indicator */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                <div className="absolute top-0 left-0 w-4 h-4 bg-red-600 rounded-full"></div>
              </div>
            </div>
            
            {/* Map Action Buttons */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={handleViewMap}
                className="bg-white text-gray-700 px-3 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-all duration-200 flex items-center space-x-1 shadow-lg border border-gray-200"
                title="View Live Map"
              >
                <Map className="w-4 h-4" />
                <span className="hidden sm:inline">Live Map</span>
              </button>
              <button
                onClick={handleGetDirections}
                className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <Navigation className="w-4 h-4" />
                <span>Directions</span>
              </button>
            </div>
            
            {/* Click to Open Map Overlay */}
            <button
              onClick={handleViewMap}
              className="absolute inset-0 w-full h-full bg-transparent hover:bg-black hover:bg-opacity-5 transition-all duration-200 flex items-center justify-center group"
            >
              <div className="bg-black bg-opacity-0 group-hover:bg-opacity-80 text-white px-6 py-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100">
                <div className="flex items-center space-x-2">
                  <Map className="w-5 h-5" />
                  <span className="font-medium">Open Live Map</span>
                </div>
              </div>
            </button>
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
                onClick={handleViewMap}
                className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Map className="w-4 h-4" />
                <span>View Live Map</span>
              </button>
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
        
        {/* Map Access Options */}
        <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Find Us Easily</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleViewMap}
              className="flex items-center justify-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 group"
            >
              <Map className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-left">
                <div className="font-semibold text-blue-900">View Live Map</div>
                <div className="text-sm text-blue-600">Interactive Google Maps</div>
              </div>
            </button>
            
            <button
              onClick={handleGetDirections}
              className="flex items-center justify-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 group"
            >
              <Navigation className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-left">
                <div className="font-semibold text-green-900">Get Directions</div>
                <div className="text-sm text-green-600">Turn-by-turn navigation</div>
              </div>
            </button>
            
            <button
              onClick={handleCallStore}
              className="flex items-center justify-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200 group"
            >
              <Phone className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-left">
                <div className="font-semibold text-purple-900">Call Store</div>
                <div className="text-sm text-purple-600">Speak with our team</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocationSection;