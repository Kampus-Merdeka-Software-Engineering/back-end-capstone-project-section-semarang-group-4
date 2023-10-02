const express = require("express");

const productStaticRouter = require("./routes/product-static-routes.js");
const productRouter = require("./routes/product-routes");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use("/api/products", productStaticRouter);
app.use("/products", productRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
