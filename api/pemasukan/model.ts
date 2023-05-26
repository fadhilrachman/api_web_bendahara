import mongoose from "mongoose";

const pemasukanSchema = new mongoose.Schema(
  {
    tanggal: {
      type: Date,
      required: true,
    },
    total_pemasukan: {
      type: Number,
      required: true,
    },
    deskripsi: {
      type: String,
    },
    kategori: {
      type: String,
      enum: ["primary", "gift"],
      requred: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pemasukan", pemasukanSchema);
