import { addToCart, updateCart, removeFromCart, getAllCartItems, getCartItemById } from "../Controller/cartController.js";
import { auth } from "../Middleware/auth.js";

// Function to define cart-related routes
export function cartRoutes(app) {
  
  // Route to get all cart items
  // Uses 'auth' middleware to ensure the user is authenticated
  app.get('/carts', auth, getAllCartItems);

  // Route to get a specific cart item by its ID
  // Authenticated users can access this endpoint
  app.get('/carts/:id', auth, getCartItemById);

  // Route to add an item to the cart
  // Requires user authentication via the 'auth' middleware
  app.post('/cart', auth, addToCart);

  // Route to update an existing cart item (e.g., updating quantity)
  // Authentication is required to access this route
  app.put('/cart', auth, updateCart);

  // Route to remove an item from the cart by its ID
  // Only authenticated users can delete a cart item
  app.delete('/cart/:id', auth, removeFromCart);
}
