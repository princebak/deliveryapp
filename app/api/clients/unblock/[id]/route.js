import { NextResponse } from "next/server";
import { unblock } from "services/ClientService";

export async function PUT(request, { params: { id } }) {
  // Clients
  try {
    await unblock(id);
    return NextResponse.json(
      { msg: `Client with id ${id} is unblocked.` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
