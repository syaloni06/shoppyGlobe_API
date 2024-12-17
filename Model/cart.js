import mongoose from "mongoose";

// Define the Cart Schema
const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the product document
        ref: "product", // Refers to the "product" collection
        required: true, // Ensures productId is mandatory
      },
      quantity: {
        type: Number, // Stores the quantity of the product
        required: true, // Ensures quantity is mandatory
        min: 1, // Ensures the quantity is at least 1
      },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user document
    ref: "user", // Refers to the "user" collection
    required: true, // Ensures userId is mandatory
  },
  createdAt: {
    type: Date, // Stores the date when the cart was created
    default: Date.now, // Sets the default value to the current timestamp
  },
});

// Create a Cart model using the schema
const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
