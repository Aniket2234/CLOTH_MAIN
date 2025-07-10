import React from 'react';

const EmpowerSection = () => {
  const features = [
    {
      icon: '🐅',
      title: 'Made In India',
      description: ''
    },
    {
      icon: '❤️',
      title: 'Loved by 2.5M+ customers',
      description: ''
    },
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: ''
    }
  ];

  const benefits = [
    {
      icon: '🏆',
      title: 'Premium Quality',
      description: 'All the clothing products are made from 100% premium quality fabric.'
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Highly Secured SSL-Protected Payment Gateway.'
    },
    {
      icon: '↩️',
      title: '7 Days Return',
      description: 'Return or exchange the orders within 7 days of delivery.'
    }
  ];

  return (
    <section className="py-0 bg-white">
      {/* Hero Banner */}
      <div className="relative bg-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center min-h-[400px]">
          {/* Left Features */}
          <div className="flex-1 flex flex-col justify-center space-y-8 p-8 lg:p-16">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="text-4xl">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          {/* Center Image */}
          <div className="flex-shrink-0 relative">
            <img
              src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
              alt="Fashion model"
              className="w-full max-w-md h-[400px] object-cover"
            />
          </div>
          
          {/* Right Text */}
          <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
            <div className="text-right">
              <h2 className="text-6xl lg:text-8xl font-black text-gray-900 leading-none">
                EMPOWER
              </h2>
              <p className="text-xl lg:text-2xl text-gray-600 mt-2 tracking-widest">
                YOUR LOOK!
              </p>
              {/* Decorative circles */}
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-10">
                <div className="w-64 h-64 border-2 border-gray-400 rounded-full"></div>
                <div className="w-48 h-48 border border-gray-400 rounded-full absolute top-8 left-8"></div>
                <div className="w-32 h-32 border border-gray-400 rounded-full absolute top-16 left-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmpowerSection;