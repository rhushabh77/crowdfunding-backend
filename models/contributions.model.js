import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    enum: ["usd", "inr"],
    required: true,
  },
  isConverted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contribution = mongoose.model("Contribution", contributionSchema);

export default Contribution;
