import mongoose from "mongoose";

const pengeluaranSchema = new mongoose.Schema(
  {
    tanggal: {
      type: String,
      required: true,
    },
    total_pengeluaran: {
      type: Number,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pengeluaran", pengeluaranSchema);