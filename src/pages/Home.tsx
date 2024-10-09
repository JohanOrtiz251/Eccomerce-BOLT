import React from 'react';
import { useQuery } from 'react-query';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const fetchProducts = async (): Promise<Product[]> => {
  // En un escenario real, aquí se haría una llamada a la API
  return [
    {
      id: '1',
      name: 'Smartphone X',
      description: 'The latest smartphone with advanced features.',
      price: 999.99,
      images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
      category: 'Electronics',
    },
    {
      id: '2',
      name: 'Laptop Pro',
      description: 'Powerful laptop for professionals.',
      price: 1499.99,
      images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
      category: 'Electronics',
    },
    {
      id: '3',
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation.',
      price: 249.99,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
      category: 'Electronics',
    },
    {
      id: '4',
      name: 'Smart Watch',
      description: 'Track your fitness and stay connected with this smart watch.',
      price: 199.99,
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
      category: 'Electronics',
    },
  ];
};

const Home: React.FC = () => {
  const { data: products, isLoading, error } = useQuery<Product[], Error>('products', fetchProducts);

  const carouselImages = [
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  ];

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;

  return (
    <div>
      <Carousel images={carouselImages} />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;