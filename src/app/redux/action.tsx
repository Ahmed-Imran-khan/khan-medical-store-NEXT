import { BuyMedicine, RemoveMedicine } from "./type";

export default function PurchaseMed(payload: any) {
  return {
    type: BuyMedicine,
    payload,
  };
}

export function RemoveMed(payload: any) {
  return {
    type: RemoveMedicine,
    payload,
  };
}
