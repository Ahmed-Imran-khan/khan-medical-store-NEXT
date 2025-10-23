"use client";

import Navbar from "../navbar/page";
import { useState, useEffect } from "react";
import Link from "next/link";

interface OrderItem {
  name: string;
  description: string;
  price: string | number;
  image: string;
}
interface Order {
  id: number;
  customer_name: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function fetchOrders() {
    const res = await fetch("/api/neworders");
    const data = await res.json();
    const parsed = data.map((order: any) => ({
      ...order,
      items: JSON.parse(order.items),
    }));

    setOrders(parsed);
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
        <div className="row justify-center">
          <div className="col-12 col-md-6 col-lg-6">
            {orders.map((p) => (
              <div key={p.id} className="border p-4 mb-4 rounded shadow bg-gray-200 ">
                <div className="text-black row justify-between font-bold mb-2">
                  <p className="col-6 col-md-3">Customer: {p.customer_name}</p>
                  <p className="col-6 col-md-3">Phone: {p.phone}</p>
                  <p className="col-6 col-md-3">Address: {p.address}</p>
                  <p className="col-6  col-md-3">Total: {p.total} Rs</p>
                </div>

                <h3 className="text-center mt-3 mb-2 text-danger">
                  Ordered Items
                </h3>
                {/* here */}
                <div className="pt-2 text-center text-dark">
                  {p.items.map((item: any, i: number) => (
                    <p key={i} className="text-sm">
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
