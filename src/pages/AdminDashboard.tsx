import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Breadcrumbs from '../components/Breadcrumbs';
import { Order } from '../types';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Aquí iría la lógica para obtener las órdenes desde la base de datos
    // Por ahora, usaremos datos de ejemplo
    const mockOrders: Order[] = [
      {
        id: '1',
        userId: 'user1',
        items: [{ productId: 'prod1', quantity: 2 }],
        total: 199.98,
        status: 'pending',
        createdAt: new Date(),
        shippingAddress: {
          name: 'John Doe',
          address: '123 Main St',
          city: 'Anytown',
          postalCode: '12345',
          country: 'USA',
        },
      },
      // Más órdenes de ejemplo...
    ];
    setOrders(mockOrders);
  }, []);

  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Admin Dashboard</h1>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Orders</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600 dark:text-gray-300">
              <th className="pb-2">Order ID</th>
              <th className="pb-2">User</th>
              <th className="pb-2">Total</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-2">{order.id}</td>
                <td className="py-2">{order.shippingAddress.name}</td>
                <td className="py-2">${order.total.toFixed(2)}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                    order.status === 'processing' ? 'bg-blue-200 text-blue-800' :
                    order.status === 'shipped' ? 'bg-green-200 text-green-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-2">
                  <button className="text-blue-600 dark:text-blue-400 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;