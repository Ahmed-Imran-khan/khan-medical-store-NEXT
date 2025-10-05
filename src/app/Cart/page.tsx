"use client";
import Navbar from "../navbar/page";
import Link from "next/link";
import type { RootState } from "../redux/store";
import { RemoveMed } from "../redux/action";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function Cart() {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const dispatch = useDispatch();
  const noOfBooks = useAppSelector((state) => state.NumberOfMedicine);
  const selectedCards = useAppSelector(
    (state: RootState) => state.selectedCards
  );
  return (
    <div
      className="CART-TABLE"
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <div>
        {/* {selectedCards.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div className="flex justify-center row m-0 p-0 my-5">
            <table className=" col-lg-4 col-md-6 col-sm-8 col-10 shadow-lg">
              <thead className="bg-dark text-light">
                <tr>
                  <th>Image</th>
                  <th>Prodcut</th>
                  <th>Rate</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {selectedCards.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.image}
                        className="card-img-top w-10 h-20"
                        alt="..."
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <div
                        className="btn btn-danger"
                        onClick={() => dispatch(RemoveMed(item.name))}
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-dark text-light">
                <tr className="font-extrabold">
                  <td>Total Bill : </td>
                  <td>
                    {selectedCards.reduce(
                      (total, item) => total + Number(item.price),
                      0
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )} */}
        <div
          className="row justify-center align-middle m-0 p-0 w-100"
          style={{
            height: "100vh",
          }}
        >
          {/* Left Column */}
          <div
            className="card mb-3 col-12 col-sm-6 p-5 order-2 order-sm-1"
            style={{ border: "none", height: "100%", overflowY: "auto" }}
          >
            {selectedCards.length === 0 ? (
              <p className="text-center text-gray-900">No items in cart</p>
            ) : (
              selectedCards.map((item, index) => (
                <div key={index} className="row g-0 border shadow my-2">
                  <div className="col-md-3 flex align-middle justify-center p-3">
                    <img
                      src={item.image}
                      className="img-fluid rounded-start w-20 h-30"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
                        This is a wider card with supporting
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          {item.price}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-2 flex align-middle justify-center">
                    <button>
                      <div onClick={() => dispatch(RemoveMed(item.name))}>
                        <img
                          src="../trash.svg"
                          alt="trash"
                          className="hover:w-5"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column */}
          <div
            className="col-12 col-sm-6 order-1 order-sm-2"
            style={{ backgroundColor: "rgb(28 33 32)", height: "100%" }}
          >
            <h1 className="mt-5 mb-5 text-light">Cart</h1>
            <div className="flex justify-center w-100">
              <div className="w-50">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-100 block my-4 bg-gray-300 border-0"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone No."
                  className="w-100 block my-4 bg-gray-300 border-0"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="w-100 block my-4  bg-gray-300 border-0"
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-around px-5 my-4 text-gray-400">
              <p>Total Bill :</p>
              <p>
                {selectedCards.reduce(
                  (total, item) => total + Number(item.price),
                  0
                )}
                / Rs
              </p>
            </div>
            <div className="flex justify-center-safe flex-wrap">
              <Link
                href={{
                  pathname: "/payment",
                  query: form, // sends ?name=...&phone=...&address=...
                }}
              >
                <div className="btn btn-light mx-3">Checkout</div>
              </Link>
            </div>
          </div>
        </div>
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
          <img src="./cart.png" style={{ width: "30px" }} className="" />
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
