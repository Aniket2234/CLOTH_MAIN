import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '../types/Product';
import { useProducts } from '../contexts/ProductContext';
import CustomAlert from './CustomAlert';

interface ProductEditModalProps {
  product: Product;
  onClose: () => void;
  onSave: () => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({ product, onClose, onSave }) => {
  const { updateProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price.toString(),
    originalPrice: product.originalPrice?.toString() || '',
    category: product.category,
    description: product.description || '',
    image: product.image,
    sizes: [...product.sizes],
    colors: [...product.colors],
    sleeves: product.sleeves || 'full-sleeves',
    isNewArrival: product.isNewArrival || false,
    inStock: product.inStock
  });

  const [newSize, setNewSize] = useState('');
  const [newColor, setNewColor] = useState('');
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const categories = [
    { value: 't-shirts', label: 'T-Shirts' },
    { value: 'shirts', label: 'Shirts' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'jackets', label: 'Jackets' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const commonSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', '4XL', '5XL', '28', '30', '32', '34', '36', '38', '40', '42'];
  const commonColors = [
    'Black', 'White', 'Blue', 'Navy Blue', 'Light Blue', 'Red', 'Green', 'Yellow', 
    'Orange', 'Purple', 'Pink', 'Brown', 'Grey', 'Beige', 'Maroon', 'Teal', 'Olive', 
    'Lime', 'Aqua', 'Silver', 'Navy', 'Fuchsia', 'Coral', 'Indigo'
  ];

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
      setAlert({
        isOpen: true,
        title: 'Missing Information',
        message: 'Please fill in all required fields including name, price, image, sizes, and colors.',
        type: 'warning'
      });
      return;
    }

    try {
      const updatedProduct: Partial<Product> = {
        name: formData.name,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        discount: formData.originalPrice ? `${Math.round((1 - parseFloat(formData.price) / parseFloat(formData.originalPrice)) * 100)}% OFF` : undefined,
        category: formData.category as Product['category'],
        description: formData.description,
        image: formData.image,
        sizes: formData.sizes,
        colors: formData.colors,
        sleeves: formData.sleeves as 'full-sleeves' | 'half-sleeves',
        isNewArrival: formData.isNewArrival,
        inStock: formData.inStock
      };

      await updateProduct(product._id!, updatedProduct);
      setAlert({
        isOpen: true,
        title: 'Success',
        message: 'Product updated successfully!',
        type: 'success'
      });
      
      setTimeout(() => {
        onSave();
      }, 1500);
    } catch (error) {
      console.error('Error updating product:', error);
      setAlert({
        isOpen: true,
        title: 'Error',
        message: 'Error updating product. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
        
        <CustomAlert
          isOpen={alert.isOpen}
          onClose={() => setAlert(prev => ({ ...prev, isOpen: false }))}
          title={alert.title}
          message={alert.message}
          type={alert.type}
        />
      </div>
    </div>
  );
};

export default ProductEditModal;