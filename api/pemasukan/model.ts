import mongoose from "mongoose";

const pemasukanSchema = new mongoose.Schema({
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
    type: mongoose.Types.ObjectId,
    ref: "kategori",
    required: true,
  },
});

export default mongoose.model("Pemasukan", pemasukanSchema);
