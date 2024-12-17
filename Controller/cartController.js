import cartModel from "../Model/cart.js";
import productModel from "../Model/product.js";

// Function to get all items in the cart
export const getAllCartItems = async (req, res) => {
    try {
        // Fetch all cart items from the database
        const cartItems = await cartModel.find();
        res.status(200).json(cartItems); // Return all cart items
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
};

// Function to get a cart item by ID
export const getCartItemById = async (req, res) => {
    try {
        // Fetch the cart item by its ID
        const cartItem = await cartModel.findById(req.params.id);
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" }); // If item not found
        }
        res.status(200).json(cartItem); // Return the cart item
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
};

// Function to add products to the cart
export const addToCart = async (req, res) => {
    try {
        const { userId, products } = req.body; // Expect userId and an array of products [{ productId, quantity }]
        
        // Validate if products array exists and is not empty
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Products array is required and cannot be empty" });
        }
        
        // Check if the user already has a cart
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            // If no cart exists, create a new one
            cart = new cartModel({ userId, products: [] });
        }

        // Process each product in the products array
        for (const item of products) {
            const { productId, quantity } = item;

            // Validate if product exists
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(400).json({ error: `Product with ID ${productId} not found` });
            }

            // Check if the product already exists in the cart
            const existingProductIndex = cart.products.findIndex(
                (product) => product.productId.toString() === productId
            );
            if (existingProductIndex > -1) {
                // Update quantity if product already exists
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                // Add new product to cart
                cart.products.push({ productId, quantity });
            }
        }

        // Save the updated cart
        await cart.save();
        res.status(201).json({ message: "Products added to cart", cart }); // Return success message with updated cart
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
};

// Function to update the cart
export const updateCart = async (req, res) => {
    try {
        const { userId, products } = req.body;

        // Validate input
        if (!userId || !products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "userId and a non-empty products array are required" });
        }

        // Find the user's cart
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found for this user" });
        }

        // Iterate through the products array to update each product
        for (const item of products) {
            const { productId, quantity } = item;

            // Validate the product exists
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(400).json({ error: `Product with ID ${productId} not found` });
            }

            // Find the product in the cart
            const productIndex = cart.products.findIndex(
                (p) => p.productId.toString() === productId
            );

            if (productIndex > -1) {
                // Update quantity or remove the product if quantity <= 0
                if (quantity > 0) {
                    cart.products[productIndex].quantity = quantity;
                } else {
                    cart.products.splice(productIndex, 1); // Remove product if quantity is 0 or less
                }
            } else if (quantity > 0) {
                // Add product if not in cart and quantity > 0
                cart.products.push({ productId, quantity });
            }
        }

        // Save the updated cart
        await cart.save();
        res.status(200).json({ message: "Cart updated successfully", cart }); // Return success message with updated cart
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
};

// Function to remove an item from the cart
export const removeFromCart = async (req, res) => {
    try {
        // Find and delete the cart item by its ID
        const cartItem = await cartModel.findByIdAndDelete(req.params.id);
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" }); // If item is not found
        }
        res.status(200).json({ message: "Item removed from cart" }); // Return success message
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
};
