import mongoose from "mongoose";

const pengeluaranSchema = new mongoose.Schema(
  {
    tanggal: {
      type: Date,
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
    kategori: {
      type: String,
      enum: ["primary", "snacking", "invest"],
      requred: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pengeluaran", pengeluaranSchema);
