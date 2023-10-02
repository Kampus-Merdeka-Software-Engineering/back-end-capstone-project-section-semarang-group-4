const express = require("express");
const router = express.Router(); // Create an instance of the Express Router

const Product = require("../models/product-models.js");
const products = require("../products.json");

router.post("/", async (req, res) => {
  try {
    await Product.create(req.body);
    res.status(201).json({ msg: "Added Catalog" });
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/", (req, res) => {
  res.json(products);
});

module.exports = router;
