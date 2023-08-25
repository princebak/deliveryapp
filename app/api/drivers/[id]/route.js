import { NextResponse } from "next/server";
import { findById } from "services/DriverService";

export async function GET(request, { params: { id } }) {
  console.log("findById Id >> ", id);

  try {
    const driver = await findById(id);
    return NextResponse.json(driver, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
