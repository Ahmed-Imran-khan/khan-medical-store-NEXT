"use client";
import { useDispatch, useSelector } from "react-redux";
import PurchaseMed from "../redux/action";
import Navbar from "../navbar/page";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { RootState } from "../redux/store";

export default function Home() {
  const noOfBooks = useSelector((state: RootState) => state.NumberOfMedicine);
  const dispatch = useDispatch();
  const [product, setProduct] = useState<
    {
      id: number;
      image: string;
      name: string;
      description: string;
      price: number;
    }[]
  >([]);

  // Fetch Products
  async function fetchProducts() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setProduct(data);
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  const search = () => {
    const input = document.getElementById("find") as HTMLInputElement;
    const filter = input.value.toUpperCase();

    const items = document.querySelectorAll(
      ".product"
    ) as NodeListOf<HTMLElement>;
    const l = document.getElementsByTagName("h5");

    for (let i = 0; i < l.length; i++) {
      const a = items[i]?.getElementsByTagName("h5")[0];
      const value = a?.innerHTML || a?.innerText || a?.textContent;

      if (value && value.toUpperCase().indexOf(filter) > -1) {
        items[i].style.display = "";
      } else {
        items[i].style.display = "none";
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="m-5 d-flex justify-content-center align-items-center">
        <h1 style={{ fontWeight: "bolder" }}>ALL AVAILABLE PRODUCTS</h1>
      </div>
      {/* seacrh bar */}
      <div className="d-flex justify-content-center pb-5">
        <div
          className="input-group mb-3 w-50 shadow"
          style={{
            borderRadius: "10px",
          }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search Medicine here"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            id="find"
            onKeyUp={search}
            style={{ backgroundColor: "white", border: "1px solid lightgrey" }}
          />
          <button
            className="btn"
            type="button"
            id="button-addon2"
            style={{ border: "1px solid lightgrey" }}
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/external-search-medical-kiranshastry-gradient-kiranshastry.png"
              alt="external-search-medical-kiranshastry-gradient-kiranshastry"
            />
          </button>
        </div>
      </div>
      {/* CARDS */}
      <div className="w-100 row row-cols-2 row-cols-sm-3 row-cols-md-6 justify-content-center">
        {product.length === 0 ? (
          <div className="text-center w-100 my-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          product.map((p) => (
            <div key={p.id} className="product col card p-0 m-3 shadow CARD">
              <div>
                <img
                  src={p.image}
                  className="card-img-top w-20 h-40"
                  alt="..."
                />
              </div>
              <div className="card-body">
                <h5 className="card-title h-5">{p.name}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>{p.price}</b>
                </li>
                <li className="list-group-item">{p.description}</li>
                <li className="list-group-item text-center">
                  <button
                    className="botton btn btn-success m-1 px-3 CARD-button"
                    onClick={() => dispatch(PurchaseMed(p))}
                  >
                    Add
                  </button>
                </li>
              </ul>
            </div>
          ))
        )}
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
          <img src="./cart.png" style={{ width: "30px" }} />
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
