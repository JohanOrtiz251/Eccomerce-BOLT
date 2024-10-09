import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ShoppingCart, Heart } from 'lucide-react';
import Slider from 'react-slick';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import Breadcrumbs from '../components/Breadcrumbs';

const fetchProduct = async (id: string): Promise<Product> => {
  // En un escenario real, aquí se haría una llamada a la API
  return {
    id,
    name: 'Smartphone X',
    description: 'The latest smartphone with advanced features. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 999.99,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    category: 'Electronics',
  };
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useQuery<Product, Error>(['product', id], () => fetchProduct(id!));
  const { addToCart } = useCart();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:sticky md:top-24">
          <Slider {...settings}>
            {product.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
              </div>
            ))}
          </Slider>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => addToCart(product, 1)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart
            </button>
            <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">
              <Heart size={20} />
            </button>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Product Details</h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              <li>High-resolution display</li>
              <li>Powerful processor</li>
              <li>Long-lasting battery</li>
              <li>Advanced camera system</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;