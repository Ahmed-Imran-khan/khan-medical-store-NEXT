import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await db.connect();
  const result = await client.query("SELECT * FROM kmstore;");
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  try {
    const { image, name, description, price } = await req.json();

    if (!image || !name || !description || !price) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const result = await db.query(
      "INSERT INTO kmstore (image, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *;",
      [image, name, description, Number(price)]
    );

    return NextResponse.json({
      success: true,
      product: result.rows[0],
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
