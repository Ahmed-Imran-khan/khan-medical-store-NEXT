"use client";
import Link from "next/link";
import Navbar from "../navbar/page";
import { useState, useEffect } from "react";

export default function Admin() {
  const [view, setView] = useState<"products" | "orders">("products");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const correctPassword = "admin123";

  // product states
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<
    {
      id: number;
      image: string;
      name: string;
      description: string;
      price: number;
    }[]
  >([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // order states
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
  const [orders, setOrders] = useState<Order[]>([]);

  // fetch products
  async function fetchProducts() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setProduct(data);
    setLoading(false);
  }

  // fetch orders
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
    if (!isAuthorized) return;
    if (view === "products") fetchProducts();
    if (view === "orders") fetchOrders();
  }, [isAuthorized, view]);

  // add product
  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, name, description, price: Number(price) }),
    });
    const data = await res.json();
    if (!res.ok) return alert("Error adding product");
    setImage("");
    setName("");
    setDescription("");
    setPrice("");
    fetchProducts();
  }

  // password check
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (passwordInput === correctPassword) setIsAuthorized(true);
    else alert("Incorrect password");
  }

  if (!isAuthorized)
    return (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col items-center">
            <input
              type="password"
              placeholder="Enter admin password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="border rounded px-3 py-2 mb-3 text-black"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );

  return (
    <div>
      <Navbar />
      <div className="flex justify-center gap-4 mb-5 mt-5 pt-5">
        <button
          onClick={() => setView("products")}
          className={`px-4 py-2 rounded ${
            view === "products" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setView("orders")}
          className={`px-4 py-2 rounded ${
            view === "orders" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Orders
        </button>
      </div>

      {view === "products" ? (
        <div>
          <div className="m-5 flex justify-center items-center">
            <h1 className="font-bold">ADD PRODUCTS</h1>
          </div>
          <div className="flex justify-center">
            <form
              onSubmit={addProduct}
              className="flex justify-evenly flex-wrap align-items-center"
            >
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
                className="text-black rounded m-2"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="text-black rounded m-2"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details"
                className="text-black rounded m-2"
              />
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="text-black rounded m-2"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 h-9 rounded"
              >
                Add
              </button>
            </form>
          </div>

          <div className="row p-0 mx-0 flex justify-center content-center my-5 px-5">
            <table className="w-md px-5 col-lg-8 col-12">
              <thead>
                <tr className="text-black">
                  <td>Image</td>
                  <td>Name</td>
                  <td>Details</td>
                  <td>Price</td>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? [...Array(3)].map((_, i) => (
                      <tr key={i}>
                        <td className="border px-3 py-1">
                          <div className="w-10 h-10 bg-gray-200 animate-pulse rounded" />
                        </td>
                        <td className="border px-3 py-1">
                          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                        </td>
                        <td className="border px-3 py-1">
                          <div className="h-4 w-40 bg-gray-200 animate-pulse rounded" />
                        </td>
                        <td className="border px-3 py-1">
                          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
                        </td>
                      </tr>
                    ))
                  : product.map((p) => (
                      <tr key={p.id} className="text-black">
                        <td className="border px-3 py-1">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 object-cover"
                          />
                        </td>
                        <td className="border px-3 py-1">{p.name}</td>
                        <td className="border px-3 py-1">{p.description}</td>
                        <td className="border px-3 py-1">{p.price}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="m-5 items-center">
          <h1 className="font-bold mb-5">Orders</h1>
          <div className="row justify-center">
            <div className="col-12 col-md-6 col-lg-6">
              {orders.map((p) => (
                <div
                  key={p.id}
                  className="border p-4 mb-4 rounded shadow bg-gray-200"
                >
                  <div className="text-black row justify-between font-bold mb-2">
                    <p className="col-6 col-md-3">
                      Customer: {p.customer_name}
                    </p>
                    <p className="col-6 col-md-3">Phone: {p.phone}</p>
                    <p className="col-6 col-md-3">Address: {p.address}</p>
                    <p className="col-6 col-md-3">Total: {p.total} Rs</p>
                  </div>
                  <h3 className="text-center mt-3 mb-2 text-danger">
                    Ordered Items
                  </h3>
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
      )}
    </div>
  );
}
