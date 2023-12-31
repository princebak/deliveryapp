import { Schema, model, models } from "mongoose";
import { ACTIVE } from "utils/status";
import { ADMIN } from "utils/userType";

const AdminSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists !"],
      required: [true, "Email is required !"],
    },
    fullName: {
      type: String,
      required: [true, "Admin name is required !"],
    },
    phone: {
      type: String,
      required: [true, "Admin phone is required !"],
      unique: true,
    },
    address: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      default: "" + ADMIN,
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

const AdminModel = models.Admin || model("Admin", AdminSchema);

export default AdminModel;
