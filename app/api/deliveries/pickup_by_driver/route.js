export async function PUT(request) {
  // assign a delivery To a Driver
  try {
    const requestPayload = await request.json();
    const responsePayload = await removeFromDriver(requestPayload.deliveryId);
    return NextResponse.json(responsePayload, {
      status: responsePayload.status,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
