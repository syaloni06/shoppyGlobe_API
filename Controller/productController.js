import productModel from "../Model/product.js";
import mongoose from "mongoose";
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    // Check if request body is empty
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "At least one field is required" });
    }
    const { name, price, description, stockQuantity } = req.body;
    // Validation: Check required fields and conditions
    if (!name || !price || !description || stockQuantity === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }
    if (typeof stockQuantity !== "number" || stockQuantity < 0) {
      return res.status(400).json({ message: "Stock quantity must be a non-negative number" });
    }
    if (typeof name !== "string" || name.trim().length < 3) {
      return res.status(400).json({ message: "Name must be at least 3 characters long" });
    }
    if (typeof description !== "string" || description.trim().length < 10) {
      return res.status(400).json({ message: "Description must be at least 10 characters long" });
    }
    // Create and save the product
    const product = new productModel({
      name: name.trim(),
      price,
      description: description.trim(),
      stockQuantity,
    });
    const savedProduct = await product.save();
    res.status(201).json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    console.error("Error:", error.message); // Log error details
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    // Check if request body is empty
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "At least one field is required" });
    }
    const { id } = req.params;
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    // Find the product by ID and update
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      req.body, // Update all fields sent in the request body
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation
        strict: true, // Ignore unknown fields
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error:", error.message); // Log error details
    res.status(500).json({ message: error.message });
  }
};


export const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
