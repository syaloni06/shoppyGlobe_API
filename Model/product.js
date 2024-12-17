import mongoose from "mongoose";

// Define the Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String, // Name of the product
    required: true, // Ensures the name field is mandatory
  },
  price: {
    type: Number, // Price of the product
    required: true, // Ensures the price field is mandatory
  },
  description: String, // Optional description of the product
  stockQuantity: {
    type: Number, // Number of products available in stock
    required: true, // Ensures stockQuantity is mandatory
  },
});

// Create a Product model using the schema
const productModel = mongoose.model("product", productSchema);

export default productModel;
