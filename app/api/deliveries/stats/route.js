import { NextResponse } from "next/server";
import { findStatisticsByStatus } from "services/DeliveryService";

export async function GET() {
  // Deliveries
  try {
    const statistics = await findStatisticsByStatus();
    return NextResponse.json(statistics, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
