import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await db.connect();
  const result = await client.query("SELECT * FROM neworders;");
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  try {
    const { customer_name, phone, address, items, total } = await req.json();

    if (!customer_name || !phone || !address || !items || !total) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const simplifiedItems = items.map((item: any) => ({
      name: item.name,
    }));

    const result = await db.query(
      "INSERT INTO neworders (customer_name, phone, address, items, total) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [customer_name, phone, address, JSON.stringify(simplifiedItems), total]
    );

    return NextResponse.json({
      success: true,
      order: result.rows[0],
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
