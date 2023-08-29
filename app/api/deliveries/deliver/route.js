import { NextResponse } from "next/server";
import { deliver } from "services/DeliveryService";

export async function PUT(request) {
  // assign a delivery To a Driver
  try {
    const requestPayload = await request.json();
    const responsePayload = await deliver(requestPayload.validationCode);
    return NextResponse.json(responsePayload, {
      status: responsePayload.status,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
