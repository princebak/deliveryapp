import { NextResponse } from "next/server";
import { block } from "services/ClientService";

export async function PUT(request, { params: { id } }) {
  // Clients
  try {
    await block(id);
    return NextResponse.json(
      { msg: `Client with id ${id} is blocked.` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
