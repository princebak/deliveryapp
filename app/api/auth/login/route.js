import { compare, hash } from "bcrypt";
import AdminModel from "models/Admin";
import ClientModel from "models/Client";
import DriverModel from "models/Driver";
import UserModel from "models/User";
import { NextResponse } from "next/server";
import { dbConnector } from "utils/dbConnector";
import { ADMIN, CLIENT, DRIVER, SUPER_ADMIN } from "utils/userType";

export async function POST(request) {
  // Clients
  const user = await request.json();
  console.log("loggingUser >> ", user);
  console.log("with hashed >> ", await hash(user.password, 10));

  try {
    await dbConnector();
    const existingUser = await UserModel.findOne({
      username: user.username,
    });
    let profile = null;
    if (existingUser && (await compare(user.password, existingUser.password))) {
      console.log("Compare OKK");
      if (existingUser.type === SUPER_ADMIN || existingUser.type === ADMIN) {
        profile = await AdminModel.find({ phone: existingUser.username });
      } else if (existingUser.type === CLIENT) {
        profile = await ClientModel.find({ phone: existingUser.username });
      } else if (existingUser.type === DRIVER) {
        profile = await DriverModel.find({ phone: existingUser.username });
      }
    }
    if (profile === null) {
      return NextResponse.json({ msg: "user not found" }, { status: 400 });
    }
    console.log("profile >> ", profile)
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.log("error >> ", error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
