"use client";

import Link from "next/link";
import Navbar from "../navbar/page";
import { useState, useRef } from "react";
import { useAppSelector } from "../redux/hooks";
import type { RootState } from "../redux/store";
import { useSearchParams } from "next/navigation";

const html2pdf = typeof window !== "undefined" ? require("html2pdf.js") : null;

export default function Payment() {
  const [isOrdering, setIsOrdering] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const receiptRef = useRef<HTMLDivElement>(null);

  const noOfBooks = useAppSelector((state) => state.NumberOfMedicine);
  const selectedCards = useAppSelector(
    (state: RootState) => state.selectedCards
  );

  const params = useSearchParams();
  const name = params.get("name");
  const phone = params.get("phone");
  const address = params.get("address");

  const date = new Date().toLocaleDateString("en-US");

  const total = selectedCards.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  async function confirmOrder(e: React.FormEvent) {
    e.preventDefault();
    if (isOrdering) return;
    if (!name || !phone || !address || selectedCards.length === 0) {
      alert("Missing customer details or items to order.");
      return;
    }

    setIsOrdering(true);

    const orderData = {
      customer_name: name,
      phone,
      address,
      items: selectedCards,
      total: total,
    };

    try {
      const res = await fetch("/api/neworders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + (data.error || "Failed to place order"));
        setIsOrdering(false);
        return;
      }

      alert(`Order ID ${data.orderId} placed successfully!`);
      setOrders([...orders, data]);
      window.location.href = "/";
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Unexpected error occurred.");
    } finally {
      setIsOrdering(false);
    }
  }

  function downloadPdf() {
    if (!html2pdf || !receiptRef.current) return;
    html2pdf()
      .from(receiptRef.current)
      .set({
        margin: 10,
        filename: "receipt.pdf",
        html2canvas: { scale: 3 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save();
  }

  return (
    <div>
      <Navbar />
      <h1 className="my-5 font-serif">RECEIPT</h1>
      <div className="row p-0 m-0 flex justify-center">
        <div className="mb-4 px-5 col-lg-8 col-12" ref={receiptRef}>
          <div style={{ lineHeight: "7px" }}>
            <p>
              <i>Khan Medical Store</i>
            </p>
            <p>
              <i>03214605501</i>
            </p>
            <p>
              <i>Shop No 5 Military Accounts Society College Road Lahore</i>
            </p>
            <p>
              <i>Date: {date}</i>
            </p>
          </div>
          <div className="flex justify-between mt-5 mb-2">
            <div>
              Customer Name: <span className="text-dark">{name}</span>
            </div>
            <div>
              Address: <span className="text-dark">{address}</span>
            </div>
            <div>
              Phone No: <span className="text-dark">{phone}</span>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Description</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {selectedCards.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td className="font-bold text-light bg-dark">Net Balance = </td>
                <td className="font-bold text-light bg-dark">{total} / Rs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center p-5">
        <button
          onClick={confirmOrder}
          className="btn btn-danger px-5"
          disabled={isOrdering}
        >
          {isOrdering ? "Processing..." : "Confirm Order"}
        </button>
        <button className="btn btn-info mx-3" onClick={downloadPdf}>
          Download Receipt
        </button>
      </div>

      <Link
        className="btn position-fixed shadow text-light p-2"
        href="/Cart"
        style={{
          borderRadius: "50%",
          right: "1%",
          bottom: "2%",
          backgroundColor: "rgb(28, 33, 32)",
        }}
      >
        <div
          className="position-relative"
          style={{ top: "-2px", width: "100%" }}
        >
          <img src="./cart.png" alt="cart" style={{ width: "30px" }} />
          <div
            className="value quantity position-absolute bg-danger"
            style={{
              borderRadius: "50%",
              left: "25px",
              width: "25px",
              top: "-13px",
            }}
          >
            {noOfBooks}
          </div>
        </div>
      </Link>
    </div>
  );
}
