import { addToCart, updateCart, removeFromCart, getAllCartItems, getCartItemById } from "../Controller/cartController.js";
import { auth } from "../Middleware/auth.js";

export function cartRoutes(app){
    app.get('/carts', auth, getAllCartItems);
    app.get('/carts/:id', auth, getCartItemById);
    app.post('/cart', auth, addToCart);
    app.put('/cart', auth, updateCart);
    app.delete('/cart/:id', auth, removeFromCart);
}

