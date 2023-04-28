import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "panjang minimal 6 karakter"],
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    token: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
