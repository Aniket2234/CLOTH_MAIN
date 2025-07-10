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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Visit Our Store</h2>
          <div className="w-16 h-1 bg-red-500 mx-auto"></div>
          <p className="text-gray-600 mt-3">Experience our collection in person at our flagship store</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Google Map */}
          <div className="relative">
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.823!2d73.1416!3d19.2179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795cc246a1e07%3A0x51423a878bd662b4!2sNikzone%20Mens%20Beautiq!5e0!3m2!1sen!2sin!4v1641234567890!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-80 lg:h-[350px]"
                title="Nikzone Mens Beautiq Location"
              ></iframe>
            </div>
            
            {/* Map Overlay Button */}
            <button
              onClick={handleGetDirections}
              className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2 shadow-lg"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </button>
          </div>
          
          {/* Store Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{storeDetails.name}</h3>
              
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Store Address</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{storeDetails.address}</p>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone Number</h4>
                    <a 
                      href={`tel:${storeDetails.phone}`}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                    >
                      {storeDetails.phone}
                    </a>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Address</h4>
                    <a 
                      href={`mailto:${storeDetails.email}`}
                      className="text-sm text-green-600 hover:text-green-800 transition-colors duration-200 font-medium"
                    >
                      {storeDetails.email}
                    </a>
                  </div>
                </div>
                
                {/* Store Hours */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Store Hours</h4>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">{storeDetails.hours.weekdays}</p>
                      <p className="text-sm text-gray-600">{storeDetails.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Visit Us Today!</h4>
              <p className="text-sm text-gray-600 mb-4">
                Experience our premium collection in person. Our expert staff is ready to help you find the perfect style that suits your personality.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleGetDirections}
                  className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </button>
                <a
                  href={`tel:${storeDetails.phone}`}
                  className="border-2 border-black text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocationSection;