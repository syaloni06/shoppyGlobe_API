import express from "express";
import mongoose from "mongoose";
import { productRoutes } from "./Routes/productRoutes.js"
import { cartRoutes } from "./Routes/cartRoutes.js";
import { authRoutes } from "./Routes/authRoutes.js";
const app = new express();

app.use(express.json());

// Middleware to log request method, URL, and status code after the response is sent
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`Method:${req.method} Url:${req.url} Status:${res.statusCode}`);
  });
  next();
});

app.listen(5100, () => {
    console.log("Server is running on port 5100");
});

productRoutes(app);
cartRoutes(app);
authRoutes(app);

mongoose.connect("mongodb://localhost:27017/shoppyGlobeDB");
const db = mongoose.connection;
db.on("open", () => {
  console.log("Database connection successful");
});
db.on("error", () => {
  console.log("Database connection not successful");
});