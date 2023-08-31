import { NextResponse } from "next/server";
import { findById, remove } from "services/AdminService";

export async function GET(request, { params: { id } }) {
  console.log("findById Id >> ", id);

  try {
    const admin = await findById(id);
    return NextResponse.json(admin, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    await remove(id);
    return NextResponse.json(
      { msg: `Admin with id ${id} is deleted.` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
