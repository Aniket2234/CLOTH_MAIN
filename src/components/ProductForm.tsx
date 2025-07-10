import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { Upload, X } from 'lucide-react';
import { Product } from '../types/Product';

const ProductForm = () => {
  const { addProduct, loading } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'shirts' as Product['category'],
    description: '',
    image: '',
    sizes: [] as string[],
    colors: [] as string[],
    sleeves: 'full-sleeves' as 'full-sleeves' | 'half-sleeves',
    isNewArrival: false,
    inStock: true
  });

  const [newSize, setNewSize] = useState('');
  const [newColor, setNewColor] = useState('');
  const [success, setSuccess] = useState(false);

  const categories = [
    { value: 't-shirts', label: 'T-Shirts' },
    { value: 'shirts', label: 'Shirts' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'jackets', label: 'Jackets' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const commonSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];
  const commonColors = ['Black', 'White', 'Blue', 'Navy Blue', 'Light Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown', 'Grey', 'Beige'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const addSize = (size: string) => {
    if (size && !formData.sizes.includes(size)) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, size]
      }));
    }
    setNewSize('');
  };

  const removeSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== size)
    }));
  };

  const addColor = (color: string) => {
    if (color && !formData.colors.includes(color)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, color]
      }));
    }
    setNewColor('');
  };

  const removeColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.image || formData.sizes.length === 0 || formData.colors.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    const productData: Omit<Product, '_id'> = {
      name: formData.name,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      discount: formData.originalPrice ? `${Math.round((1 - parseFloat(formData.price) / parseFloat(formData.originalPrice)) * 100)}% OFF` : undefined,
      category: formData.category,
      description: formData.description,
      image: formData.image,
      sizes: formData.sizes,
      colors: formData.colors,
      sleeves: formData.sleeves,
      isNewArrival: formData.isNewArrival,
      inStock: formData.inStock
    };

    try {
      await addProduct(productData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        originalPrice: '',
        category: 'shirts',
        description: '',
        image: '',
        sizes: [],
        colors: [],
        sleeves: 'full-sleeves',
        isNewArrival: false,
        inStock: true
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">Product added successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (₹) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Price (₹)
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sleeves
            </label>
            <select
              name="sleeves"
              value={formData.sleeves}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="full-sleeves">Full Sleeves</option>
              <option value="half-sleeves">Half Sleeves</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Sizes *
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {commonSizes.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => addSize(size)}
                className={`px-3 py-1 text-sm border rounded-lg transition-colors duration-200 ${
                  formData.sizes.includes(size)
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              placeholder="Custom size"
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="button"
              onClick={() => addSize(newSize)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.sizes.map(size => (
              <span
                key={size}
                className="inline-flex items-center px-2 py-1 text-xs bg-black text-white rounded-full"
              >
                {size}
                <button
                  type="button"
                  onClick={() => removeSize(size)}
                  className="ml-1 hover:text-gray-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Colors *
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {commonColors.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => addColor(color)}
                className={`px-3 py-1 text-sm border rounded-lg transition-colors duration-200 ${
                  formData.colors.includes(color)
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              placeholder="Custom color"
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="button"
              onClick={() => addColor(newColor)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.colors.map(color => (
              <span
                key={color}
                className="inline-flex items-center px-2 py-1 text-xs bg-black text-white rounded-full"
              >
                {color}
                <button
                  type="button"
                  onClick={() => removeColor(color)}
                  className="ml-1 hover:text-gray-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isNewArrival"
              checked={formData.isNewArrival}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Mark as New Arrival</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">In Stock</span>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;