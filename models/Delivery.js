import mongoose, { Schema, model, models } from "mongoose";
import { CREATED } from "utils/status";

const DeliverySchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    packs: {
      type: [
        {
          code: { type: String, required: true, unique: true },
          items: {
            type: [
              {
                name: { type: String },
                quantity: { type: Number },
                note: { type: String },
              },
            ],
            required: true,
          },
          status: { type: String, default: "" + CREATED },
          beneficiaryName: { type: String },
          beneficiaryPhone: { type: String },
          beneficiaryAddress: { type: String },
          beneficiaryEmail: { type: String },
          note: { type: String },
        },
      ],
      required: [true, "package array is required !"],
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      default: "" + CREATED,
    },
  },
  { timestamps: true }
);

const DeliveryModel = models.Delivery || model("Delivery", DeliverySchema);

export default DeliveryModel;
