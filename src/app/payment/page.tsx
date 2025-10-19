"use client";
import { Suspense } from "react";
import PaymentPage from "../payments/PaymentPage";

export default function Page() {
  return (
    // we rapped Payment page into Suspense to Show Loading if content is'nt yet loaded from server
    <Suspense fallback={<div>Loading Payment...</div>}>
      <PaymentPage />
    </Suspense>
  );
}
