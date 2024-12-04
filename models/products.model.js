import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  amount: {
    usd: { type: Number, required: true, min: 0 },
  },
  collected: {
    usd: { type: Number, required: true, min: 0, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
