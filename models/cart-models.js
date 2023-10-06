const { Model, Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database.js");
const Product = require("./product-models");

const Cart_item = db.define(
  "cart_item",
  {
    itemID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id", // The primary key of the Product model
      },
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {}
);

module.exports = Cart_item;

(async () => {
  try {
    await db.sync();
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();
