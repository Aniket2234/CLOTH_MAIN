import React from 'react';
import { MapPin, Phone, Clock, Mail, Navigation } from 'lucide-react';

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

  // Google Maps Embed URL with proper parameters
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.8234567890123!2d${storeDetails.coordinates.lng}!3d${storeDetails.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795cc246a1e07%3A0x51423a878bd662b4!2sNikzone%20Mens%20Beautiq!5e0!3m2!1sen!2sin!4v1640995200000!5m2!1sen!2sin`;

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Visit Our Store</h2>
          <div className="w-16 h-1 bg-red-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Live Google Map */}
          <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-video">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nikzone Mens Beautiq Location"
                className="rounded-lg"
              />
            </div>
            
            {/* Overlay Get Directions Button */}
            <button
              onClick={handleGetDirections}
              className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
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
            
            {/* Visit Us Today Section */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Visit Us Today!</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Experience our premium collection in person. Our expert staff is ready to help you find the perfect style that suits your personality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocationSection;