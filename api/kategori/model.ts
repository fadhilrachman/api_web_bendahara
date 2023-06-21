import mongoose from "mongoose";
import pemasukan from "../pemasukan/model";
interface IKategori extends Document {
  nama: string;
  _id: string;
}

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

kategoriSchema.pre("findOneAndDelete", async function (this, next) {
  const id = this.getQuery()._id;
  await pemasukan.deleteMany({ kategori: id });

  next();
});

export default mongoose.model("kategori", kategoriSchema);
