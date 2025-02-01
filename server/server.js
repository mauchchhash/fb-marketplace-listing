require("dotenv").config();
const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const Product = require("./models/Product");
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json()); // Add this line BEFORE your routes!

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, Express with Nodemon!");
});

// Route to add a new product
app.post("/products", async (req, res) => {
  try {
    const { name, price = 0, category, condition = "New", sku = "", inStock = true } = req.body;

    const newProduct = new Product({ name, price, category, condition, sku, inStock });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product", details: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products", details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
