"use client";

import Navbar from "../navbar/page";
import { useState, useEffect } from "react";
import Link from "next/link";

interface OrderItem {
  name: string;
  description: string;
  price: string | number;
}
interface Order {
  id: number;
  customer_name: string;
  address: string;
  items: OrderItem[];
  phone: string;
  total: number;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function fetchOrders() {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <nav aria-label="breadcrumb" className="m-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            <Link href="/admin">Admin</Link>
          </li>
          <li className="breadcrumb-item">Orders</li>
        </ol>
      </nav>

      <div className="m-5 items-center">
        <h1 style={{ fontWeight: "bolder" }} className="FONT mb-5">
          Orders
        </h1>

        {orders.map((p) => (
          <div key={p.id} className="border p-4 mb-4 rounded shadow">
            <div className="text-black flex justify-between font-bold mb-2">
              <p>Customer: {p.customer_name}</p>
              <p>Phone: {p.phone}</p>
              <p>Address: {p.address}</p>
              <p>Total: {p.total} Rs</p>
            </div>

            <h3 className="text-center font-semibold mt-3 mb-2">
              Ordered Items
            </h3>
            <ul className="list-disc ml-5">
              {p.items.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between border-b last:border-b-0 py-1"
                >
                  <span className="text-black font-medium">{item.name}</span>
                  <span className="text-black font-semibold">
                    {item.price} Rs
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
