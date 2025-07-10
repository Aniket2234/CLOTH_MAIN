import React from 'react';
import { Heart } from 'lucide-react';

const NewArrivalsSection = () => {
  const products = [
    {
      id: 1,
      name: 'Dark Sky Checks Shirt',
      price: '₹999',
      image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
    },
    {
      id: 2,
      name: 'White And Black Printed Henley Shirt',
      price: '₹799',
      originalPrice: '₹999',
      discount: '(20% OFF)',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
    },
    {
      id: 3,
      name: 'Sky Grey Contrast Collar T-Shirt',
      price: '₹899',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
    },
    {
      id: 4,
      name: 'White Structure Stripe Shirt',
      price: '₹1099',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
    },
    {
      id: 5,
      name: 'Black Casual Shirt',
      price: '₹899',
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
    },
    {
      id: 6,
      name: 'Navy Blue Formal Shirt',
      price: '₹1199',
      image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
    },
    {
      id: 7,
      name: 'Grey Cotton T-Shirt',
      price: '₹699',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
    },
    {
      id: 8,
      name: 'Light Blue Casual Shirt',
      price: '₹999',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">New Arrivals</h2>
          <div className="w-16 h-1 bg-red-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[3/4]">
                {/* New Arrival Badge */}
                {product.isNewArrival && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
                      NEW ARRIVAL
                    </span>
                  </div>
                )}
                
                <button className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      <span className="text-sm text-green-600 font-medium">{product.discount}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;