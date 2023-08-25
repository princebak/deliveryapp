import { Schema, model, models } from "mongoose";
import _package from "utils/Package";
import { CREATED } from "utils/status";

const DeliverySchema = new Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "driver",
    },
    packages: {
      type: [_package],
      required: [true, "package array is required !"],
    },
    note: {
      type: String,
      required: [true, "Delivery phone is required !"],
    },
    status: {
      type: String,
      default: CREATED,
    },
  },
  { timestamps: true }
);

const DeliveryModel = models.delivery || model("delivery", DeliverySchema);

export default DeliveryModel;
