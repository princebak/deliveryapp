import { NextResponse } from "next/server";
import { findById, remove } from "services/ClientService";

export async function GET(request, { params: { id } }) {
  console.log("findById Id >> ", id);

  try {
    const client = await findById(id);
    return NextResponse.json({ data: client }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const client = await remove(id);
    return NextResponse.json(
      { msg: `Client with id ${id} is deleted.` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
