import { Schema, model, models } from "mongoose";
import { ACTIVE } from "utils/status";
import { DRIVER } from "utils/userType";

const DriverSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists !"],
      required: [true, "Email is required !"],
    },
    fullName: {
      type: String,
      required: [true, "Driver name is required !"],
    },
    phone: {
      type: String,
      required: [true, "Driver phone is required !"],
    },
    address: {
      type: String,
      required: [true, "Driver address is required !"],
    },
    type: {
      type: String,
      required: true,
      default: "" + DRIVER,
    },
    status: {
      type: String,
      default: "" + ACTIVE,
    },
    location: {
      type: { latitude: Number, longitude: Number },
    },
  },
  { timestamps: true }
);

const DriverModel = models.Driver || model("Driver", DriverSchema);

export default DriverModel;
