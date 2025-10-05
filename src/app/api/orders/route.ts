import { NextResponse } from "next/server";
import { database } from "@/app/lib/db";

interface OrderItem {
  name: string;
  description: string;
  price: string | number;
}
interface OrderRow {
  id: number;
  customer_name: string;
  phone: string;
  address: string;
  items: string;
  total: number;
  created_at: string; 
}

export async function GET() {
  try {
    const [rows]: [OrderRow[], any] = await database.query("SELECT * FROM orders");
    const ordersWithParsedItems = rows.map(order => ({
      ...order,
      items: JSON.parse(order.items) as OrderItem[],
    }));

    return NextResponse.json(ordersWithParsedItems);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer_name, phone, address, items, total } = body;

    if (!customer_name || !phone || !address || !items || total === undefined) {
      return NextResponse.json(
        { error: "Missing required order fields." },
        { status: 400 }
      );
    }
    const itemsJsonString = JSON.stringify(items);
    const query = `
      INSERT INTO orders 
      (customer_name, phone, address, items, total) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result]: any = await database.query(query, [
      customer_name,
      phone,
      address,
      itemsJsonString,
      Number(total),
    ]);

    return NextResponse.json({
      success: true,
      message: "Order placed successfully!",
      orderId: result.insertId,
      customer_name,
      total,
    });
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to process order due to server error." },
      { status: 500 }
    );
  }
}
