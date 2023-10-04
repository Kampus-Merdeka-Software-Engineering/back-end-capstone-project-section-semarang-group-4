const express = require("express");
const router = express.Router(); // Create an instance of the Express Router

const Product = require("../models/product-models.js");

router.post("/", async (req, res) => {
  try {
    await Product.create(req.body);
    res.status(201).json({ msg: "Added Catalog" });
  } catch (error) {
    res.send(error.message);
  }
});

// router.get("/", (req, res) => {
//   res.json(products);
// });

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll(); // Retrieve all products from the database
    res.json(products); // Return the data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
