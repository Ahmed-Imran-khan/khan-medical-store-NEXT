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
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "product id is required" },
        { status: 400 }
      );
    }
    await db.query("DELETE FROM kmstore WHERE id = $1", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "ERROR" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, description, price, image } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Product Id not Found" },
        { status: 400 }
      );
    }
    await db.query(
      "UPDATE kmstore SET name=$1, description=$2, price=$3, image=$4 WHERE id= $5",
      [name, description, Number(price), image, id]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Update Error" }, { status: 500 });
  }
}
