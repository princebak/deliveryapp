import { NextResponse } from "next/server";
import { update, findAll, create } from "services/ClientService";

export async function GET() {
  // Clients
  try {
    const clients = await findAll();
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(request) {
  // Clients
  const client = await request.json();
  try {
    const updatedClient = await update(client);
    return NextResponse.json(updatedClient, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request) {
  // Clients
  const client = await request.json();
  try {
    const savedClient = await create(client);
    return NextResponse.json({ data: savedClient }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
