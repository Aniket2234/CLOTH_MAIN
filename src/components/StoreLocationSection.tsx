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
    window.open('https://www.google.com/maps/place/Nikzone+Mens+Beautiq/@19.2178555,73.143845,17z/data=!3m1!4b1!4m6!3m5!1s0x3be795cc246a1e07:0x51423a878bd662b4!8m2!3d19.2178555!4d73.143845!16s%2Fg%2F11t0vzx_t2?entry=ttu&g_ep=EgoyMDI1MDcwNy4wIKXMDSoASAFQAw%3D%3D', '_blank');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Visit Our Store</h2>
          <div className="w-16 h-1 bg-red-500 mx-auto"></div>
          <p className="text-lg text-gray-600 mt-4">Experience our collection in person at our flagship store</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Google Map */}
          <div className="relative">
            <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.8234567890123!2d73.143845!3d19.2178555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795cc246a1e07%3A0x51423a878bd662b4!2sNikzone%20Mens%20Beautiq!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-96 lg:h-[500px]"
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
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{storeDetails.name}</h3>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Store Address</h4>
                    <p className="text-gray-600 leading-relaxed">{storeDetails.address}</p>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Phone Number</h4>
                    <a 
                      href={`tel:${storeDetails.phone}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                    >
                      {storeDetails.phone}
                    </a>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Email Address</h4>
                    <a 
                      href={`mailto:${storeDetails.email}`}
                      className="text-green-600 hover:text-green-800 transition-colors duration-200 font-medium"
                    >
                      {storeDetails.email}
                    </a>
                  </div>
                </div>
                
                {/* Store Hours */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Store Hours</h4>
                    <div className="space-y-1">
                      <p className="text-gray-600">{storeDetails.hours.weekdays}</p>
                      <p className="text-gray-600">{storeDetails.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Visit Us Today!</h4>
              <p className="text-gray-600 mb-4">
                Experience our premium collection in person. Our expert staff is ready to help you find the perfect style that suits your personality.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleGetDirections}
                  className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </button>
                <a
                  href={`tel:${storeDetails.phone}`}
                  className="border-2 border-black text-black px-6 py-3 rounded-full font-medium hover:bg-black hover:text-white transition-colors duration-200 flex items-center justify-center space-x-2"
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