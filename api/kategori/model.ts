import mongoose from "mongoose";

const kategoriSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["income", "expense"],
  },
});

export default mongoose.model("kategori", kategoriSchema);
