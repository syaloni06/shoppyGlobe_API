import productModel from "../Model/product.js";
import mongoose from "mongoose";

// Function to get all products
export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await productModel.find();
    res.status(200).json(products); // Return products as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

// Function to get a product by its ID
export const getProductById = async (req, res) => {
  try {
    // Fetch product by its ID from the database
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ error: "Product not found" }); // If product is not found
    }
    res.status(200).json(product); // Return the found product
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

// Function to add a new product
export const addProduct = async (req, res) => {
  try {
    // Check if request body is empty
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "At least one field is required" });
    }
    
    const { name, price, description, stockQuantity } = req.body;

    // Validate required fields and conditions
    if (!name || !price || !description || stockQuantity === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validation checks for price and stock quantity
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }
    if (typeof stockQuantity !== "number" || stockQuantity < 0) {
      return res.status(400).json({ message: "Stock quantity must be a non-negative number" });
    }
    
    // Validation checks for name and description
    if (typeof name !== "string" || name.trim().length < 3) {
      return res.status(400).json({ message: "Name must be at least 3 characters long" });
    }
    if (typeof description !== "string" || description.trim().length < 10) {
      return res.status(400).json({ message: "Description must be at least 10 characters long" });
    }

    // Create and save the new product
    const product = new productModel({
      name: name.trim(),
      price,
      description: description.trim(),
      stockQuantity,
    });
    const savedProduct = await product.save(); // Save the product in the database

    res.status(201).json({ message: "Product created successfully", product: savedProduct }); // Return success response
  } catch (error) {
    console.error("Error:", error.message); // Log error details
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

// Function to update a product
export const updateProduct = async (req, res) => {
  try {
    // Check if request body is empty
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "At least one field is required" });
    }

    const { id } = req.params;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Find the product by ID and update it
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
      return res.status(404).json({ message: "Product not found" }); // If the product is not found
    }

    res.status(200).json({ message: "Product updated successfully", updatedProduct }); // Return updated product
  } catch (error) {
    console.error("Error:", error.message); // Log error details
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

// Function to remove a product
export const removeProduct = async (req, res) => {
  try {
    // Find the product by ID and delete it
    const product = await productModel.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" }); // If product is not found

    res.status(200).json({ message: "Product deleted successfully" }); // Return success message
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle server errors
  }
};
