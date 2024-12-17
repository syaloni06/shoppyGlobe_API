import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  stockQuantity: {
    type: Number,
    required: true,
  },
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
