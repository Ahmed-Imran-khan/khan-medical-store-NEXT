"use client";
import { Suspense } from "react";
import PaymentPage from "../payments/PaymentPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Payment...</div>}>
      <PaymentPage />
    </Suspense>
  );
}
