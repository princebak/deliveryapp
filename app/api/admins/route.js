import { NextResponse } from "next/server";
import { create, findAll } from "services/AdminService";

export async function PUT(request) {
  console.log("findById Id >> ", id);

  try {
    const { id, latitude, longitude } = await request.json();
    const driver = await update(id, { latitude, longitude });
    return NextResponse.json(driver, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request) {
  console.log("creating a driver");

  try {
    const driver = await request.json();
    const savedDriver = await create(driver);
    return NextResponse.json(savedDriver, { status: 200 });
  } catch (error) {
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
