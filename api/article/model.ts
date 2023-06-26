import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  tanggal: {
    type: Date,
    required: true,
  },
  judul: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  kategori: {
    type: mongoose.Types.ObjectId,
    ref: "kategori",
    required: true,
  },
});

export default mongoose.model("Article", articleSchema);
