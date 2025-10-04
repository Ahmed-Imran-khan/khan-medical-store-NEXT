"use client";

import Link from "next/link";
import { useAppSelector } from "../redux/hooks";

export default function Navbar() {
  const noOfBooks = useAppSelector((state) => state.NumberOfMedicine);
  return (
    <div
      className="sticky top-0 w-full p-0 m-0 pb-2"
      style={{ backgroundColor: "#1c2120", zIndex: 999 }}
    >
      <div className="flex flex-wrap md:flex-nowrap pl-4 items-center">
        <img src="./kmslogo.png" className="h-10 w-auto" />

        <div className="flex justify-between px-2 w-full sm:flex-1 md:min-w-0 mt-2 md:mt-0">
          <div>
            <Link
              href="/"
              className="ml-5  text-white Link"
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
            <Link
              href="/Medicine"
              className="ml-5 text-white Link"
              style={{ textDecoration: "none" }}
            >
              Medicines
            </Link>
            <Link
              href="/Cart"
              className="ml-5 text-white Link"
              style={{ textDecoration: "none", fontSize: "20px" }}
            >
              &#128722;{noOfBooks}
              {/* <img src="./cart.png" style={{ width: "10px" }} /> */}
            </Link>
          </div>
          <div>
            <Link
              href="/admin"
              className="ml-5 text-success hidden md:block"
              style={{ textDecoration: "none" }}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
