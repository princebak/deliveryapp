import { Schema, model, models } from "mongoose";
import { CLIENT } from "utils/userType";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "User phone is required !"],
      unique: true,
    },
    type: {
      type: String,
      required: true,
      default: "" + CLIENT,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
  },
  { timestamps: true }
);

const UserModel = models.User || model("User", UserSchema);

export default UserModel;
