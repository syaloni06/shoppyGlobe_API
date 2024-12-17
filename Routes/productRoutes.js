import { getAllProducts, getProductById, addProduct, updateProduct, removeProduct } from "../Controller/productController.js";

// Function to define product-related routes
export const productRoutes = (app) => {

  // Route to fetch all products
  // GET request to '/products' will return a list of all products
  app.get('/products', getAllProducts);

  // Route to fetch a single product by its ID
  // GET request to '/products/:id' will return the product with the specified ID
  app.get('/products/:id', getProductById);

  // Route to add a new product
  // POST request to '/product' will create and save a new product
  app.post('/product', addProduct);

  // Route to update an existing product by its ID
  // PUT request to '/product/:id' will update the product with the specified ID
  app.put('/product/:id', updateProduct);

  // Route to delete a product by its ID
  // DELETE request to '/product/:id' will remove the product with the specified ID
  app.delete('/product/:id', removeProduct);
};
