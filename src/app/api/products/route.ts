import { NextResponse } from "next/server";
import { database } from "@/app/lib/db";

// GET → Fetch all products
export async function GET() {
  try {
    const [rows] = await database.query("SELECT * FROM kmstore");
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST → Insert new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image, name, description, price } = body;
    if (!image || !name || !description || !price) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }
    const [result]: any = await database.query(
      "INSERT INTO kmstore (image, name, description, price) VALUES (?, ?, ?, ?)",
      [image, name, description, Number(price)]
    );

    return NextResponse.json({
      success: true,
      id: result.insertId,
      image,
      name,
      description,
      price,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
