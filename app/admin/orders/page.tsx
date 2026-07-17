"use client";

import { Fragment, useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "@/app/actions/order";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  subtotal: number;
  status: string;
  paymentMethod: string;
  createdAt: string | Date;
  items: OrderItem[];
};

const STATUSES = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data as unknown as Order[]);
    } catch (err: any) {
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    try {
      await updateOrderStatus(id, status);
    } catch (err: any) {
      alert(err.message || "Failed to update order status");
      fetchOrders();
    }
  };

  if (loading) return <div className="text-text-secondary">Loading orders...</div>;
  if (error) return <div className="text-[#c92a2a]">{error}</div>;

  return (
    <div>
      <h1 className="font-heading text-3xl font-medium mb-8 text-text-primary">Orders</h1>

      <div className="bg-bg-primary rounded-lg shadow-sm border border-border-color overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-color bg-bg-secondary text-sm font-medium uppercase tracking-widest text-text-secondary">
              <th className="p-4">Customer</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              <th className="p-4">Placed</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <Fragment key={order.id}>
                <tr
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  className="border-b border-border-color last:border-0 hover:bg-bg-secondary transition-colors cursor-pointer"
                >
                  <td className="p-4">
                    <div className="text-text-primary font-medium">{order.name}</div>
                    <div className="text-text-light text-xs">{order.email}</div>
                  </td>
                  <td className="p-4 text-text-secondary text-sm">{order.items.length} item(s)</td>
                  <td className="p-4 text-brand-gold-dark font-medium">₹{order.subtotal.toLocaleString()}</td>
                  <td className="p-4 text-text-secondary text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-bg-secondary border border-border-color rounded-sm px-3 py-1.5 text-xs uppercase tracking-wide text-text-primary outline-none focus:border-brand-gold-dark"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                {expandedId === order.id && (
                  <tr className="border-b border-border-color bg-bg-secondary/50">
                    <td colSpan={5} className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xs uppercase tracking-widest text-text-light mb-3">Shipping Address</h3>
                          <p className="text-text-secondary text-sm leading-relaxed">
                            {order.address}, {order.city}, {order.state} {order.postalCode}
                            <br />
                            Phone: {order.phone}
                            <br />
                            Payment: {order.paymentMethod}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xs uppercase tracking-widest text-text-light mb-3">Items</h3>
                          <div className="flex flex-col gap-2">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between text-sm text-text-secondary">
                                <span>
                                  {item.name} × {item.quantity}
                                </span>
                                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-8 text-center text-text-secondary">No orders yet.</div>
        )}
      </div>
    </div>
  );
}
