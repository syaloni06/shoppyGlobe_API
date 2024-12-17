import { getAllProducts, getProductById, addProduct, updateProduct, removeProduct } from "../Controller/productController.js";

export const productRoutes = (app) => {
    app.get('/products', getAllProducts);
    app.get('/products/:id', getProductById);
    app.post('/product', addProduct);
    app.put('/product/:id', updateProduct);
    app.delete('/product/:id', removeProduct);
};
