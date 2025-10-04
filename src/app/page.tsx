import Image from "next/image";
import Navbar from "./navbar/page";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="row m-0 p-0" style={{ height: "100vh" }}>
        <div className="col-md-12 col-lg-6 p-0">
          <video
            src="./KMS.mp4"
            style={{ height: "100vh" }}
            className="w-full max-h-92 md:max-h-none object-fill"
            autoPlay
            muted
            loop
          ></video>
        </div>
        <div className="flex justify-center items-center col-md-12 col-lg-6 p-0">
          <section className="p-5 text-center">
            <h3 className="fs-1 p-5 FONT" style={{ color: "#1c2120" }}>
              LET BEGIN SHOPPING
            </h3>
            <button
              type="button"
              className="btn border border-light text-light"
              style={{ backgroundColor: "#1c2120" }}
            >
              <Link
                className="text-light FONT"
                style={{ textDecoration: "none" }}
                href="/Medicine"
              >
                ORDER NOW
              </Link>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
