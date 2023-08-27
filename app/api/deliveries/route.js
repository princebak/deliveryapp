import { NextResponse } from "next/server";
import { update, findAll, create } from "services/DeliveryService";
import { smsSenderAndReceiver } from "utils/notificator";

export async function GET() {
  // Deliveries
  try {
    const deliveries = await findAll();
    return NextResponse.json(deliveries, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(request) {
  // Deliveries
  const delivery = await request.json();
  try {
    const updatedDelivery = await update(delivery);
    return NextResponse.json(updatedDelivery, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request) {
  // Deliveries
  const delivery = await request.json();
  try {
    const savedDelivery = await create(delivery);
    if(savedDelivery){
      for (const pack of savedDelivery.packs) {
        smsSenderAndReceiver("", pack.beneficiaryPhone, pack.code);
      }
    }
    return NextResponse.json(savedDelivery, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
