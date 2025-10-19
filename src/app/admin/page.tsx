"use client";
import Link from "next/link";
import Navbar from "../navbar/page";
import { useState, useEffect } from "react";

export default function Admin() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        });
    }, 1000);
  }, []);

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

  // Fetch Products
  async function fetchProducts() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setProduct(data);
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, name, description, price: Number(price) }),
    });
    const data = await res.json();
    console.log("POST response:", data); // 👈 log API response
    if (!res.ok) {
      alert("Error: " + (data.error || "Failed to add product"));
      return;
    }
    setImage("");
    setName("");
    setDescription("");
    setPrice("");
    fetchProducts();
  }

  return (
    <div>
      <Navbar />
      <nav aria-label="breadcrumb" className="m-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            Admin
          </li>
          <li className="breadcrumb-item">
            <Link href="/orders">Orders</Link>
          </li>
        </ol>
      </nav>
      <div className="m-5 flex justify-center items-center">
        <h1 style={{ fontWeight: "bolder" }} className="FONT">
          ADD PRODUCTS
        </h1>
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={addProduct}
          className="flex justify-evenly flex-wrap align-items-center"
        >
          <input
            type="url"
            name="p-image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
            className="text-black rounded m-2"
          />
          <input
            type="text"
            name="p-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="text-black rounded m-2"
          />
          <input
            type="text"
            name="p-des"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Details"
            className="text-black rounded m-2"
          />
          <input
            type="text"
            name="p-price"
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

      <div className="row p-0 mx-0 flex justify-center content-center my-5">
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
  );
}
