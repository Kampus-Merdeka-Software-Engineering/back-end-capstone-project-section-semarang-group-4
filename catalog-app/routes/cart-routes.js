const express = require("express");
const router = express.Router(); // Create an instance of the Express Router

const Cart_item = require("../models/cart-models.js");
const Product = require("../models/product-models.js");

//test by "{"productId": 2}"
router.post("/add", async (req, res) => {
  const { productId } = req.body;

  try {
    const existingCartItem = await Cart_item.findOne({
      where: {
        itemID: productId,
        //Finding the product id
        //You can also filter by other properties if needed, like by userId
      },
    });

    if (existingCartItem) {
      // Product already exists in the cart; update the quantity
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      // Product does not exist in the cart; create a new cart item
      Product.findOne({
        where: {
          id: productId, // Assuming "id" is the primary key of the Product model
        },
        attributes: ["product_name", "price", "product_image_1"], // Specify the attributes you want to retrieve
      })
        .then((product) => {
          if (product) {
            console.log("Product found.");
            Cart_item.create({
              itemID: productId,
              itemName: product.product_name,
              itemImage: product.product_image_1,
              itemPrice: product.price,
              quantity: 1,
            });
          } else {
            // No product found with the specified itemId
            console.log("Product not found.");
          }
        })
        .catch((error) => {
          // Handle errors
          console.error("Error finding product by itemId:", error);
        });
    }

    res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Error adding item to cart" });
  }
});

router.get("/", async (req, res) => {
  try {
    const cart_item = await Cart_item.findAll(); // Retrieve all products from the database
    res.json(cart_item); // Return the data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:itemId", async (req, res) => {
  const itemIdToDelete = req.params.itemId;

  try {
    // Find and delete the cart item by its ID
    const deletedCartItem = await Cart_item.destroy({
      where: { id: itemIdToDelete },
    });

    if (deletedCartItem) {
      // Item was deleted successfully
      res.status(200).json({ message: "Item deleted from cart" });
    } else {
      // No item found with the specified ID
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    res.status(500).json({ message: "Error deleting item from cart" });
  }
});

module.exports = router;
