import { NextResponse } from "next/server";
import { create, findAll } from "services/AdminService";

export async function PUT(request) {
  console.log("findById Id >> ", id);

  try {
    const payload = await request.json();
    const admin = await update(payload);
    return NextResponse.json(admin, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request) {
  console.log("creating a admin");

  try {
    const admin = await request.json();
    console.log("Admin >> ", admin);
    const savedDriver = await create(admin);
    return NextResponse.json(savedDriver, { status: 200 });
  } catch (error) {
    console.log("Saving admin error >> ", error);
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function GET() {
  // Drivers
  try {
    const drivers = await findAll();
    return NextResponse.json(drivers, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
