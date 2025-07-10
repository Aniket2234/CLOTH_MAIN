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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.image) {
      setAlert({
        isOpen: true,
        title: 'Missing Information',
        message: 'Please fill in all required fields.',
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
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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