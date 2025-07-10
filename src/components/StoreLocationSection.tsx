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
    }
  };

  const handleGetDirections = () => {
    window.open('https://www.google.com/maps/place/Nikzone+Mens+Beautiq/@19.2178555,73.143845,17z/data=!3m1!4b1!4m6!3m5!1s0x3be795cc246a1e07:0x51423a878bd662b4!8m2!3d19.2178555!4d73.143845!16s%2Fg%2F11t0vzx_t2', '_blank');
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Visit Our Store</h2>
          <div className="w-16 h-1 bg-red-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Google Map */}
          <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-video">
              <iframe
                src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=Nikzone%20Mens%20Beautiq,%20Shop%20No.%2015,%20Ground%20Floor,%20Kalpataru%20Complex,%20Near%20City%20Mall,%20Nashik,%20Maharashtra%20422001+(Nikzone%20Mens%20Beautiq)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nikzone Mens Beautiq Location"
              ></iframe>
            </div>
            
            {/* Get Directions Button */}
            <button
              onClick={handleGetDirections}
              className="absolute bottom-3 right-3 bg-black text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-1.5 shadow-md"
            >
              <Navigation className="w-3 h-3" />
              <span>Get Directions</span>
            </button>
          </div>
          
          {/* Store Information - Compact Layout */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{storeDetails.name}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-red-500" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900">Address</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{storeDetails.address}</p>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-500" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900">Phone</h4>
                  <a 
                    href={`tel:${storeDetails.phone}`}
                    className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                  >
                    {storeDetails.phone}
                  </a>
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
                    className="text-xs text-green-600 hover:text-green-800 transition-colors duration-200 font-medium"
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
                  <div className="space-y-0.5">
                    <p className="text-xs text-gray-600">{storeDetails.hours.weekdays}</p>
                    <p className="text-xs text-gray-600">{storeDetails.hours.sunday}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={handleGetDirections}
                className="flex-1 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Directions</span>
              </button>
              <a
                href={`tel:${storeDetails.phone}`}
                className="flex-1 border border-black text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocationSection;