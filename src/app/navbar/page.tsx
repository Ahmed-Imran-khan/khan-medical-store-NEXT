"use client";

import Link from "next/link";
import { useAppSelector } from "../redux/hooks";

export default function Navbar() {
  const noOfBooks = useAppSelector((state) => state.NumberOfMedicine);
  return (
    <div className="flex justify-center">
      <div
        className="fixed top-10 p-0 pb-1 shadow-lg shadow-cyan-500/50 rounded"
        style={{
          backgroundColor: "rgb(51 52 52 / 37%)",
          zIndex: 999,
          width: "70%",
        }}
      >
        <div className="flex flex-wrap md:flex-nowrap pl-4 items-center">
          <img src="./kmlogo.png" className="h-10 w-auto" />

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
              </Link>
            </div>
            <div>
              <Link
                href="/admin"
                className="ml-5 text-light hidden md:block"
                style={{ textDecoration: "none" }}
              >
                Admin &#128100;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
