import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Breadcrumbs from '../components/Breadcrumbs';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [shippingAddress, setShippingAddress] = useState({
    name: user?.displayName || '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar el pedido
    console.log('Order placed', { cart, shippingAddress, total });
    clearCart();
    navigate('/order-confirmation');
  };

  if (cart.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={shippingAddress.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 dark:text-gray-300 mb-2">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-700 dark:text-gray-300 mb-2">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingAddress.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="postalCode" className="block text-gray-700 dark:text-gray-300 mb-2">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-gray-700 dark:text-gray-300 mb-2">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={shippingAddress.country}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Place Order
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
              <span className="text-gray-800 dark:text-white">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-300">Shipping</span>
              <span className="text-gray-800 dark:text-white">Free</span>
            </div>
            <div className="flex justify-between text-lg font-semibold mt-4">
              <span className="text-gray-800 dark:text-white">Total</span>
              <span className="text-gray-800 dark:text-white">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;