const { Model, Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database.js");

const Product = db.define(
  "product_catalog",
  {
    product_name: {
      type: DataTypes.STRING(64), // Use VARCHAR(64) equivalent
      allowNull: false,
      defaultValue: "No Item",
    },
    product_collection: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "-",
    },
    product_desc: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "-",
    },
    discount: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "9999999",
    },
    product_image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  {}
);

module.exports = Product;

(async () => {
  try {
    await db.sync();
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();
