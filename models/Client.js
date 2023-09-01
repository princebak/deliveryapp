import { Schema, model, models } from "mongoose";
import { ACTIVE } from "utils/status";
import { CLIENT } from "utils/userType";

const ClientSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists !"],
      required: [true, "Email is required !"],
    },
    fullName: {
      type: String,
      required: [true, "Client name is required !"],
    },
    phone: {
      type: String,
      required: [true, "Client phone is required !"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Client address is required !"],
    },
    type: {
      type: String,
      required: true,
      default: "" + CLIENT,
    },
    status: {
      type: String,
      default: "" + ACTIVE,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      select: false,
    },
  },
  { timestamps: true }
);

const ClientModel = models.Client || model("Client", ClientSchema);

export default ClientModel;
